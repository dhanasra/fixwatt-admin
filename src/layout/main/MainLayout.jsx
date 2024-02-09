import { Box, Toolbar, useMediaQuery } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from './header/Header';
import MainDrawer from './drawer/MainDrawer';
import { useTheme } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { openDrawer } from '../../store/reducers/menu';
import navigation from '../../menu-items/index';
import { useEffect, useState } from 'react';
import Breadcrumbs from '../../components/@extended/Breadcrumbs';

const MainLayout = ()=>{

    const theme = useTheme();
    const matchDownLG = useMediaQuery(theme.breakpoints.down('lg'));
    const dispatch = useDispatch();

    const { drawerOpen } = useSelector((state) => state.menu);

    // drawer toggler
    const [open, setOpen] = useState(drawerOpen);
    const handleDrawerToggle = () => {
        setOpen(!open);
        dispatch(openDrawer({ drawerOpen: !open }));
    };

    // set media wise responsive drawer
    useEffect(() => {
        setOpen(!matchDownLG);
        dispatch(openDrawer({ drawerOpen: !matchDownLG }));
    }, [matchDownLG]);

    useEffect(() => {
        if (open !== drawerOpen) setOpen(drawerOpen);
    }, [drawerOpen]);


    return (
        <Box sx={{ display: 'flex', width: '100%', position: 'relative' }}>
            <Header open={open} handleDrawerToggle={handleDrawerToggle} />
            <MainDrawer open={open} handleDrawerToggle={handleDrawerToggle} />
            <Box component="main" sx={{ width: '100%', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
                <Toolbar />
                <Breadcrumbs id="bctag" navigation={navigation} title />
                <Outlet/>
            </Box>
        </Box>
    );
}

export default MainLayout;