import { useNavigate } from "react-router-dom"
import Button from "../UI/Button"
import Plus from "../UI/Plus"
import ServicesList from "./ServicesList"

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-around w-64 bg-gradient-to-b from-[#2C427F] to-[#101C49] py-16">
        <h1 className="text-[#E1E1E1] text-xl font-semibold">Service tracker</h1>
        <ServicesList />
        <Button name="Add Service" onClick={() => navigate('/add-service')}>
          <Plus />
        </Button>
    </div>
  )
}

export default Sidebar