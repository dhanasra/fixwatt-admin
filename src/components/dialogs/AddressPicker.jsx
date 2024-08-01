import { Box, Button, Dialog, Divider, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, Typography } from "@mui/material";
import MainCard from "../MainCard";
import { useEffect, useState } from "react";
import { getUserById } from "../../network/service";

const AddressPicker =({open, addresses, onCancel, onOk, onNewAddress})=>{

    const [ uas, setUas ] = useState(null)

    console.log(addresses)

    return(
    <Dialog open={open}>
        <MainCard
            borderRadius={1}
            headerBorder
            sx={{maxWidth: "460px", minWidth: "400px" }}
        >
          <Stack spacing={2}>
            <Typography variant="h4">Saved Addresses</Typography>
            <Box>
              <Button variant="text" onClick={()=>onNewAddress()}>+ Add another address</Button>
            </Box>
            <Divider/>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="options"
                name="options"
              >
                {
                  addresses?.map((a)=>{
                    return <FormControlLabel
                      value={a.id} 
                      control={<Radio />} 
                      label={
                        <>
                          <Typography variant="h5" fontSize={"14px"}>{a.type}</Typography>
                          <Typography>{`${a.address}, ${a.pincode}`}</Typography>
                        </>
                      } 
                    />
                  })
                }
              </RadioGroup>
            </FormControl>
            <Box/>
            <Button variant="contained">Proceed</Button>
          </Stack>
        </MainCard>
    </Dialog>
)}

export default AddressPicker;