import AddServiceForm from '../components/AddService/AddServiceForm'
import addServiceImage from '../assets/AddService.svg'
const AddService = () => {
  return (
    <div className="flex flex-col min-h-screen">
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
