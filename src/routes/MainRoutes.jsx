import MainLayout from "../layout/main/MainLayout";
import CustomerList from "../pages/customers/CustomerList";

const MainRoutes = {
    path: '/',
    element: <MainLayout/>,
    children: [
        {
            path: '/customers',
            element: <CustomerList/>
        }
    ]
}

export default MainRoutes;