
import MainLayout from "../layout/main/MainLayout";
import CustomerList from "../pages/customers/list/CustomerList";
import CreateCustomer from "../pages/customers/create/CreateCustomer";
import OrderList from "../pages/orders/list/OrderList";
import CreateOrder from "../pages/orders/create/CreateOrder";

const MainRoutes = {
    path: '/',
    element: <MainLayout/>,
    children: [
        {
            path: '/dashboard',
            element: <></>
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
        }
    ]
}

export default MainRoutes;