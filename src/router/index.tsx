import { Outlet, Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import AddService from "../pages/AddService";
import Home from "../pages/Home";
import Sidebar from "../components/Dashboard/Sidebar";

const DashboardLayout = () => {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <Outlet />
        </div>
    )
}

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<DashboardLayout />} >
                <Route index element={<Dashboard />} />
                <Route path=":id" element={<Dashboard />} />
            </Route>
            <Route path="/add-service" element={<AddService />} />
            <Route path="*" element={<div>404</div>} />
        </>
    )
);

export default router;