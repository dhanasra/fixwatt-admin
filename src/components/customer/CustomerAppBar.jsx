import { Box, IconButton, InputAdornment, ListItemIcon, Menu, MenuItem, OutlinedInput, Stack, Toolbar, Typography } from "@mui/material";
import { Global, useTheme } from "@emotion/react";
import logo from '.././../assets/app-logo.png';
import { LoginOutlined, LogoutOutlined, SearchOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import AppBarStyled from "../../layout/main/header/AppBarStyled";
import { useEffect, useState } from "react";
import DB from "../../network/db";
import { useNavigate } from "react-router-dom";
import LoginPopup from "./LoginPopup";

const CustomerAppBar = ({ handleClick })=>{
  const theme = useTheme();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [ openLogin, setOpenLogin ] = useState(false);

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
          <Box component={'img'} src={logo} height={"50px"} marginRight={"50px"}/>
          {
            options.map((e)=>{
              return (
                <Box onClick={()=>handleClick(e["id"])} key={e["id"]} sx={{cursor: "pointer", padding: "0 20px", whiteSpace: "nowrap"}}>
                  <Typography>{e["name"]}</Typography>
                </Box>
              )
            })
          }
          <Stack direction={"row"} justifyContent={"end"} spacing={2} sx={{width: "100%"}}>
            <OutlinedInput
              sx={{
                borderRadius: "10px",
                width: "200px"
              }}
              startAdornment={
                <InputAdornment position="start" sx={{ mr: -0.5 }}>
                  <SearchOutlined />
                </InputAdornment>
              }
              placeholder="Search services"
            />
            <IconButton onClick={()=>navigate("/c/checkout")}>
              <ShoppingCartOutlined style={{fontSize: "20px"}}/>
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