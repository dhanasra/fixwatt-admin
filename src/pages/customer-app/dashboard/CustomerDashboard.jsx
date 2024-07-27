import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import CustomerAppBar from "../../../components/customer/CustomerAppBar";
import { useEffect, useState } from "react";
import { getCategories, getServices } from "../../../network/service";
import CategoriesGrid from "../../../components/customer/CategoriesGrid";
import ImagesGrid from "../../../components/customer/ImagesGrid";
import WorkCount from "../../../components/customer/WorkCount";
import HorizontalScroller from "../../../components/HorizontalScroller";
import { groupByCategory } from "../../../utils/utils";
import MainCard from "../../../components/MainCard";
import Footer from "../../../components/customer/Footer";
import Contact from "../../../components/customer/Contact";
import Faq from "../../../components/customer/Faq";
import Testimonials from "../../../components/customer/Testimonials";

const CustomerDashboard = ()=>{

  const [categories, setCategories] = useState([]);
  const [servicesGroup, setServicesGroup] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await Promise.all([
          getCategories(),
          getServices()
        ]);
        setCategories(data[0].categories);
        const services = data[1].services;        
        const serviceGroup = groupByCategory(services, "category_name")
        console.log(serviceGroup)
        setServicesGroup(serviceGroup);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <CustomerAppBar/>
      <Grid container sx={{padding: "100px 100px"}}>
        <Grid item xs={5}>
          <Stack direction={"column"} spacing={3}>
            <Stack direction={"column"}>
              <Typography variant="h1" sx={{maxWidth: "500px", fontWeight: 500, height: 50}}>Expert Services,</Typography>
              <Typography variant="h1" sx={{maxWidth: "500px", fontWeight: 500}}>Right at Your Doorstep</Typography>
            </Stack>
            <CategoriesGrid categories={categories}/>
          </Stack>
        </Grid>
        <Grid item xs={7}>
          <ImagesGrid/>
        </Grid> 
      </Grid>
      <WorkCount/>
      {
        Object.keys(servicesGroup).slice(0, 5).map((key)=>{

          return (
            <Stack direction={"column"} paddingX={8} paddingY={2} spacing={3}>
              <Typography variant="h3" fontWeight={600}>{key}</Typography>
              <HorizontalScroller>
                {
                  servicesGroup[key].map((i)=>{
                    return (
                        <MainCard >
                          <Stack >
                            <Typography variant="h6" fontSize={"15px"} fontWeight={500}>{i.name}</Typography>
                            <img src={i.image} width={"180px"} height={"180px"} style={{padding: "20px"}}/>
                          </Stack>
                        </MainCard>
                    )
                  })
                }
              </HorizontalScroller>
            </Stack>
          )
        })
      }

      <MainCard sx={{margin: "50px 60px"}}>
        <a href="https://play.google.com/store/apps/details?id=com.spiderlingz.inses" target="_blank">
          <img src="https://fixwatt.com/wp-content/uploads/2022/09/App-Pages-Palay-store.jpg" width="100%" alt="Banner Steps"/> 
        </a>
      </MainCard>
      
      {
        categories.length>5 && Object.keys(servicesGroup).slice(5, 10).map((key)=>{

          return (
            <Stack direction={"column"} paddingX={8} paddingY={2} spacing={3}>
              <Typography variant="h3" fontWeight={600}>{key}</Typography>
              <HorizontalScroller>
                {
                  servicesGroup[key].map((i)=>{
                    return (
                        <MainCard>
                          <Stack >
                            <Typography variant="h6" fontSize={"16px"} fontWeight={500}>{i.name}</Typography>
                            <img src={i.image} width={"150px"} height={"150px"} style={{paddingTop: "20px"}}/>
                          </Stack>
                        </MainCard>
                    )
                  })
                }
              </HorizontalScroller>
            </Stack>
          )
        })
      }

      <MainCard sx={{margin: "50px 60px"}} >
          <img src="https://fixwatt.com/wp-content/uploads/2022/09/Fixwatt-Customer-Process-chart.jpg" width="100%" alt="Banner Steps"/>
      </MainCard>


       {
        categories.length>10 && Object.keys(servicesGroup).slice(10, categories.length).map((key)=>{

          return (
            <Stack direction={"column"} paddingX={8} paddingY={2} spacing={3}>
              <Typography variant="h3" fontWeight={600}>{key}</Typography>
              <HorizontalScroller>
                {
                  servicesGroup[key].map((i)=>{
                    return (
                        <MainCard>
                          <Stack >
                            <Typography variant="h6" fontSize={"17px"} fontWeight={500}>{i.name}</Typography>
                            <img src={i.image} width={"150px"} height={"150px"} style={{paddingTop: "20px"}}/>
                          </Stack>
                        </MainCard>
                    )
                  })
                }
              </HorizontalScroller>
            </Stack>
          )
        })
      }

      <Testimonials/>

      <Contact/>

      <Faq/>

      <Divider/>

      <Footer/>
    </>
  )
}

export default CustomerDashboard;