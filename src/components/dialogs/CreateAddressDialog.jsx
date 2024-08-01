import { Box, Button, Dialog, Divider, FormControl, FormControlLabel, FormHelperText, FormLabel, IconButton, InputAdornment, InputLabel, OutlinedInput, Radio, RadioGroup, Stack, Typography } from "@mui/material";
import MainCard from "../MainCard";
import { useEffect, useState } from "react";
import { getUserById } from "../../network/service";
import { Field, Formik } from "formik";
import * as Yup from 'yup';
import { CloseOutlined } from "@ant-design/icons";

const CreateAddressDialog =({open, addresses, onCancel, onOk})=>{

    const [ uas, setUas ] = useState(null)
    const [ addressType, setAddressType ] = useState("home")

    console.log(addresses)

    return(
    <Dialog open={open}>
      <Formik 
        initialValues={{
          address: '',
          pincode: '',
          addressType: 'Home'
        }}
        validationSchema={Yup.object().shape({
          address: Yup.string().required('Address is required'),
          pincode: Yup.string().required('Pincode is required'),
          addressType: Yup.string().required('Address type is required'),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            

            setStatus({ success: true });
            setSubmitting(false);
          } catch (err) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }}
      >
        {
          (({ errors, touched, isSubmitting })=>(
            <MainCard
                borderRadius={1}
                headerBorder
                sx={{maxWidth: "460px", minWidth: "400px" }}
                title={
                  <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                    <Typography variant="h4">Add Address</Typography>
                    <IconButton onClick={()=>onCancel()}>
                      <CloseOutlined/>
                    </IconButton>
                  </Stack>
                }
            >
              <Stack spacing={1}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="address">Address</InputLabel>
                  <Field
                    as={OutlinedInput}
                    id="address"
                    name="address"
                    placeholder="Enter address"
                    fullWidth
                    error={Boolean(touched.address && errors.address)}
                  />
                  <FormHelperText error>{touched.address && errors.address}</FormHelperText>
                </Stack>
                <Stack spacing={1}>
                  <InputLabel htmlFor="pincode">Pincode</InputLabel>
                  <Field
                    as={OutlinedInput}
                    id="pincode"
                    name="pincode"
                    placeholder="Enter pincode"
                    fullWidth
                    error={Boolean(touched.pincode && errors.pincode)}
                  />
                  <FormHelperText error>{touched.pincode && errors.pincode}</FormHelperText>
                </Stack>
                <Stack spacing={1}>
                  <InputLabel htmlFor="pincode">Save as</InputLabel>
                  <Stack direction={"column"} spacing={2}>
                    <Stack direction={"row"} spacing={2}>
                      <Button 
                        variant="outlined"
                        onClick={()=>{
                          setAddressType("home")
                        }}
                        sx={
                          addressType!="home"
                          ? { color: "grey", border: "1px solid grey", opacity: 0.5, fontWeight: 600 }
                          : { fontWeight: 600  }
                        }
                        >Home</Button>
                      <Button 
                        variant="outlined"  
                        onClick={()=>{
                          setAddressType("other")
                        }}
                        sx={
                          addressType!="other"
                          ? { color: "grey", border: "1px solid grey", opacity: 0.5, fontWeight: 600  }
                          : { fontWeight: 600  }
                        }
                        >Other</Button>
                    </Stack>
                    {
                      addressType=="other" && <Field
                      as={OutlinedInput}
                      id="addressType"
                      name="addressType"
                      placeholder="Enter address type"
                      fullWidth
                      error={Boolean(touched.addressType && errors.addressType)}
                    />
                    }
                    <FormHelperText error>{touched.addressType && errors.addressType}</FormHelperText>
                  </Stack>
                </Stack>
                <Box/>
                <Button variant="contained">Save and proceed to slots</Button>
              </Stack>
            </MainCard>
          ))
        }
      </Formik>
    </Dialog>
)}

export default CreateAddressDialog;