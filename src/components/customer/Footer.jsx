import { Box, Grid, Stack, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import LogoImage from '../../assets/app-logo.png'
import MainCard from '../../components/MainCard'
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom'
// import { URL_CONST } from '../../../constants/url_const'


function Footer({handleProductClick}) {
  const navigate = useNavigate();

  const isMdScreen = useMediaQuery('(min-width:1024px)');
  const items = [
    {
      title: "Product",
      items: [
        {
          label: "Features",
          key: "features"
        },
        {
          label: "Discover",
          key: "discover"
        },
        {
          label: "Testimonials",
          key: "testimonials"
        },
        {
          label: "Faq",
          key: "faq"
        }
      ]
    },
    {
      title: "Company",
      items: [
        {
          label: "About Us",
          key: "about"
        },
        {
          label: "Help Center",
          key: "help"
        },
        {
          label: "Careers",
          key: "careers"
        }
      ]
    },
    {
      title: "Legal",
      items: [
        {
          label: "Terms",
          key: "terms"
        },
        {
          label: "Privacy",
          key: "privacy"
        },
        {
          label: "Contact",
          key: "contact"
        }
      ]
    }
  ]

  const handleClick =(key, title)=>{
    if(title==="Product" || (title==="Legal" && key==="contact")){
      handleProductClick(key)
    }else if(title==="Legal"){
      navigate(`/legal/${key}`)
    }
  }

  const openSocialMedia =(key)=>{
    let link = '';
    if(key==="instagram"){
      link = URL_CONST.INSTAGRAM_PAGE;
    }else if(key==="linkedin"){
      link = URL_CONST.LINKEDIN_PAGE;
    }else{
      link = URL_CONST.TWITTER_PAGE;
    }
    window.open(link, "_blank");
  }

  return (
    <Grid container px={ isMdScreen ? 6: "16px"} py={3} sx={{background: "white"}}>
      <Grid item xs={12} md={6} >
        <Stack spacing={2} alignItems={ isMdScreen ? "start": "center"}>
          <Box component={"img"} src={LogoImage} width={"50px"}/>
          <Stack spacing={1}>
            <Typography>Scan To Get Fixwatt App</Typography>
            <Box display={"flex"}>
              <MainCard>
                {/* <Box component={"img"} src={QrImage} width={"100px"}/> */}
              </MainCard>
            </Box>
          </Stack>
        </Stack>
      </Grid>
      {
        items.map((i, idx)=>{
          return (
            <Grid item xs={4} md={2}  key={idx}>
              <Stack spacing={3} sx={{pt: isMdScreen ? 1 : 5}} alignItems={"center"}>
                <Stack spacing={1} alignItems={"start"}>
                  <Box sx={{pb: 1}}>
                    <Typography variant='h5' >{i.title}</Typography>
                  </Box>
                  {
                    i.items.map((opt)=>{
                      return (
                        <Box
                          onClick={()=>handleClick(opt.key, i.title)}
                          sx={{
                            cursor: "pointer",
                            ":hover": {
                              color: "#1677ff"
                            }
                          }}
                        >
                          <Typography>{opt.label}</Typography>
                        </Box>
                      )
                    })
                  }
                </Stack>
              </Stack>
            </Grid>
          )
        })
      }
      <Grid item xs={12}>
        <Box
          sx={{
            margin: "54px 0px 54px 0px",
            borderTop: "1px solid rgba(191, 204, 217, 0.5)"
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Stack direction={ isMdScreen ? "row" : "column"} justifyContent={"space-between"} alignItems={"center"}>
          <Stack spacing={0.5} alignItems={ isMdScreen ? "start": "center"}>
            <Typography
              variant="h5" sx={{
                fontWeight: 500, 
                
              }}> <Stack direction={"row"} spacing={0.5}>
                <Box
                  onClick={()=>handleClick("privacy", "Legal")}
                  sx={{
                    cursor: "pointer",
                    ":hover": {
                      textDecoration: "underline"
                    }  
                  }}
                >Privacy Policy</Box> 
                <Box>.</Box> 
                <Box
                  onClick={()=>handleClick("terms", "Legal")}
                  sx={{
                    cursor: "pointer",
                    ":hover": {
                      textDecoration: "underline"
                    }  
                  }}
                >Terms of Service</Box>
              </Stack></Typography>
            <Typography sx={{color: "#6f6f6f", cursor: "pointer"}}>Copyright © Mylingz 2024</Typography>
          </Stack>

          <Stack direction={"row"} spacing={3} mt={ isMdScreen ? 0: 5}>
            <FaSquareInstagram onClick={()=>openSocialMedia("instagram")} style={{fontSize: "28px", color: "#6f6f6f", cursor: "pointer"}}/>
            <FaLinkedin onClick={()=>openSocialMedia("linkedin")} style={{fontSize: "28px", color: "#6f6f6f", cursor: "pointer"}}/>
            <FaXTwitter onClick={()=>openSocialMedia("twitter")} style={{fontSize: "28px", color: "#6f6f6f", cursor: "pointer"}}/>
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={12} sx={{pt: 6}}>
        <Stack alignItems={"center"}>
          <Typography variant="body2" color={"#6f6f6f"}>Powered By</Typography>
          <Typography
            // onClick={()=>window.open(URL_CONST.COMPANY, "_blank")}
            sx={{cursor: "pointer"}}
            variant="body1" fontWeight={700} color={"#5b3fa9"}>SPIDERLINGZ</Typography>
        </Stack>
      </Grid>
    </Grid>
  )
}

export default Footer