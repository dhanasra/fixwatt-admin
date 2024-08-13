import { Box, Button, Dialog, Divider, FormControl, FormControlLabel, FormLabel, IconButton, InputAdornment, Radio, RadioGroup, Stack, Typography } from "@mui/material";
import MainCard from "../MainCard";
import { useEffect, useState } from "react";
import { getUserById, removeUserAddress } from "../../network/service";
import OptionsMenu from "../../pages/customer-app/checkout/OptionsMenu";
import DB from "../../network/db";

const AddressPicker =({open, value, onCancel, onEdit, onProceed, onNewAddress})=>{

    const [ user, setUser ] = useState(DB.getUser())
    const [ address, setAddress ] = useState(value)

    const deleteAddress =async(a)=>{
      await removeUserAddress(a.id);
      const updatedAddresses = user?.addresses.filter(address => address.id !== a.id);
      const updated = { ...user, addresses: [ ...updatedAddresses ] };
      DB.updateUser(updated);
      setUser(updated);
    }

    let addresses = user?.addresses.filter((i)=>i.address!=null);

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
                value={address?.id}
              >
                {
                  addresses?.map((a)=>{
                    return <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                        <FormControlLabel
                        value={a.id} 
                        sx={{my: 1}}
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
                      <OptionsMenu onClick={async(v)=>{
                        if(v=="delete"){
                          await deleteAddress(a);
                        }else if(v=="edit"){
                          onEdit(a);
                        }
                      }}/>
                    </Stack>
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