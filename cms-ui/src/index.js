import React from "react"
import ReactDOM from "react-dom"
import reportWebVitals from "./reportWebVitals"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import SinglePostPage from "pages/SinglePostPage"
import EditPostPage from "pages/EditPostPage"
import { Layout } from "components/layout"
import Homepage from "pages/Homepage"
import PageNotFound from "pages/PageNotFound"
import LoginPage from "pages/LoginPage"

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="posts/:postId" element={<SinglePostPage />} />
          <Route path="edit-post/" element={<EditPostPage />}>
            <Route path=":postId" element={<EditPostPage />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
