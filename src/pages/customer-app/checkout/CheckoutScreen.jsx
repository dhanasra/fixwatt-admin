import React, { useEffect, useState } from 'react'
import CustomerAppBar from '../../../components/customer/CustomerAppBar'
import { Box, Button, Divider, Grid, Icon, ListItem, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material'
import { CheckOutlined, ClockCircleOutlined, EnvironmentOutlined, MessageOutlined, MobileOutlined, PhoneFilled, PhoneOutlined, TagFilled } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux';
import MainCard from '../../../components/MainCard';
import DB from '../../../network/db';
import { LuLocate } from 'react-icons/lu';
import { BiLocationPlus } from 'react-icons/bi';
import { CiLocationOn } from 'react-icons/ci';
import { FaLocationPin, FaMapLocation } from 'react-icons/fa6';
import AddressPicker from '../../../components/dialogs/AddressPicker';
import SlotPicker from '../../../components/dialogs/SlotPicker';
import CreateAddressDialog from '../../../components/dialogs/CreateAddressDialog';
import { formatDate } from '../../../utils/utils';

function CheckoutScreen() {

  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [ user, setUser ] = useState(null);
  const [ selectedAddress, setSelectedAddress ] = useState(null);
  const [ selectedDate, setSelectedDate ] = useState(null);
  const [ selectedTime, setSelectedTime ] = useState(null);

  const [ pickAddress, setPickAddress ] = useState(false);
  const [ openAddress, setOpenAddress ] = useState(false);
  const [ pickSlot, setPickSlot ] = useState(false);

  useEffect(()=>{
    setUser(DB.getUser());
  }, [])

  return (
    <>
      <CreateAddressDialog open={openAddress} onCancel={()=>setOpenAddress(false)}/>
      <AddressPicker 
        open={pickAddress} 
        addresses={user?.addresses} 
        onNewAddress={()=>setOpenAddress(true)}
        onProceed={(a)=>{
          setSelectedAddress(a);
          setPickAddress(false);
        }}
      />
      <SlotPicker 
        open={pickSlot}
        onProceed={(d, t)=>{  
          setSelectedDate(d);
          setSelectedTime(t);
          setPickSlot(false);
        }}
      />
      <CustomerAppBar/>
      <Stack sx={{alignItems: "center", mt: "100px"}}>
      <Grid container sx={{maxWidth: "900px", position: "relative"}} spacing={3}>
        <Grid item xs={7}>
          <Stack direction={"column"} sx={{position: "sticky", top: "100px"}}>
            {
              user
                ? (
                  <MainCard>
                    <Stack spacing={1.5}>
                      <ListItem>
                        <Stack direction={"row"} spacing={2}>
                          <Icon sx={{ background: "#f0f0f0", width: "40px", height: "40px", borderRadius: "4px" }}>
                            <MessageOutlined style={{fontSize: "16px"}}/>
                          </Icon>
                          <Stack spacing={0.5}>
                            <Typography variant="h5" fontWeight={600} fontSize={15}>Send booking details to</Typography>
                            <Typography>{user.phone}</Typography>
                          </Stack>
                        </Stack>
                      </ListItem>
                      <Divider/>
                      <ListItem>
                        <Stack direction={"row"} spacing={2}>
                          <Icon sx={{ background: "#f0f0f0", width: "40px", height: "40px", borderRadius: "4px" }}>
                            <EnvironmentOutlined style={{fontSize: "16px"}}/>
                          </Icon>
                          {
                            selectedAddress
                            ? (
                              <Stack spacing={0.5}>
                                <Typography variant="h5" fontWeight={600} fontSize={15}>Address</Typography>
                                <Typography>{`${selectedAddress.type} - ${selectedAddress.address}, ${selectedAddress.pincode}`}</Typography>
                              </Stack>
                            )
                            : (
                              <Button onClick={()=>setPickAddress(true)} variant="contained">Select an address</Button>
                            )
                          }
                        </Stack>
                      </ListItem>
                      <Divider/>
                      <ListItem sx={{opacity: selectedAddress ? 1 : 0.5}}>
                        <Stack direction={"row"} spacing={2} alignItems={"center"}>
                          <Icon sx={{ background: "#f0f0f0", width: "40px", height: "40px", borderRadius: "4px" }}>
                            <ClockCircleOutlined style={{fontSize: "16px"}}/>
                          </Icon>
                          {
                            selectedAddress
                            ? (
                              (selectedDate && selectedTime)
                              ? (
                                <Stack spacing={0.5}>
                                  <Typography variant="h5" fontWeight={600} fontSize={15}>Slot</Typography>
                                  <Typography>{`${formatDate(selectedDate)} - ${selectedTime}`}</Typography>
                                </Stack>
                              )
                              : (
                                <Button onClick={()=>setPickSlot(true)} variant="contained">Select time & date</Button>
                              )
                            )
                            : (
                              <Typography variant="h5" fontWeight={600} fontSize={15}>Slot</Typography>
                            )
                          }
                        </Stack>
                      </ListItem>
                      <Divider/>
                      <ListItem sx={{opacity: (selectedDate && selectedTime) ? 1 : 0.5}}>
                        <Stack direction={"column"} spacing={2} sx={{width: "100%"}}>
                          <Stack direction={"row"} spacing={2} alignItems={"center"}>
                            <Icon sx={{ background: "#f0f0f0", width: "40px", height: "40px", borderRadius: "4px" }}>
                              <CheckOutlined style={{fontSize: "16px"}}/>
                            </Icon>
                            
                            {
                              (selectedDate && selectedTime)
                              ? (
                                <Stack spacing={0.5}>
                                  <Typography variant="h5" fontWeight={600} fontSize={15}>Confirm</Typography>
                                  
                                </Stack>
                              )
                              : (
                                <Typography variant="h5" fontWeight={600} fontSize={15}>Confirm</Typography>
                              )
                            }
                            
                          </Stack>
                          <Button fullWidth sx={{background: "green", width: "100%"}} onClick={()=>setPickSlot(true)} variant="contained">Book Now ( Pay With Cash )</Button>
                        </Stack>
                      </ListItem>
                    </Stack>
                  </MainCard>
                )
                : <MainCard>
                  <Stack direction={"column"} spacing={2}>
                    <Stack spacing={1}>
                      <Typography variant="h5">Account</Typography>
                      <Typography variant="body1">To book the service, please login or sign up</Typography>
                    </Stack>
                    <Button variant="contained" sx={{background: "black"}}>
                        Login
                    </Button>
                  </Stack>  
                </MainCard>
            }
          </Stack>
        </Grid>
        <Grid item xs={5} >
          <Stack direction={"column"} spacing={2} sx={{position: "sticky", top: "100px"}}>
            <MainCard>
              <Stack spacing={2}>
                <Typography variant="h5">Cart</Typography>
                <Stack direction={"column"} spacing={1}>
                  {
                    items.map((i)=>{
                      return (
                        <Stack direction={"row"} justifyContent={"space-between"}>
                          <Typography>{i.name}</Typography>
                          <Typography>{`\u20b9${i.price} x ${i.count}`}</Typography>
                        </Stack>
                      )
                    })
                  }
                </Stack>

                <Box
                  sx={{
                    p: 1,
                    color: "green",
                    background: "rgb(237, 247, 242)"
                  }}
                >
                  <Stack direction={"row"} spacing={1} alignItems={"center"}>
                    <TagFilled/>
                    <Typography>Material cost will be additional, if any.</Typography>
                  </Stack>
                </Box>

                {/* <Button variant="contained" sx={{background: "black"}} onClick={()=>navigate('/c/checkout')}>
                  View Cart
                </Button> */}
              </Stack>
            </MainCard>
          </Stack>
        </Grid>
      </Grid>
      </Stack>
    </>
  )
}

export default CheckoutScreen