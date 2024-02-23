import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteUser, getUserById } from "../../../network/service";
import ConfirmDialog from "../../../components/dialogs/ConfirmDialog";
import MainCard from "../../../components/MainCard";
import { Button, Grid, Stack, Typography } from "@mui/material";

const CustomerDetails =()=>{
  const location = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);

  const [openDelete, setOpenDelete] = useState(false);

  const handleDeleteClick = async()=>{
    await deleteUser(customer?.id)
    setOpenDelete(false);
    navigate(-1);
  }

  useEffect(()=>{
    const fetchCustomer = async()=>{
      const result = await getUserById(location.customerId);
      setCustomer(result.user);
    }
    fetchCustomer();
  }, [])

  return (
    <MainCard
      headerBorder
      title={
        <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
          <Typography>{`CUSTOMER_${customer?.id}`}</Typography>
          <Stack direction={"row"} spacing={1}>
            <Button onClick={()=>navigate(`/customers/e/${customer?.id}`, { state: { data: {customer} } })}>
              Edit
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
        content={`By deleting this customer, this record will be completely deleted.`}
      />
      <Grid container spacing={4}>
        <Grid item xs={4}>
          <Stack spacing={1}>
            <Typography>Name</Typography>
            <Typography variant="h4" sx={{fontWeight: 500}}>{customer?.name}</Typography>
          </Stack>
        </Grid>
        <Grid item xs={4}>
          <Stack spacing={1}>
            <Typography>Phone</Typography>
            <Typography variant="h4" sx={{fontWeight: 500}}>{customer?.phone}</Typography>
          </Stack>
        </Grid>
        <Grid item xs={4}>
          <Stack spacing={1}>
            <Typography>Email address</Typography>
            <Typography variant="h4" sx={{fontWeight: 500}}>{customer?.email??'-'}</Typography>
          </Stack>
        </Grid>
        <Grid item xs={4}>
          <Stack spacing={1}>
            <Typography>Category</Typography>
            <Typography variant="h4" sx={{fontWeight: 500}}>{customer?.category??'-'}</Typography>
          </Stack>
        </Grid>
        <Grid item xs={4}>
          <Stack spacing={1}>
            <Typography>Segment</Typography>
            <Typography variant="h4" sx={{fontWeight: 500}}>{customer?.segment??'-'}</Typography>
          </Stack>
        </Grid>
        <Grid item xs={4}>
          <Stack spacing={1}>
            <Typography>Age</Typography>
            <Typography variant="h4" sx={{fontWeight: 500}}>{customer?.age??'-'}</Typography>
          </Stack>
        </Grid>
        <Grid item xs={4}>
          <Stack spacing={1}>
            <Typography>Gender</Typography>
            <Typography variant="h4" sx={{fontWeight: 500}}>{customer?.gender??'-'}</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Typography>User Addresses</Typography>
        </Grid>
        {
          customer?.addresses?.map((address, idx)=>{
            return (
              <Grid item xs={4} key={idx}>
              <MainCard
                headerBorder
                title={
                  <Typography>{`${address?.type??'-'}`}</Typography>
                }
              >
                <Typography variant="h4" sx={{fontWeight: 500}}>{address.address}</Typography>
                <Typography variant="h4" sx={{fontWeight: 500}}>{address.pincode}</Typography>
              </MainCard>
              </Grid>
            )
          })
        }
      </Grid>
    </MainCard>
  )
}

export default CustomerDetails;