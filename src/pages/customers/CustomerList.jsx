import { Box, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';

const CustomerList =()=>{
    return (
        <Box>
            <Box component="main" sx={{ width: '100%', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
            <Toolbar />
            <Outlet/>
            </Box>
        </Box>
    )
}

export default CustomerList;