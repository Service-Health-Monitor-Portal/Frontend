import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import AddService from '../pages/AddService'
import Home from '../pages/Home'
import { DashboardLayout, MainLayout } from './Layouts'
import Login from '../pages/Login'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/add-service" element={<AddService />} />
        <Route path="*" element={<div>404</div>} />
      </Route>
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path=":id" element={<Dashboard />} />
      </Route>
      <Route path="/login" element={<Login />}>
        <Route index element={<Login />} />
        <Route path=":id" element={<Login />} />
      </Route>
    </>
  )
)

export default router
