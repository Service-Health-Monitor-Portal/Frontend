import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"

const AddServiceLayout = () => {
    return (
        <div className="flex flex-col ">
            <Navbar />
            <Outlet />
        </div>
    )
}

export default AddServiceLayout