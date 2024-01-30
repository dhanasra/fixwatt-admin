import { Box, Toolbar, AppBar } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from './header/Header';

const MainLayout = ()=>{

    return (
        <Box sx={{ display: 'flex', width: '100%', position: 'relative' }}>
            <Header/>
            <Box component="main" sx={{ width: '100%', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
            <Toolbar />
            <Outlet/>
            </Box>
        </Box>
    );
}

export default MainLayout;