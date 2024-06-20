import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import AddService from "../pages/AddService";
import Home from "../pages/Home";
import DashboardLayout from "../pages/DashboardLayout";

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