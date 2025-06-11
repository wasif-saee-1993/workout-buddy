import { useSignup } from "../hooks/useSignup"

const { useState } = require("react")

const Signup = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { signup, isLoading, error } = useSignup()

    const submitForm = async (e) => {
        e.preventDefault()
        await signup(email, password)
    }

    return (
        <form className="signup" onSubmit={submitForm}>

            <h3>Sign up</h3>

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

            <button disabled={isLoading}>Sign up</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Signup