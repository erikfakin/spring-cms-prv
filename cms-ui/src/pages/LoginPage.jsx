import TextInput from "components/editPostPage/textInput/TextInput"
import SubmitButton from "components/shared/buttons/SubmitButton"
import { useAuth } from "context/authContext"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import styles from "./LoginPage.module.scss"

const LoginPage = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const auth = useAuth()
  let location = useLocation()
  let navigate = useNavigate()

  let from = location.state?.from?.pathname || "/"

  const handleSubmit = async () => {
    auth.signin(username, password, () => navigate(from, { replace: true }))
  }

  const handleOnKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit()
    }
  }

  return (
    <div className={styles.login}>
      <h2>Login</h2>
      <TextInput
        label={"Username"}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={handleOnKeyDown}
        autofocus={true}
      />
      <TextInput
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
