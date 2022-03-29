import { login, tokenRefresh } from "adapters/xhr"
import { createContext, useState, useContext, useEffect } from "react"
import { isExpired } from "react-jwt"

let AuthContext = createContext(null)

//25 minutes
const REFRESH_INTERVAL = 1000 * 60 * 25

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem("user"))
  const [token, setToken] = useState(localStorage.getItem("token"))

  let refreshTimeout

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token && !isExpired(token)) {
      refreshToken()
    }
  }, [])

  const isSignedIn = token && !isExpired(token)

  const signin = async (username, password, callback) => {
    const res = await login({
      username,
      password,
    })
    if (!res.error) {
      setUser(username)
      setToken(res.headers.get("token"))
      localStorage.setItem("user", username)
      localStorage.setItem("token", res.headers.get("token"))
      // auto refresh token every 25 minutes 1000*60*25
      refreshTimeout = setTimeout(refreshToken, REFRESH_INTERVAL)
      callback()
    }
    return res
  }

  const signout = (callback) => {
    setUser("")
    setToken("")
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    clearTimeout(refreshTimeout)
    callback()
  }

  const refreshToken = async () => {
    const res = await tokenRefresh()
    setToken(res.headers.get("token"))
    localStorage.setItem("token", res.headers.get("token"))
    clearTimeout(refreshTimeout)
    refreshTimeout = setTimeout(refreshToken, REFRESH_INTERVAL)
  }

  const value = { user, token, signin, signout, refreshToken, isSignedIn }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}
