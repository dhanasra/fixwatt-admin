import { DeleteOutlined, EditOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { Box, Button, Divider, FormControlLabel, Grid, IconButton, InputAdornment, MenuItem, OutlinedInput, Radio, RadioGroup, Stack, Typography } from "@mui/material";
import { useNavigate, useParams } from 'react-router-dom';
import MainCard from "../../../components/MainCard";
import { useEffect, useState } from "react";
import { deleteOrder, getOrder, getTechnicians, updateOrder, updateOrderTechnician, updatePaymentInfo } from "../../../network/service";
import ServiceInfoTable from "./ServiceInfoTable";
import { MdCurrencyRupee } from "react-icons/md";
import { MoneyConverter } from "../../../utils/utils";
import ConfirmDialog from "../../../components/dialogs/ConfirmDialog";
import SingleSelect from "../../../components/@extended/SingleSelect";
import { showSnackbar } from "../../../utils/snackbar-utils";
import { ArrowRightIcon } from "@mui/x-date-pickers";
import TechnicianInfoTable from "./TecnicianInfoTable";

const OrderDetails = ()=>{
  const location = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [technicians, setTechnicians] = useState([]);
  const [orderAddress, setOrderAddress] = useState(null);

  const [paymentReceivedFromCustomer, setPaymentReceivedFromCustomer] = useState(0);
  const [additionalCharges, setAdditionalCharges] = useState(0);
  const [paymentReceivedBy, setPaymentReceivedBy] = useState(null);
  const [profit, setProfit] = useState(0);

  const [invId, setInvId] = useState(null);

  const [openDelete, setOpenDelete] = useState(false);
  const [orderTechnicians, setOrderTechnicians] = useState([]);


  const handleDeleteClick = async()=>{
    await deleteOrder({orderId: order?.id})
    setOpenDelete(false);
    navigate(-1);
  }

  useEffect(()=>{
    const fetchOrder = async()=>{
      const result = await Promise.all([ 
        getOrder(location),
        getTechnicians()
      ]);

      const order = result[0].order;
      setOrder(order);

      const technicianIds = order.technicians.map(item => item.technician_id);
      const filteredTechnicians = result[1].technicians.filter((tech)=>technicianIds.includes(tech.id));
      setTechnicians(filteredTechnicians);

      const userAddresses = order?.user?.addresses??[];
      const orderAddress = userAddresses.find((ua)=>ua.id==order.user_address_id);

      setOrderAddress(orderAddress);
      setOrderTechnicians(order.technicians);
      setInvId(order.invoice_id);
      setPaymentReceivedFromCustomer(order?.payment_received_from_customer??0);
      setAdditionalCharges(order?.additional_charges??0);
      setPaymentReceivedBy(order?.payment_received_by);
    }
    fetchOrder();
  }, [])

  useEffect(()=>{

    const technicianPayments = orderTechnicians.reduce((total, e) => {
      if (e.payment_for_technician) {
        return total + parseInt(e.payment_for_technician);
      } else {
        return total;
      }
    }, 0)

    const p = paymentReceivedFromCustomer - additionalCharges - technicianPayments;
    setProfit(p);
  }, [paymentReceivedFromCustomer, additionalCharges, orderTechnicians ])

  const savePaymentInfo =async()=>{
    await Promise.all(orderTechnicians.map(async(ot)=>{
      await updateOrderTechnician(order.id, ot.id, {
        paid_to_technician: `${ot.paid_to_technician}`,
        payment_for_technician: ot.payment_for_technician,
      }) 
    }))

    await Promise.all([
      updateOrder(order.id, { additional_charges: additionalCharges }),
      updateOrder(order.id, { payment_received_from_customer: paymentReceivedFromCustomer }),
      updateOrder(order.id, { payment_received_by: paymentReceivedBy }),
      updateOrder(order.id, { invoice_id: invId }),
    ])

    const result = await getOrder(location);
    const updatedOrder = result.order;
    setOrder(updatedOrder);

    showSnackbar("Payment is updated successfully", { variant: 'success' });
  }

  return (
    <MainCard
      headerBorder
      title={
        <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
          <Typography>{`ORDER_${order?.id}`}</Typography>
          <Stack direction={"row"} spacing={1}>
            <IconButton onClick={()=>navigate(`/orders/e/${order?.id}`, { state: { data: {order} } })}>
              <EditOutlined/>
            </IconButton>
            <IconButton onClick={()=>setOpenDelete(true)}>
              <DeleteOutlined style={{color: "red"}}/>
            </IconButton>
            <Box width={6}/>
            <Button onClick={()=>{}} variant="contained" >
              <Typography>{order?.status =="REJECTED" ? "ON GOING" : order?.status }</Typography>
            </Button>
          </Stack>
        </Stack>
      }
    >
      <ConfirmDialog
        open={openDelete} 
        onOk={handleDeleteClick} 
        onCancel={()=>{
          setOpenDelete(false)
        }} 
        btnTxt={"Delete"}
        title={"Are you sure you want to delete?"}   
        content={`By deleting this order, this record will be completely deleted.`}
      />
      <Grid container spacing={4}>
        <Grid item xs={12} md={4} sm={5.5}>
          <MainCard>
            <Typography>Customer</Typography>
            <Stack spacing={1} sx={{mt: 2}}>
              <Typography variant="h5">{order?.user?.name}</Typography>
              <Stack>
                <Typography variant="h6">{orderAddress?.address}</Typography>
                <Typography variant="h6">{orderAddress?.pincode}</Typography>
                <Typography variant="h6">{orderAddress?.alternative_phone}</Typography>
              </Stack>
              <Stack direction={"row"} alignItems={"center"} spacing={1}>
                <PhoneOutlined/>
                <Typography variant="h6">{order?.user?.phone}</Typography>
              </Stack>
              {
                order?.alternative_phone && <Stack direction={"row"} alignItems={"center"} spacing={1}>
                  <PhoneOutlined/>
                  <Typography variant="h6">{order?.alternative_phone}</Typography>
                </Stack>
              }
              {
                order?.user?.email && <Stack direction={"row"} alignItems={"center"} spacing={1}>
                  <MailOutlined/>
                  <Typography variant="h6">{order?.user?.email}</Typography>
                </Stack>
              }
            </Stack>

          </MainCard>
        </Grid>
        <Grid item xs={0} md={4} sm={1}/>
        <Grid item xs={12} md={4} sm={5.5}/>
        <Grid item xs={12}>
          <Stack spacing={2}>
            <Typography variant="h5">Service</Typography>
            <ServiceInfoTable order={order}/>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={2}>
            <Typography variant="h5">Technicians</Typography>
            <TechnicianInfoTable orderId={order?.id} technicians={technicians}/>
          </Stack>
        </Grid>
        <Grid item xs={7}>
          <Stack spacing={2}>
            <Typography variant="h5">Notes</Typography>
            <Typography variant="h6">{order?.notes??'Not yet added.'}</Typography>
          </Stack>
        </Grid>
        <Grid item xs={5}>
          <Stack spacing={2}>
            <Grid container px={4}>
              {
               order?.status!="PENDING"
               
               ? <Grid item xs={12}>
                <Grid container spacing={2}>
                  
                  <Grid item xs={6} sx={{alignItems: "center", display: "flex"}}>
                    <Box>
                    <Typography >Payment Received From Customer</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <OutlinedInput 
                      fullWidth
                      sx={{
                        fontSize: "24px",
                        textAlign: "center",
                        "& input": {
                          textAlign: "end !important"
                        }
                      }}
                      onChange={(e)=>setPaymentReceivedFromCustomer(e.target.value)}
                      value={paymentReceivedFromCustomer}
                      type="number"
                      startAdornment={
                        <InputAdornment position="start">
                          <MdCurrencyRupee />
                        </InputAdornment>
                      }
                    />
                  </Grid>
                  <Grid item xs={6} sx={{alignItems: "center", display: "flex"}}>
                    <Box>
                    <Typography >Payment Received By</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <SingleSelect
                      value={paymentReceivedBy}
                      handleChange={(e)=>{
                        setPaymentReceivedBy(e)
                      }}
                      name={"technician"}
                      id={"technician"}
                      items={[
                        <MenuItem value={null}></MenuItem>,
                        <MenuItem value="organization">Company</MenuItem>,
                        <MenuItem value="technician">Technician</MenuItem>
                      ]}
                    />
                  </Grid>
                  <Grid item xs={6} sx={{alignItems: "center", display: "flex"}}>
                    <Box>
                    <Typography >Material Charges</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <OutlinedInput 
                      fullWidth
                      sx={{
                        fontSize: "24px",
                        textAlign: "center",
                        "& input": {
                          textAlign: "end !important"
                        }
                      }}
                      onChange={(e)=>setAdditionalCharges(e.target.value)}
                      value={additionalCharges}
                      type="number"
                      startAdornment={
                        <InputAdornment position="start">
                          <MdCurrencyRupee />
                        </InputAdornment>
                      }
                    />
                  </Grid>
                  {
                    orderTechnicians.map((technician, idx)=>{

                      const technicianInfo = technicians.find((e)=>e.id==technician.technician_id);

                      return (
                        <>
                        <Grid item xs={12}>
                          <Stack direction={"row"}>
                            <ArrowRightIcon></ArrowRightIcon>
                            <Stack>
                              <Typography >{`${technicianInfo.name}`}</Typography>
                              <Typography sx={{fontSize: "10px"}}>{`Technician ${idx+1}`}</Typography>
                            </Stack>
                          </Stack>
                        </Grid>
                        <Grid item xs={6} sx={{alignItems: "center", display: "flex"}}>
                          <Box>
                          <Typography >Payment For Technician</Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <OutlinedInput 
                            fullWidth
                            sx={{
                              fontSize: "24px",
                              textAlign: "center",
                              "& input": {
                                textAlign: "end !important"
                              }
                            }}
                            onChange={(e)=>{
                              const payment = e.target.value;
                              const updated = orderTechnicians.map((e)=>{
                                if(e.id==technician.id){
                                  return { ...technician, payment_for_technician: payment }
                                }else{
                                  return e;
                                }
                              })
                              setOrderTechnicians(updated);
                            }}
                            value={technician.payment_for_technician ?? 0}
                            type="number"
                            startAdornment={
                              <InputAdornment position="start">
                                <MdCurrencyRupee />
                              </InputAdornment>
                            }
                          />
                        </Grid>
                        <Grid item xs={6} sx={{alignItems: "center", display: "flex"}}>
                          <Box>
                          <Typography >Paid To Technician</Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <RadioGroup
                            row
                            defaultValue={false}
                            value={technician.paid_to_technician=="true"}
                            name="paid-to-technician"
                            onChange={(e)=>{
                              const paid = e.target.value;
                              const updated = orderTechnicians.map((e)=>{
                                if(e.id==technician.id){
                                  return { ...technician, paid_to_technician: paid }
                                }else{
                                  return e;
                                }
                              })
                              setOrderTechnicians(updated);
                            }}
                          >
                            <FormControlLabel value={true} control={<Radio />} label="Yes" />
                            <FormControlLabel value={false} control={<Radio />} label="No" />
                          </RadioGroup>
                        </Grid>
                        </>
                      )
                    })
                  }
                  <Grid item xs={6} sx={{alignItems: "center", display: "flex"}}>
                    <Box>
                    <Typography >Invoice Id</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <OutlinedInput 
                      fullWidth
                      sx={{
                        fontSize: "24px",
                      }}
                      onChange={(e)=>{
                        setInvId(e.target.value);
                      }}
                      value={invId ?? ''}
                    />
                  </Grid>
                  <Grid xs={12} sx={{alignItems: "center"}}>
                      <Divider sx={{mt: 4, mb: 2}}/>
                  </Grid>
                  <Grid item xs={6} sx={{alignItems: "center", display: "flex"}} >
                    <Box>
                    <Typography variant="h5">Revenue for Fixwatt</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h2" textAlign={"end"}>
                      {`${MoneyConverter({amount: profit})} /-`}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sx={{mt: 2, mb: 2}}>
                    <Button variant="contained" fullWidth sx={{p: 1.2}} onClick={savePaymentInfo}>Save</Button>
                  </Grid>
                </Grid>         
              </Grid>
              : <Box/>
              }
            </Grid>
          </Stack>
        </Grid>
      </Grid>
    </MainCard>
  )
}

export default OrderDetails;