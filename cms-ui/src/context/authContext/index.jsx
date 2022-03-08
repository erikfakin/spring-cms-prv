import { get, getProtected, post } from 'adapters/xhr';
import { createContext, useState, useContext } from 'react'
import { apiUrl } from 'utils/constants/env';

let AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  let [user, setUser] = useState(localStorage.getItem("user"));
  const [token, setToken] = useState(localStorage.getItem("token"))

  let refreshTimeout;



  let signin = async (username, password, callback) => {
    const res = await post(apiUrl + "/login", {
      username,
      password,
    })
    setUser(username)
    setToken(res.headers.get("token"))
    localStorage.setItem("user", username)
    localStorage.setItem("token", res.headers.get("token"))
    // auto refresh token every 25 minutes 1000*60*25
    refreshTimeout = setTimeout(refreshToken, 1000*60*25)
    console.log(refreshTimeout)
    callback()
  };

  let signout = (callback) => {
    setUser()
    setToken()
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    clearTimeout(refreshTimeout)
    console.log(refreshTimeout)
    callback()
  };

  const refreshToken = async () => {
    const res = await post(apiUrl+"/users/refresh")
    setToken(res.headers.get("token"))
    localStorage.setItem("token", res.headers.get("token"))
    clearTimeout(refreshTimeout)
    refreshTimeout = setTimeout(refreshToken, 1000*60*25)
    console.log(refreshTimeout)
  }

  let value = { user,token , signin, signout, refreshToken };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
}