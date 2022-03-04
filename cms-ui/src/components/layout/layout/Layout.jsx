import { Header } from "components/layout"
import "./Layout.css"
const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="content">{children}</div>
    </>
  )
}

export default Layout
