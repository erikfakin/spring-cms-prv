import { post } from 'adapters/xhr';
import { createContext, useState, useContext } from 'react'
import { apiUrl } from 'utils/constants/env';

let AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  let [user, setUser] = useState(localStorage.getItem("user"));
  const [token, setToken] = useState(localStorage.getItem("token"))

  let signin = async (username, password, callback) => {
    const res = await post(apiUrl + "/login", {
      username,
      password,
    })
    setUser(username)
    setToken(res.headers.get("token"))
    localStorage.setItem("user", username)
    localStorage.setItem("token", res.headers.get("token"))
    callback()
  };

  let signout = (callback) => {
    setUser()
    setToken()
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    callback()
  };

  const refreshToken = () => {

  }

  let value = { user,token , signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
}