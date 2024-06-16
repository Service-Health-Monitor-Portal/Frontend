import { NavLink } from "react-router-dom";
import services from "../../data/services"

const ServicesList = () => {
  console.log(services);
  return (
    <div className="flex flex-col text-center gap-3 text-[#E1E1E1] font-semibold w-full">
        {services.map((service, index) => {
            return (
                <NavLink to={service.id} key={index} className={({isActive}) => `${isActive? 'bg-gradient-to-r from-[#101C49] to-[#000000]' : 'bg-transparent'} w-full py-3` }>
                    {service.name}
                </NavLink>
            )
        })}
    </div>
  )
}

export default ServicesList