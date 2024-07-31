import React, { useEffect, useState } from 'react'
import CustomerAppBar from '../../../components/customer/CustomerAppBar'
import { Box, Button, Divider, Grid, Stack, Typography } from '@mui/material'
import { groupByCategory, useQuery } from '../../../utils/utils';
import { getCategory, getServices } from '../../../network/service';
import MainCard from '../../../components/MainCard';
import Footer from '../../../components/customer/Footer';
import CART from '../../../assets/cart.png'
import PRICE from '../../../assets/price.png'
import SAFETY from '../../../assets/safety.png'
import CHECK from '../../../assets/check.png'


function ServiceAddScreen() {

  const [ category, setCategory ] = useState();
  const [ services, setServices ] = useState([])
  const query = useQuery();

  useEffect(()=>{

    const fetchData = async()=>{
      const categoryID = query.get('category');
      const data = await Promise.all([
        getCategory(categoryID),
        getServices()
      ]);
      setCategory(data[0].category);
      const serviceList = data[1].services;  
      console.log(serviceList) 
      const serviceGroup = groupByCategory(serviceList, "category_id");
      setServices(serviceGroup[categoryID]);     
      console.log(category)
    }

    fetchData();
  }, [])

  return (
    <>
      <CustomerAppBar/>
      <Grid container sx={{padding: "100px 100px", position: "relative"}} spacing={3}>
        <Grid item xs={3}>
          <Stack direction={"column"} sx={{position: "sticky", top: "100px"}}>
            <Typography variant="h2" fontWeight={400}>
              { category?.name }
            </Typography>
            <img src={category?.image} />
          </Stack>
        </Grid>
        <Grid item xs={5}>
          <MainCard>
            {
              services?.map((service)=>{
                return (
                  <Stack direction={"column"} key={service.id} sx={{mb: 2}}>
                    <Stack direction={"row"}  sx={{justifyContent: "space-between"}} alignItems={"center"}>
                      <Stack direction={"row"} spacing={2}>
                        <img src={service.image} width={"80px"} height={"80px"} style={{ padding: "4px", }} />
                        <Stack direction={"column"} spacing={0.5} justifyContent={"center"}>
                          <Typography variant="h5" fontWeight={600}>{service.name}</Typography>
                          <Typography variant="h5" fontWeight={500}>{`\u20b9 ${service.price}`}</Typography>
                        </Stack>
                      </Stack>
                      <Button variant="outlined" sx={{height: "30px"}}>Add</Button>
                    </Stack>
                    <Divider sx={{height: "20px"}}/>
                  </Stack>
                )
              })
            }
          </MainCard>
        </Grid>
        <Grid item xs={4} >
          <Stack direction={"column"} spacing={2} sx={{position: "sticky", top: "100px"}}>
            <MainCard>
              <Stack direction={"column"} sx={{my: 2}} spacing={1} justifyContent={"center"} alignItems={"center"}>
                <Box component={"img"} src={CART} width={40} height={40}/>
                <Typography sx={{color: "rgb(117, 117, 117)"}}>No items in your cart</Typography>
              </Stack>
            </MainCard>
            <MainCard>
              <Stack direction={"column"} spacing={2}>
                <Typography variant='h5' >FIXWATT Promises</Typography>
                <Stack direction={"row"} spacing={1}>
                  <Box component={"img"} src={PRICE} width={20} height={20}/>
                  <Stack direction={"column"} spacing={0}>
                    <Typography variant='h6'>Suitable Prices</Typography>
                    <Typography variant='body2' color={"gray"}>Appropriate cost, neither lesser nor higher</Typography>
                  </Stack>
                </Stack>
                <Stack direction={"row"} spacing={1}>
                  <Box component={"img"} src={SAFETY} width={20} height={20}/>
                  <Stack direction={"column"} spacing={0}>
                    <Typography variant='h6'>Free cancellation & Reschedule</Typography>
                    <Typography variant='body2' color={"gray"}>Wanna cancel or reschedule? not a problem. No charges.</Typography>
                  </Stack>
                </Stack>
                <Stack direction={"row"} spacing={1}>
                  <Box component={"img"} src={CHECK} width={20} height={20}/>
                  <Stack direction={"column"} spacing={0}>
                    <Typography variant='h6'>Ace Professionals</Typography>
                    <Typography variant='body2' color={"gray"}>Best Professionals. Hand-picked gems. We never trade-off quality.</Typography>
                  </Stack>
                </Stack>
              </Stack>
            </MainCard>
          </Stack>
        </Grid>
      </Grid>
      <Footer/>
    </>
  )
}

export default ServiceAddScreen