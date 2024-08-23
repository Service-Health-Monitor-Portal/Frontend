import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import AddService from '../pages/AddService'
import Home from '../pages/Home'
import Register from '../pages/Register'
import { DashboardLayout, MainLayout } from './Layouts'
import Login from '../pages/Login'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/add-service" element={<AddService />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<div>404</div>} />
      </Route>
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path=":id" element={<Dashboard />} />
      </Route>
      <Route path="*" element={<div>404</div>} />
    </>
  )
)

export default router
