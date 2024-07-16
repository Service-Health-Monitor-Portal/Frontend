import AddServiceForm from '../components/AddService/AddServiceForm'
import Navbar from '../components/Navbar'
import addServiceImage from '../assets/AddService.svg'
const AddService = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-[#2C427F] to-[#101C49] ">
      <Navbar />
      <div className="flex items-center justify-around flex-1 w-full h-full">
        <AddServiceForm />
        <div className="w-2/6 hidden md:block">
          <img src={addServiceImage} alt="add service" className="w-full" />
        </div>
      </div>
    </div>
  )
}

export default AddService
