import { Avatar, Box, Button, FormHelperText, Grid, IconButton, InputLabel, MenuItem, OutlinedInput, Stack, Switch, Typography } from "@mui/material";
import SingleSelect from "../../../components/@extended/SingleSelect";
import { useEffect, useState } from "react";
import MainCard from "../../../components/MainCard";
import { CloseOutlined } from "@ant-design/icons";
import { createOrderTechnician, deleteOrderTechnician, getOrderTechnicians } from "../../../network/service";

const OrderTechnicians = ({ technicians, handleChange, value, orderId })=>{

  const [technicianId, setTechnicianId] = useState(null);
  const [addedTechnicians, setAddedTechnicians] = useState([]);

  useEffect(()=>{
    if(value && technicians.length>0){
      const ids = value.map((e)=>e.technician_id);
      setAddedTechnicians(ids);
    }
  }, [technicians, value])

  const addTechnician = async()=>{
    if(technicianId!=null){
      const added = addedTechnicians.find((id)=>id==technicianId)
      if(added==null){
        const updated = [ ...addedTechnicians,  technicianId];
        setAddedTechnicians(updated);
        handleChange(updated)
        if(orderId){
          await createOrderTechnician(orderId, technicianId);
        }
      }
    }
  }

  const removeTechnician = async(id)=>{
    const updated = addedTechnicians.filter((e)=>e!=id);
    setAddedTechnicians([ ...updated]);
    handleChange([ ...updated])

    if(orderId){
      const ots = await getOrderTechnicians(orderId);
      const ot = ots.orderTechnicians.find((i)=>i.technician_id==id);
      await deleteOrderTechnician(orderId, ot.id);
    }
  }

  return <>
    <Grid item xs={12}>
      <Typography variant="h5" sx={{my: 0.6}}>Technician</Typography>
    </Grid>
    <Grid item xs={12}>
      <Stack spacing={3} direction={"row"} alignItems={"end"}>
        <Stack spacing={1} sx={{width: "30%"}}>
          <SingleSelect
            label={'Select Technician'}
            value={technicianId??''}
            handleChange={(e)=>{
              setTechnicianId(e)
            }}
            name={"addressId"}
            id={"addressId"}
            items={ technicians.map(
              (e)=>{
                return <MenuItem value={e.id}>{e?.name}</MenuItem>
              }
            )}
          />
        </Stack>
        <Button variant="contained" sx={{background: "#cfcfcf", height: "41px", px: 3}} onClick={addTechnician}>Add</Button>
      </Stack>

      <Stack spacing={2} flexWrap={"wrap"} direction={"row"} sx={{mt: 2}}>
        {
          addedTechnicians.map((ot, idx)=>{

            const techn = technicians?.find((tech)=>tech.id==ot);

            if(!techn){
              return <Box/>
            }

            return (
              <Grid item xs={3}>
                <MainCard
                  headerBorder
                  headerPadding={1.6}
                  title={
                    <Stack justifyContent={"space-between"} alignItems={"center"} direction={"row"}>
                      <Typography variant="h6">{`Techinican ${idx+1}`}</Typography> 
                      <IconButton onClick={()=>removeTechnician(ot)}>
                        <CloseOutlined/>
                      </IconButton>
                    </Stack>
                  }
                >   
                  <Stack direction={"row"}>
                    <Avatar alt="picture" src={techn?.picture??''} sx={{ width: 52, height: 52, mr: 2, mt: 1 }} />
                    <Stack spacing={0.2}>
                      <Typography variant="h4">{`${techn?.name}`}</Typography> 
                      <Typography>{`${techn?.phone}`}</Typography>   
                      <Typography variant="subtitle2">{`${techn?.area} - ${techn?.pincode}`}</Typography>     
                    </Stack>
                  </Stack>  
                </MainCard>
              </Grid>
            )
          })
        }
      </Stack>
    </Grid>
  </>
}

export default OrderTechnicians