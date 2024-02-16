
import MainLayout from "../layout/main/MainLayout";
import CustomerList from "../pages/customers/list/CustomerList";
import CreateCustomer from "../pages/customers/create/CreateCustomer";
import OrderList from "../pages/orders/list/OrderList";
import CreateOrder from "../pages/orders/create/CreateOrder";
import ServicesList from "../pages/services/ServicesList";
import TechniciansList from "../pages/technicians/TechniciansList";
import Dashboard from "../pages/dashboard/Dashboard";

const MainRoutes = {
    path: '/',
    element: <MainLayout/>,
    children: [
        {
            path: '/dashboard',
            element: <Dashboard/>
        },
        {
            path: '/customers',
            element: <CustomerList/>
        },
        {
            path: '/orders',
            element: <OrderList/>
        },
        {
            path: '/orders/create',
            element: <CreateOrder/>
        },
        {
            path: '/customers/create',
            element: <CreateCustomer/>
        },
        {
            path: '/services',
            element: <ServicesList/>
        },
        {
            path: '/team',
            element: <TechniciansList/>
        }
    ]
}

export default MainRoutes;