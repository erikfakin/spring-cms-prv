import React from "react"
import ReactDOM from "react-dom"
import { HashRouter, Route, Routes } from "react-router-dom"
import SinglePostPage from "pages/SinglePostPage"
import EditPostPage from "pages/EditPostPage"
import Homepage from "pages/Homepage"
import PageNotFound from "pages/PageNotFound"
import LoginPage from "pages/LoginPage"
import RequireAuth from "components/shared/auth/RequireAuth"
import { AuthProvider } from "context/authContext"
import DashboardPage from "pages/DashboardPage"
import CategoryPostsPage from "pages/CategoryPostsPage"
import SearchPage from "pages/SearchPage"
import Layout from "components/layout/layout/Layout"

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <HashRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route
              path="/category/:categoryTitle"
              element={<CategoryPostsPage />}
            />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="posts/:postId" element={<SinglePostPage />} />
            <Route
              path="/dashboard"
              element={
                <RequireAuth>
                  <DashboardPage />
                </RequireAuth>
              }
            />
            <Route
              path="edit-post/"
              element={
                <RequireAuth>
                  <EditPostPage />
                </RequireAuth>
              }
            >
              <Route
                path=":postId"
                element={
                  <RequireAuth>
                    <EditPostPage />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Layout>
      </HashRouter>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
