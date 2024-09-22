import { Toaster } from 'react-hot-toast'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from "@/components/theme-provider"
import router from './router'

function App() {
  return (
    <div className="h-screen">
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
        <Toaster />
      </ThemeProvider>
    </div>
  )
}

export default App
