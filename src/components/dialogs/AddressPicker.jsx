import { Box, Button, Dialog, Divider, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, Typography } from "@mui/material";
import MainCard from "../MainCard";
import { useEffect, useState } from "react";
import { getUserById } from "../../network/service";

const AddressPicker =({open, addresses, value, onCancel, onProceed, onNewAddress})=>{

    const [ uas, setUas ] = useState(null)
    const [ address, setAddress ] = useState(null)

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
                value={value?.id}
              >
                {
                  addresses?.map((a)=>{
                    return <FormControlLabel
                      value={a.id} 
                      onChange={(v)=>{
                        setAddress(a)
                      }}
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
            <Button disabled={!address} onClick={()=>onProceed(address)} variant="contained">Proceed</Button>
          </Stack>
        </MainCard>
    </Dialog>
)}

export default AddressPicker;