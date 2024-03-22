import { useLocation, useNavigate, useRoutes } from "react-router-dom";
import MainRoutes from "./MainRoutes";
import AuthRoutes from "./LoginRoutes";
import { checkCookies } from "../utils/utils";
import { useEffect } from "react";

const CheckAuth = ({ children }) => {
    const navigate = useNavigate();
    const currentLocation = useLocation();
  
    useEffect(() => {
        const isLoggedIn = checkCookies();
        const isUnAuthRoute = ['/'].includes(currentLocation.pathname);

        
        console.log(isLoggedIn)
  
        if(isLoggedIn){
          if(isUnAuthRoute && currentLocation.pathname!='/dashboard'){
            navigate('/dashboard');
          }
        }else{
          if(!isUnAuthRoute){
            navigate('/')
          }
        }
  
    }, [navigate, currentLocation]);
  
    return <>{children}</>;
  };

export default function AppRoutes() {
    return (
        <CheckAuth>
            {
                useRoutes([AuthRoutes, MainRoutes])
            }
        </CheckAuth>
    );
}