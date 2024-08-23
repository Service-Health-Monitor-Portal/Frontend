import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import useCustomQuery from '../../hooks/useCustomQuery'
import Loader from '../Loader'

interface IServiceMetadata {
  name: string
  id: number
  description: string
}

interface ServicesListProps {
  setOpen: (open: boolean) => void
}

const ServicesList = ({setOpen}: ServicesListProps) => {
  const [services, setServices] = useState<IServiceMetadata[]>([])

  const { data, isLoading, error } = useCustomQuery({
    queryKey: ['services'],
    url: 'services',
    pollInterval: 6000,
    config: {
      headers: {
        'ngrok-skip-browser-warning': '1',
      },
    },
  })

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setServices(data);
    } else {
      setServices([]);
    }
  }, [data]);
  
  if (error) {
    return (
      <div className="flex flex-col text-center justify-center gap-3 text-[#E1E1E1] font-semibold w-full h-full">
        <p>Error loading services</p>
      </div>
    );
  }

  if (isLoading) {
    return <div className="flex flex-col text-center justify-center gap-3 text-[#E1E1E1] font-semibold w-full h-full">
      <Loader />
    </div>
  }

  if (!services.length) {
    return <div className="flex flex-col text-center justify-center gap-3 text-[#E1E1E1] font-semibold w-full h-full">
      <p>No services available</p>
    </div>
  }

  return (
    <div className="flex flex-col text-center gap-3 text-[#E1E1E1] font-semibold w-full overflow-auto">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        services.map((service: IServiceMetadata, index) => {
          return (
            <NavLink
              to={service.id.toString()}
              key={index}
              className={({ isActive }) =>
                `${isActive ? 'bg-gradient-to-r from-[#101C49] to-[#000000]' : 'bg-transparent'} w-full py-3`
              }
              onClick={() => setOpen(false)}              
            >
              {service.name}
            </NavLink>
          )
        })
      )}
    </div>
  )
}

export default ServicesList
