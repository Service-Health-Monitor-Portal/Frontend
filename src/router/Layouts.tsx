import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Dashboard/Sidebar'
import { useState } from 'react'
import Navbar from '@/components/Navbar'

export const MainLayout = () => {
  return (
    <div className="flex flex-col h-full">
      <Navbar />
      <Outlet />
    </div>
  )
}

export const DashboardLayout = () => {
  const [open, setOpen] = useState(false)
  const handleOpenBar = () => {
    console.log('open')
    setOpen(!open)
  }
  return (
    <div className="relative flex h-full">
      <button className="absolute z-50 p-2 top-4 left-4 md:hidden" onClick={handleOpenBar}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>
      <Sidebar open={open} setOpen={setOpen} />
      <div className={`flex-1 ${open ? 'opacity-50' : 'opacity-100'}`}>
        <Outlet />
      </div>
    </div>
  )
}
