import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "react-toastify/dist/ReactToastify.css"
import { RouterProvider } from 'react-router'
import router from './router/router.jsx'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
    <ToastContainer
      position="top-right"
      autoClose={2400}
      newestOnTop
      closeOnClick
      pauseOnHover
      draggable
      hideProgressBar={false}
      limit={3}
      theme="dark"
      toastClassName="aurum-toast"
      bodyClassName="aurum-toast-body"
      progressClassName="aurum-toast-progress"
      className="aurum-toast-container"
    />
  </StrictMode>,
)
