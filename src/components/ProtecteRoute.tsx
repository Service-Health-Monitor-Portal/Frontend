import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface IProps {
    children: ReactNode;
    redirectPath: string;
    isAuthentication: boolean;
}

const ProtectedRoute = ({ children, redirectPath, isAuthentication}: IProps) => {
    const token = localStorage.getItem('token');
    if(isAuthentication){
        return token ? <>{children}</> : <Navigate to={redirectPath} />;
    }
    else{
        return !token ? <>{children}</> : <Navigate to={redirectPath} />;
    }

}

export default ProtectedRoute;