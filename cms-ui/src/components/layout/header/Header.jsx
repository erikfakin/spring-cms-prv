import { useAuth } from "context/authContext"
import { Link, useLocation, useNavigate } from "react-router-dom"

import "./Header.css"

const Header = () => {
  let navigate = useNavigate()
  let location = useLocation()
  const auth = useAuth()
  return (
    <div className="header-wrapper">
      <div className="header">
        <Link to="/" className="header__logo">
          <h2 className="header__logo">SimpleCMS</h2>
        </Link>
        <div className="header__navigation">
          <Link className="header__navigation__link" to="/">
            Home
          </Link>
          <Link className="header__navigation__link" to="/edit-post">
            Create post
          </Link>
          <button onClick={() => {
            auth.signout(() => {navigate(location)})
           
            
          }}>Logout</button>
          <button onClick={() => {
          
            auth.refreshToken();
            
          }}>Refresh token</button>
        </div>
      </div>
    </div>
  )
}

export default Header
