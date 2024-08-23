import MinimalLayout from "../layout/minimal/MinimalLayout";
import BusinessScreen from "../pages/customer-app/business/BusinessScreen";
import CheckoutScreen from "../pages/customer-app/checkout/CheckoutScreen";
import CustomerDashboard from "../pages/customer-app/dashboard/CustomerDashboard";
import ServicePartnerScreen from "../pages/customer-app/service-partner/ServicePartnerScreen";
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
            path: '/c/service-partner',
            element: <ServicePartnerScreen/>
        },
        {
            path: '/c/business',
            element: <BusinessScreen/>
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