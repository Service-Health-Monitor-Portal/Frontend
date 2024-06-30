import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

interface IServiceMetadata {
  name: string
  id: number
}

const ServicesList = () => {
  const [services, setServices] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:8080/influxdb/services')
      .then((res) => {
        console.log(res.data)
        setServices(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  return (
    <div className="flex flex-col text-center gap-3 text-[#E1E1E1] font-semibold w-full">
      {services.map((service: IServiceMetadata, index) => {
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
      })}
    </div>
  )
}

export default ServicesList
