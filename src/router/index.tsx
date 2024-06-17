import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import AddService from "../pages/AddService";
import Home from "../pages/Home";
import DashboardLayout from "../pages/DashboardLayout";
import AddServiceLayout from "../pages/AddServiceLayout";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<DashboardLayout />} >
                <Route index element={<Dashboard />} />
                <Route path=":id" element={<Dashboard />} />
            </Route>
            <Route path="/add-service" element={<AddServiceLayout />} >
            <Route index element={<AddService />} />
            </Route>

            <Route path="*" element={<div>404</div>} />
        </>
    )
);

export default router;