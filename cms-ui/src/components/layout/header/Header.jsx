import { useAuth } from "context/authContext"
import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"

import "./Header.css"

const Header = () => {
  let navigate = useNavigate()
  let location = useLocation()
  const auth = useAuth()

  const [search, setSearch] = useState("")

  const handleOnKeyDown = e => {
    if (e.key === 'Enter') {
      navigate("/search/?q=" + search)
      setSearch("")
    }
    
  }


  return (
    <div className="header-wrapper">
      <div className="header">
        <input onKeyDown={handleOnKeyDown} name="search" value={search} onChange={(e => setSearch(e.target.value))} />
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
          <Link className="header__navigation__link" to="/dashboard">
            Dashboard
          </Link>
          <button
            onClick={() => {
              auth.signout(() => {
                navigate(location)
              })
            }}
          >
            Logout
          </button>
          <button
            onClick={() => {
              auth.refreshToken()
            }}
          >
            Refresh token
          </button>
        </div>
      </div>
    </div>
  )
}

export default Header
