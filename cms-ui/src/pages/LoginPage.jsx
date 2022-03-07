import { post } from "adapters/xhr"
import { useState } from "react"
import { apiUrl } from "utils/constants/env"

const LoginPage = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async () => {
    const res = await post(apiUrl + "/login", {
      username,
      password,
    })
    localStorage.removeItem("token")
    console.log(localStorage)

    localStorage.setItem("token", res.headers.get("token"))
    console.log(localStorage.getItem("token"))
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
