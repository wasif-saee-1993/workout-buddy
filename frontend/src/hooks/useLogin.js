import { useState } from "react"
import { useAuthContext } from "./useAuthContext"

export const useLogin =  () => {
    
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch("/api/users/login", {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({email, password})
        })

        const json = await response.json()

        if(response.ok) {
            localStorage.setItem('user', JSON.stringify(json))
            dispatch({ type: "LOGIN", payload: json })
            setIsLoading(false)
        } else {
            setIsLoading(false)
            setError(json.error)
        }
    }

    return { login, isLoading, error }
}