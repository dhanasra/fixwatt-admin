import { useRoutes } from "react-router-dom";
import MainRoutes from "./MainRoutes";
import AuthRoutes from "./LoginRoutes";


export default function AppRoutes() {
    return useRoutes([AuthRoutes, MainRoutes]);
}