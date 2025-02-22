// define base url
const API_BASE_URL = "http://localhost:5000/api"

export const fetchWithRefresh = async (url, options = {}) => {
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