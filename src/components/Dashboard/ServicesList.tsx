import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import useCustomQuery from '../../hooks/useCustomQuery'

interface IServiceMetadata {
  name: string
  id: number
}

const ServicesList = () => {
  const [services, setServices] = useState([])

  const { data, isLoading } = useCustomQuery({
    queryKey: ['services'],
    url: 'services',
    pollInterval: 6000,
    config: {
      headers: {
        'ngrok-skip-browser-warning': '1',
      },
    },
  })
  console.log('from ServicesList.tsx', data)

  useEffect(() => {
    if (data) {
      setServices(data)
    }
  }, [data])

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
