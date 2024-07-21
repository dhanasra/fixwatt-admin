import MainLayout from "../layout/main/MainLayout";
import MinimalLayout from "../layout/minimal/MinimalLayout";
import CustomerDashboard from "../pages/customer-app/dashboard/CustomerDashboard";

const CustomerRoutes = {
    path: '/',
    element: <MinimalLayout/>,
    children: [
        {
            path: '/customer',
            element: <CustomerDashboard/>
        }
    ]
}

export default CustomerRoutes;