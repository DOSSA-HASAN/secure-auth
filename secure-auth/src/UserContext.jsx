import React, { createContext, useEffect, useState } from 'react'

const ucontext = createContext()

function UserContext({ children }) {

    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken") || null)
    const [user, setUser] = useState([])

    const API_BASE_URL = import.meta.env.MODE === "production" ? "http://localhost:5000" : '/'

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
            let response = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
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
                credentials: 'include',
                body: JSON.stringify({ email, password })
            })

            let data = await response.json()

            if (data !== null) {
                setAccessToken(data.accessToken)
                localStorage.setItem("accessToken", data.accessToken)
                localStorage.setItem("user", JSON.stringify(data.user))
                setUser(data.user)
                return true;
            }

            return false;

        } catch (error) {
            console.error(error.message)
        }
    }

    const logout = async () => {

        const accessToken = JSON.stringify(localStorage.getItem("accessToken"))

        if (!accessToken) {
            console.error("No refresh cookie found")
        }

        try {
            let response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                credentials: "include",
            })

            const data = await response.json()

            if (data.success) {
                setUser([])
                setAccessToken(null)
                localStorage.clear()
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

            if (data.success) {
                console.log("account registered")
                return true;
            }

            return false;

        } catch (error) {
            console.error(error.message)
        }
    }

    const verifyAccount = async (userId, otp) => {
        try {
            console.log(typeof(otp))
            console.log(typeof(userId))
            let response = await fetch(`${API_BASE_URL}/api/auth/verify-account`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                },
                body: JSON.stringify({ userId, otp })
            })

            if (response.ok) {
                console.log("Account verified successfully");
                getUserData();
                return true;
            } else if (response.status === 400) {
                console.log("OTP has expired");
            } else {
                console.log(response)
                console.log("Something went wrong");
            }

        } catch (error) {
            console.error(error.message)
        }
    }

    const requestVerificationOtp = async (userId) => {

        try {
            let response = await fetch(`${API_BASE_URL}/api/auth/send-otp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                },
                credentials: 'include',
                body: JSON.stringify({ userId })
            })

            const data = await response.json()

            if (data.status == 200) {
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

            if (response.ok) {
                console.log("account password has been changed")
                logout()
                return true;
            }

            return false;

        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            refreshAccessToken()
        }, 10 * 60 * 1000);

        return () => clearInterval(interval)
    }, [accessToken])

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"))
        if (storedUser) {
            setUser(storedUser)
        }
    }, [])

    const getUserData = async () => {
        const response = await fetch(`${API_BASE_URL}/api/auth/user/${user?.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })

        const data = await response.json()

        if (data) {
            setUser(data.user)
            console.log(user)
            localStorage.setItem("user", JSON.stringify(data.user))
        }
    }

    return (
        <ucontext.Provider value={{ fetchAccessTokenWithRefresh, register, login, logout, verifyAccount, requestPasswordResetOtp, resetPassword, requestVerificationOtp, accessToken, user }}>
            {children}
        </ucontext.Provider>
    )
}

export { UserContext, ucontext }
