import { useNavigate } from 'react-router-dom'
import ServicesList from './ServicesList'
import { Button } from '../ui/button'

interface SidebarProps {
  open: boolean
  setOpen: (open: boolean) => void
}

const Sidebar = ({ open, setOpen }: SidebarProps) => {
  const navigate = useNavigate()
  return (
    <div
      className={`${open ? 'flex pt-16' : 'hidden'
        } fixed md:static md:flex flex-col px-4 items-center justify-between py-5 w-full md:w-64 h-full bg-accent flex-shrink-0 z-50`}
    >
      <ServicesList setOpen={setOpen} />
      <button className="absolute p-2 top-4 right-4 md:hidden" onClick={() => setOpen(false)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <Button onClick={() => navigate('/add-service')}>
        <div className='flex gap-2'>
          Add Service
        </div>
      </Button>
    </div>
  )
}

export default Sidebar
