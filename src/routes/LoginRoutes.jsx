import MinimalLayout from "../layout/minimal/MinimalLayout";
import Login from "../pages/auth/login/Login";

const AuthRoutes = {
    path: '/',
    element: <MinimalLayout/>,
    children: [
        {
            path: '/',
            element: <Login/>
        },
    ]
}

export default AuthRoutes;