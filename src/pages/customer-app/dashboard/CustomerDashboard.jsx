import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import CustomerAppBar from "../../../components/customer/CustomerAppBar";
import { useEffect, useRef, useState } from "react";
import { getCategories, getCustomerCategories, getCustomerServices, getReviews, getServices } from "../../../network/service";
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
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { init } from "../../../store/reducers/cart";
import TypingAnimation from "../../../components/BouncingText";

const CustomerDashboard = ()=>{

  const [categories, setCategories] = useState([]);
  const [servicesGroup, setServicesGroup] = useState([]);
  const [ reviews, setReviews ] = useState([]);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const sectionRefs = {
    home: useRef(null),
    testimonials: useRef(null),
    about: useRef(null),
    services: useRef(null),
    contact: useRef(null)
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await Promise.all([
          getCustomerCategories(),
          getCustomerServices(),
          getReviews()
        ]);
        setCategories(data[0].categories);
        const services = data[1].services;  
        setReviews(data[2]["reviews"])
        
        dispatch(init(services));
        
        const serviceGroup = groupByCategory(services, "category_name")
        console.log(serviceGroup)
        setServicesGroup(serviceGroup);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchData();
  }, []);

  const handleScrollToSection = (section) => {
    if (sectionRefs[section].current) {
      sectionRefs[section].current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <div ref={sectionRefs.home}>
        <CustomerAppBar
          handleClick={(s)=>{
            if(s=="business"){
              navigate('/c/business');
            }else if(s=="partner"){
              navigate('/c/service-partner');
            }else{
              handleScrollToSection(s);
            }
          }}
        />
      </div>
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
      <Stack alignItems={"center"} sx={{width: "100%", py: 5}}>
        <Grid container sx={{maxWidth: "900px"}}>
            <Grid item xs={12} sx={{justifyContent: "center", display: "flex"}}>
              <Typography variant="h5">OUR - ARTICLES</Typography>
            </Grid>
            <Grid item xs={6} sx={{justifyContent: "center", display: "flex"}}>
              <Box onClick={()=>{window.open("https://thekarostartup.com/fixwatt-journey/", "_blank", "noopener,noreferrer")}}>
                <TypingAnimation text={"Karo Startup!"}/>
              </Box>
            </Grid>
            <Grid item xs={6} sx={{justifyContent: "center", display: "flex"}}>
              <Box onClick={()=>{window.open("https://www.vikatan.com/business/startups/father-is-an-electrician-son-abhilash-is-a-start-up-company-owner", "_blank", "noopener,noreferrer")}}>
                <TypingAnimation text={"Story Today!"}/>
              </Box>
            </Grid>
        </Grid>
      </Stack>
      <div ref={sectionRefs.services}>
        {
          Object.keys(servicesGroup).slice(0, 5).map((key)=>{

            return (
              <Stack  key={key} direction={"column"} paddingX={8} paddingY={2} spacing={3}>
                <Typography variant="h3" fontWeight={600}>{key}</Typography>
                <HorizontalScroller>
                  {
                    servicesGroup[key].map((i)=>{
                      return (
                          <MainCard sx={{cursor: "pointer"}} onClick={()=>navigate(`/c/service?category=${i.category_id}`)}>
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
      </div>

      <MainCard sx={{margin: "50px 60px"}}>
        <a href="https://play.google.com/store/apps/details?id=com.spiderlingz.inses" target="_blank">
          <img src="https://fixwatt.com/wp-content/uploads/2022/09/App-Pages-Palay-store.jpg" width="100%" alt="Banner Steps"/> 
        </a>
      </MainCard>
      
      {
        categories.length>5 && Object.keys(servicesGroup).slice(5, 10).map((key)=>{

          return (
            <Stack key={key} direction={"column"} paddingX={8} paddingY={2} spacing={3}>
              <Typography variant="h3" fontWeight={600}>{key}</Typography>
              <HorizontalScroller>
                {
                  servicesGroup[key].map((i)=>{
                    return (
                        <MainCard sx={{cursor: "pointer"}} onClick={()=>navigate(`/c/service?category=${i.category_id}`)}>
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

      <div ref={sectionRefs.about}>
      <MainCard sx={{margin: "50px 60px"}} >
          <img src="https://fixwatt.com/wp-content/uploads/2022/09/Fixwatt-Customer-Process-chart.jpg" width="100%" alt="Banner Steps"/>
      </MainCard>
      </div>


       {
        categories.length>10 && Object.keys(servicesGroup).slice(10, categories.length).map((key)=>{

          return (
            <Stack key={key}  direction={"column"} paddingX={8} paddingY={2} spacing={3}>
              <Typography variant="h3" fontWeight={600}>{key}</Typography>
              <HorizontalScroller>
                {
                  servicesGroup[key].map((i)=>{
                    return (
                        <MainCard sx={{cursor: "pointer"}} onClick={()=>navigate(`/c/service?category=${i.category_id}`)}>
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

      <div ref={sectionRefs.testimonials}>
        <Testimonials reviews={reviews}/>
      </div>

      <Stack sx={{alignItems: "center"}}>
        <Grid container spacing={6} sx={{maxWidth: "1000px"}}>
          <Grid item xs={6}>
            <Box
              sx={{
                position: 'relative',
                paddingBottom: '56.25%', /* 16:9 aspect ratio */
                height: 0,
                overflow: 'hidden',
                maxWidth: '100%',
                backgroundColor: '#000',
                borderRadius: 2,
                boxShadow: 1,
              }}
            >
              <iframe
                src={`https://www.youtube.com/embed/0IBKSUjRz4Q`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded YouTube"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
                sx={{
                  position: 'relative',
                  paddingBottom: '56.25%', /* 16:9 aspect ratio */
                  height: 0,
                  overflow: 'hidden',
                  maxWidth: '100%',
                  backgroundColor: '#000',
                  borderRadius: 2,
                  boxShadow: 1,
                }}
              >
                <iframe
                  src={`https://www.youtube.com/embed/b53-xbzO8tU`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Embedded YouTube"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                  }}
                />
              </Box>
          </Grid>
        </Grid>
      </Stack>
      
      <div ref={sectionRefs.contact}>
        <Contact/>
      </div>

      <div ref={sectionRefs.faq}>
        <Faq/>
      </div>

      <Divider/>

      <Footer/>
    </>
  )
}

export default CustomerDashboard;