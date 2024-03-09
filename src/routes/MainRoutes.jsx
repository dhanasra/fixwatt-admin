
import MainLayout from "../layout/main/MainLayout";
import CustomerList from "../pages/customers/list/CustomerList";
import CreateCustomer from "../pages/customers/create/CreateCustomer";
import OrderList from "../pages/orders/list/OrderList";
import CreateOrder from "../pages/orders/create/CreateOrder";
import ServicesList from "../pages/services/ServicesList";
import TechniciansList from "../pages/technicians/TechniciansList";
import Dashboard from "../pages/dashboard/Dashboard";
import OrderDetails from "../pages/orders/details/OrderDetails";
import EditOrder from "../pages/orders/edit/EditOrder";
import CustomerDetails from "../pages/customers/details/CustomerDetails";
import EditCustomer from "../pages/customers/edit/EditCustomer";
import CategoriesList from "../pages/categories/CategoriesList";

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
            path: '/orders/d/:orderId',
            element: <OrderDetails/>
        },
        {
            path: '/orders/e/:orderId',
            element: <EditOrder/>
        },
        {
            path: '/customers/d/:customerId',
            element: <CustomerDetails/>
        },
        {
            path: '/customers/e/:customerId',
            element: <EditCustomer/>
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
            path: '/categories',
            element: <CategoriesList/>
        },
        {
            path: '/team',
            element: <TechniciansList/>
        }
    ]
}

export default MainRoutes;