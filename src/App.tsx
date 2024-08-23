import { Toaster } from 'react-hot-toast'
import { RouterProvider } from 'react-router-dom'
import router from './router'

function App() {
  return (
    <div className="h-screen text-white">
      <RouterProvider router={router} />
      <Toaster />
    </div>
  )
}

export default App
