import { Box, IconButton, InputAdornment, OutlinedInput, Stack, Toolbar, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import logo from '.././../assets/app-logo.png';
import { SearchOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import AppBarStyled from "../../layout/main/header/AppBarStyled";

const CustomerAppBar = ()=>{
  const theme = useTheme();

  const appBar = {
      position: 'fixed',
      color: 'inherit',
      elevation: 0,
      sx: {
        borderBottom: `1px solid ${theme.palette.divider}`
      }
  };

  const options = [
    "Home", "About", "Services", "Service Partner", "Contact Us"
  ];

  return (
    <>
      <AppBarStyled {...appBar}>
        <Toolbar direction={"row"} spacing={2} sx={{width: "100%"}}>
          <Box component={'img'} src={logo} height={"50px"} marginRight={"50px"}/>
          {
            options.map((e)=>{
              return (
                <Box key={e} sx={{cursor: "pointer", padding: "0 20px", whiteSpace: "nowrap"}}>
                  <Typography>{e}</Typography>
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
            <IconButton>
              <ShoppingCartOutlined style={{fontSize: "20px"}}/>
            </IconButton>
            <IconButton>
              <UserOutlined style={{fontSize: "20px"}}/>
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBarStyled>
    </>
  )
}

export default CustomerAppBar;