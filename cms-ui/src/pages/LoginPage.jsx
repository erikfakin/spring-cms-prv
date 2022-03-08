import { post } from "adapters/xhr"
import { useAuth } from "context/authContext"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { apiUrl } from "utils/constants/env"

const LoginPage = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const auth = useAuth()
  let location = useLocation();
  let navigate = useNavigate();

  let from = location.state?.from?.pathname || "/";

  const handleSubmit = async () => {
    auth.signin(username, password, () => navigate(from, { replace: true }))
  }

  return (
    <div className="login">
      <label className="login__username">
        <input
          type="text"
          name="username"
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label className="login__password">
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button className="login__submit" onClick={handleSubmit}>
        Login
      </button>
    </div>
  )
}

export default LoginPage
