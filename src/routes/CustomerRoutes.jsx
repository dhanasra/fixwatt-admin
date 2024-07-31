import MinimalLayout from "../layout/minimal/MinimalLayout";
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
        }
    ]
}

export default CustomerRoutes;