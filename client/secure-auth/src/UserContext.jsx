import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ucontext = createContext()

function UserContext({ children }) {

    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken") || null)
    const [user, setUser] = useState(null)
    const navigate = useNavigate();

    const API_BASE_URL = "http://localhost:5000/api"

    const fetchAccessTokenWithRefresh = async (url, options = {}) => {
        //initial api request
        let response = await fetch(`${API_BASE_URL}${url}`, {
            ...options,
            headers: {
                ...options.headers,
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        })

        if (response.status === 401) {
            const refreshResponse = await fetch(`${API_BASE_URL}/refresh`, {
                method: "POST",
                credentials: "include"
            })

            const refreshData = await refreshResponse.json()

            if (refreshData.success) {
                localStorage.setItem("accessToken", refreshData.accessToken)

                response = await fetch(`${API_BASE_URL}${url}`, {
                    ...options,
                    headers: {
                        ...options.headers,
                        Authorization: `Bearer ${refreshData.accessToken}`
                    }
                })
            }
        }

        return response.json()
    }

    const refreshAccessToken = async () => {
        try {
            let response = await fetch(`${API_BASE_URL}/api/auth/`, {
                method: "POST",
                credentials: "include"
            })

            let data = await response.json()

            if (data) {
                localStorage.setItem("accessToken", data.accessToken)
            } else {
                logout();
            }
        } catch (error) {
            console.error(error.message)
        }
    }

    const login = async (email, password) => {
        try {
            let response = await fetch(`${API_BASE_URL}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            })

            let data = await response.json()

            if (data) {
                setAccessToken(data.accessToken)
                localStorage.setItem("accessToken", data.accessToken)
                setUser(data.user)
            }

        } catch (error) {
            console.error(error.message)
        }
    }

    const logout = async () => {
        try {
            let response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
                method: "POST",
                credentials: "include"
            })

            const data = await response.json()

            if (data.success) {
                setUser(null)
                setAccessToken(null)
                localStorage.clear()
                window.location.href = "/login"
            }

        } catch (error) {
            console.error(error.message)
        }
    }

    const register = async (name, email, password) => {
        try {
            let response = await fetch(`${API_BASE_URL}/api/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password })
            })

            const data = await response.json()

            if (data.status === 201) {
                console.log("account registered")
                navigate('/')
            }

        } catch (error) {
            console.error(error.message)
        }
    }

    const verifyAccount = async (otp, userId) => {
        try {
            let response = await fetch(`${API_BASE_URL}/api/auth/verify-account`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, otp })
            })

            const data = await response.json()

            if (data.status === 200) {
                console.log("account already verified")
            } else if (data.status === 400) {
                console.log("OTP has expired")
            }

        } catch (error) {
            console.error(error.message)
        }
    }

    const requestVerificationOtp = async (userId) => {
        try {
            let response = await fetch(`${API_BASE_URL}/api/auth/send-otp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                Authorization: `Bearer ${accessToken}`,
                body: JSON.stringify({ userId })
            })

            const data = await response.json()

            if (data.status === 200) {
                console.log("otp has been sent to user_email")
            }
        } catch (error) {
            console.error(error.message)
        }
    }

    const requestPasswordResetOtp = async (email) => {
        try {
            let response = await fetch(`${API_BASE_URL}/api/auth/send-reset-otp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            })

            const data = await response.json()

            if (data.status === 200) {
                console.log("otp has been sent to user_email")
            }

        } catch (error) {
            console.error(error.message)
        }
    }

    const resetPassword = async (email, otp, newPassword) => {
        try {
            let response = await fetch(`${API_BASE_URL}/api/auth/reset-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp, newPassword })
            })

            const data = await response.json()

            if (data.status === 200) {
                console.log("account password has been changed")
                logout()
                navigate('/')
            }

        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            refreshAccessToken()
        }, 10 * 60 * 1000);

        return () => clearInterval(interval)
    }, [])

    return (
        <ucontext.Provider value={{ fetchAccessTokenWithRefresh, register, login, logout, verifyAccount, requestPasswordResetOtp, resetPassword, requestVerificationOtp, accessToken, user }}>
            {children}
        </ucontext.Provider>
    )
}

export default UserContext
