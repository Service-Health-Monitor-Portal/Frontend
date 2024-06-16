import { Outlet, Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Home from "../pages/Home";

function RouteLayout() {
    return (
        <Outlet />
    )
}

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<RouteLayout />}>
                <Route index element={<Home />} />
            </Route>
        </>
    )
);

export default router;