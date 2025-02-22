import React, { createContext, useEffect, useState } from 'react'

const ucontext = createContext()

function UserContext() {

    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken")) || null
    const [user, setUser] = useState(null)

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
                method: POST,
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

    const login = async (email, password) => {
        try {
            let response = await fetch(`${API_BASE_URL}/api/auth/login`, {
                method: POST,
                headers: { "Content-Type": "apllication/json" },
                body: JSON.stringify(email, password)
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
                method: POST,
                headers: { "Content-Type": "application/json" }
            })

            if (response.sucess) {
                setUser(null)
                setAccessToken(null)
                localStorage.clear()
                window.location.href = "/login"
            }

        } catch (error) {
            console.error(error.message)
        }
    }

    const refreshAccessToken = async () => {
        try {
            let response = await (`${API_BASE_URL}/api/auth/`, {
                method: POST,
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

    useEffect(() => {
        const interval = setInterval(() => {
            refreshAccessToken()
        }, 10 * 60 * 1000);

        return () => clearInterval(interval)
    }, [])

    return (
        <ucontext.Provider value={{ fetchWithRefresh, login, logout }}>

        </ucontext.Provider>
    )
}

export default UserContext
