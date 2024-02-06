
import MainLayout from "../layout/main/MainLayout";
import CreateCustomer from "../pages/customers/create/CreateCustomer";
import CustomerList from "../pages/customers/list/CustomerList";

const MainRoutes = {
    path: '/',
    element: <MainLayout/>,
    children: [
        {
            path: '/dashboard',
            element: <CustomerList/>
        },
        {
            path: '/orders',
            element: <></>
        },
        {
            path: '/customer',
            element: <CreateCustomer/>
        }
    ]
}

export default MainRoutes;