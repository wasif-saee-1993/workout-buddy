import { useLogin } from "../hooks/useLogin"

const { useState } = require("react")

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { login, isLoading, error } = useLogin()

    const submitForm = async (e) => {
        e.preventDefault()
        
        login(email, password)
    }

    return (
        <form className="login" onSubmit={submitForm}>

        <h3>Log In</h3>

        <label>Email</label>
        <input
            type="email"
            value={email}
            onChange={ (e) => setEmail(e.target.value) }
        />

        <label>Password</label>
        <input 
            type="password"
            value={password}
            onChange={ (e) => setPassword(e.target.value) }
        />

        <button disabled={isLoading}>Log In</button>
        {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Login