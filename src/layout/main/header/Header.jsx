import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { AppBar, IconButton, Toolbar } from "@mui/material";
import HeaderContent from "./content/HeaderContent";
import { useTheme } from '@mui/material/styles';

const Header =({ open, handleDrawerToggle })=>{
    const theme = useTheme();

    const appBar = {
        position: 'fixed',
        color: 'inherit',
        elevation: 0,
        sx: {
          borderBottom: `1px solid ${theme.palette.divider}`
        }
    };

    const iconBackColor = 'grey.100';
    const iconBackColorOpen = 'grey.200';

    const mainHeader = (
       <Toolbar>
            <IconButton
                disableRipple
                aria-label="open drawer"
                onClick={handleDrawerToggle}
                edge="start"
                color="secondary"
                sx={{ color: 'text.primary', bgcolor: open ? iconBackColorOpen : iconBackColor, ml: { xs: 0, lg: -2 } }}
            >
                {!open ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
            </IconButton>
            <HeaderContent/>
       </Toolbar>
    )

    return (
        <AppBar {...appBar}>{mainHeader}</AppBar>
    )   
}

export default Header;