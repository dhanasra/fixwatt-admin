import { Badge, Box, IconButton, InputAdornment, ListItemIcon, Menu, MenuItem, OutlinedInput, Stack, Toolbar, Typography } from "@mui/material";
import { Global, useTheme } from "@emotion/react";
import logo from '.././../assets/app-logo.png';
import { LoginOutlined, LogoutOutlined, SearchOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import AppBarStyled from "../../layout/main/header/AppBarStyled";
import { useEffect, useState } from "react";
import DB from "../../network/db";
import { useNavigate } from "react-router-dom";
import LoginPopup from "./LoginPopup";
import { useSelector } from "react-redux";
import ServicesSearchBox from "./ServicesSearchBox";

const CustomerAppBar = ({ handleClick, minimal })=>{
  const theme = useTheme();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [ openLogin, setOpenLogin ] = useState(false);

  const { items, services } = useSelector((state) => state.cart);

  useEffect(()=>{
    setUser(DB.getUser());
  }, [])

  const [anchorEl, setAnchorEl] = useState(null);
  
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    setOpenLogin(true);
  }

  const handleLogout = () => {
    DB.clear();
    navigate(0);
  }

  const appBar = {
      position: 'fixed',
      color: 'inherit',
      elevation: 0,
      sx: {
        borderBottom: `1px solid ${theme.palette.divider}`
      }
  };

  const options = [
    { 
      id: "home",
      name: "Home" 
    },
    { 
      id: "about",
      name: "About" 
    },
    { 
      id: "services",
      name: "Services" 
    },
    { 
      id: "partner",
      name: "Service Partner" 
    },
    { 
      id: "contact",
      name: "Contact Us" 
    }
  ];

  return (
    <>
      <LoginPopup
        open={openLogin} 
        onOk={()=>{
          setOpenLogin(false);
          navigate(0);
        }} 
        onCancel={()=>setOpenLogin(false)}
      />
      <AppBarStyled {...appBar}>
        <Toolbar direction={"row"} spacing={2} sx={{width: "100%"}}>
          <Box component={'img'} onClick={()=>navigate('/customer')} sx={{cursor: "pointer"}} src={logo} height={"50px"} marginRight={"50px"}/>
          {
            !minimal && options.map((e)=>{
              return (
                <Box onClick={()=>handleClick(e["id"])} key={e["id"]} sx={{cursor: "pointer", padding: "0 20px", whiteSpace: "nowrap"}}>
                  <Typography>{e["name"]}</Typography>
                </Box>
              )
            })
          }
          <Stack direction={"row"} justifyContent={"end"} spacing={2} sx={{width: "100%"}}>
            
            <ServicesSearchBox services={services}/>

            <IconButton onClick={()=>navigate("/c/checkout")}>
              <Badge badgeContent={items.length} color="primary">
                <ShoppingCartOutlined style={{fontSize: "20px"}}/>
              </Badge>
            </IconButton>
            <IconButton onClick={handleMenuClick}>
              <UserOutlined style={{fontSize: "20px"}}/>
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              PaperProps={{
                style: {
                  width: 160,
                },
              }}
            >
              {
                user
                ? <MenuItem onClick={()=>handleLogout()}>
                    <ListItemIcon>
                      <LogoutOutlined fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                : <MenuItem onClick={()=>handleLogin()}>
                    <ListItemIcon>
                      <LoginOutlined fontSize="small" />
                    </ListItemIcon>
                    Login
                  </MenuItem>
              }
            </Menu>
          </Stack>
        </Toolbar>
      </AppBarStyled>
    </>
  )
}

export default CustomerAppBar;