import AddServiceForm from "../components/AddService/AddServiceForm";
import Navbar from "../components/Navbar";
import addServiceImage from "../assets/AddService.svg";
const AddService = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-[#2C427F] to-[#101C49] ">
      <Navbar />
      <div className="flex-1 flex justify-around items-center w-full h-full">
        <AddServiceForm />
        <img src={addServiceImage} alt="add service" className="w-2/6" />
      </div>
    </div>
  );
};

export default AddService;
