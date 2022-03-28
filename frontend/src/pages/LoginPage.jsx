import SubmitButton from "components/shared/buttons/SubmitButton"
import PasswordInput from "components/shared/inputs/PasswordInput"
import TextInput from "components/shared/inputs/TextInput"
import { useAuth } from "context/authContext"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import styles from "./LoginPage.module.scss"

const LoginPage = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState()

  const auth = useAuth()
  let location = useLocation()
  let navigate = useNavigate()

  let from = location.state?.from?.pathname || "/"

  const handleSubmit = async () => {
    const res = await auth.signin(username, password, () => navigate(from, { replace: true }))
    if (res.error) {
      setError(res.error)
    }
  }

  const handleOnKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit()
    }
  }

  return (
    <div className={styles.login}>
      {error === 403? "Wrong username or password" : ""}
      <h2>Login</h2>
      <TextInput
        label={"Username"}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={handleOnKeyDown}
        autofocus={true}
      />
      <PasswordInput
        label={"Password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={handleOnKeyDown}
      />

      <SubmitButton onClick={handleSubmit}>Login</SubmitButton>
    </div>
  )
}

export default LoginPage
