import MinimalLayout from "../layout/minimal/MinimalLayout";
import CheckoutScreen from "../pages/customer-app/checkout/CheckoutScreen";
import CustomerDashboard from "../pages/customer-app/dashboard/CustomerDashboard";
import ServiceAddScreen from "../pages/customer-app/service/ServiceAddScreen";

const CustomerRoutes = {
    path: '/',
    element: <MinimalLayout/>,
    children: [
        {
            path: '/customer',
            element: <CustomerDashboard/>
        },
        {
            path: '/c/service',
            element: <ServiceAddScreen/>
        },
        {
            path: '/c/checkout',
            element: <CheckoutScreen/>
        }
    ]
}

export default CustomerRoutes;