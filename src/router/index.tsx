import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import AddService from '../pages/AddService'
import Home from '../pages/Home'
import Register from '../pages/Register'
import { DashboardLayout, MainLayout } from './Layouts'
import Login from '../pages/Login'
import ProtectedRoute from '../components/ProtecteRoute'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainLayout />}>
        <Route path="/dashboard" element={
          <ProtectedRoute isAuthentication={true} redirectPath="/register" >
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path=":id" element={<Dashboard />} />
        </Route>
        <Route index element={<Home />} />
        <Route path="/add-service" element={
          <ProtectedRoute isAuthentication={true} redirectPath="/register" >
            <AddService />
          </ProtectedRoute>
        } />
        <Route path="/login" element={
          <ProtectedRoute isAuthentication={false} redirectPath="/dashboard" >
            <Login />
          </ProtectedRoute>
        } />
        <Route path="/register" element={
          <ProtectedRoute isAuthentication={false} redirectPath="/dashboard" >
            <Register />
          </ProtectedRoute>
        } />
      </Route>
      <Route path="*" element={<div>404</div>} />
    </>
  )
)

export default router
