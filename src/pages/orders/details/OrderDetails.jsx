import { DeleteOutlined, EditOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { Box, Button, Divider, Grid, IconButton, InputAdornment, OutlinedInput, Stack, Typography } from "@mui/material";
import { useNavigate, useParams } from 'react-router-dom';
import MainCard from "../../../components/MainCard";
import { useEffect, useState } from "react";
import { deleteOrder, getOrder } from "../../../network/service";
import ServiceInfoTable from "./ServiceInfoTable";
import { MdCurrencyRupee } from "react-icons/md";
import { MoneyConverter } from "../../../utils/utils";
import ConfirmDialog from "../../../components/dialogs/ConfirmDialog";

const OrderDetails = ()=>{
  const location = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  const [amountReceived, setAmountReceived] = useState(0);
  const [additionalCharges, setAdditionalCharges] = useState(0);
  const [technicianPayment, setTechnicianPayment] = useState(0);
  const [profit, setProfit] = useState(0);

  const [openDelete, setOpenDelete] = useState(false);

  const handleDeleteClick = async()=>{
    await deleteOrder({orderId: order?.id})
    setOpenDelete(false);
    navigate(-1);
  }

  useEffect(()=>{
    const fetchOrder = async()=>{
      const result = await getOrder(location);
      setOrder(result.order);
    }
    fetchOrder();
  }, [])

  useEffect(()=>{
    const p = amountReceived - additionalCharges - technicianPayment;
    setProfit(p);
  }, [amountReceived, additionalCharges, technicianPayment])

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
              <Typography>{order?.status}</Typography>
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
                <Typography variant="h6">{order?.address}</Typography>
                <Typography variant="h6">{order?.pincode}</Typography>
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
        <Grid item xs={12} md={4} sm={5.5}>
          <MainCard sx={{height: "100%"}}>
              <Typography>Technician</Typography>
              <Stack spacing={1} sx={{mt: 2}}>
                <Typography variant="h5">{order?.technician?.name}</Typography>
                <Typography variant="h6">{order?.technician?.category_name}</Typography>
                <Stack direction={"row"} alignItems={"center"} spacing={1}>
                  <PhoneOutlined/>
                  <Typography variant="h6">{order?.technician?.phone}</Typography>
                </Stack>
              </Stack>
            </MainCard>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={2}>
            <Typography variant="h5">Service</Typography>
            <ServiceInfoTable order={order}/>
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
              <Grid item xs={12}>
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
                      onChange={(e)=>setAmountReceived(e.target.value)}
                      value={amountReceived}
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
                    <Typography >Additional Charges</Typography>
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
                      onChange={(e)=>setTechnicianPayment(e.target.value)}
                      value={technicianPayment}
                      type="number"
                      startAdornment={
                        <InputAdornment position="start">
                          <MdCurrencyRupee />
                        </InputAdornment>
                      }
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
                </Grid>
              </Grid>
            </Grid>
          </Stack>
        </Grid>
      </Grid>
    </MainCard>
  )
}

export default OrderDetails;