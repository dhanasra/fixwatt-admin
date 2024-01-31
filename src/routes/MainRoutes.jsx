import MainLayout from "../layout/main/MainLayout";
import CreateCustomer from "../pages/customers/create/CreateCustomer";
import CustomerList from "../pages/customers/list/CustomerList";

const MainRoutes = {
    path: '/',
    element: <MainLayout/>,
    children: [
        {
            path: '/',
            element: <CustomerList/>
        },
        {
            path: '/customer',
            element: <CreateCustomer/>
        }
    ]
}

export default MainRoutes;