import {
  Box,
  Button,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Stack,
  Typography
} from "@mui/material";
import MainCard from "../../../components/MainCard";
import * as Yup from "yup";
import { Formik } from "formik";
import { createUser, createUserAddress, removeUserAddress } from "../../../network/service";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import SingleSelect from "../../../components/@extended/SingleSelect";
import { useNavigate } from "react-router-dom";
import { showSnackbar } from "../../../utils/snackbar-utils";

const CreateCustomer = () => {

  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([])

  const [addressType, setAddressType] = useState('')
  const [address, setAddress] = useState('')
  const [pincode, setPincode] = useState('')

  const addUserAddress = async()=>{
    if(addressType && address && pincode){
      const created = {address, pincode, type: addressType, id: addresses.length}
      if(addresses?.length==1 && !addresses[0].address){
        setAddresses([created])
      }else{
        setAddresses([...addresses, created])
      }
    }
    setAddressType('');
    setAddress('');
    setPincode('');
  }

  const removeAddress = async(id)=>{
    if(id){
      await removeUserAddress(id)
      const updated = addresses.filter((a)=>a.id!=id);
      setAddresses(updated);
    }
  }
   

  return (
    <MainCard
      sx={{
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
      }}
      contentSX={{
        width: "100%",
      }}
    >
      <Formik
        initialValues={{
          name: '', 
          phone: '', 
          email: '', 
          age: '21',
          gender: 'M',
          segment: 'household',
          category: 'b2c'
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().max(255).required("Name is required"),
          phone: Yup.string()
            .matches(
              /^(?:[0-9] ?){6,14}[0-9]$/,
              "Invalid phone number"
            )
            .required("Phone number is required"),
          email: Yup.string().email("Must be a valid email").max(255),
          address: Yup.string().max(255),
        })}
        onSubmit={async(values, { setErrors, setStatus, setSubmitting, resetForm }) => {
          try {
            if(addresses.length==0){
              showSnackbar("Address is missing", { variant: 'error' });
            }
            const customerData = {
              name: values.name,
              roleId: 2,
              phone: values.phone,
              email: values.email,
              gender: values.gender,
              age: values.age!="" ? values.age : null,
              segment: values.segment,
              category: values.category
            };

            const result = await createUser(customerData);
            const userId = result.user.id;

            const promises = addresses.map(a => {
                return createUserAddress({ userId, address: a.address, pincode: a.pincode, type: a.addressType });
            });
            await Promise.all(promises);

            setStatus({ success: true });
            setSubmitting(false); 

            navigate('/customers');
          } catch (err) {
            console.log(err)
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
          setFieldValue
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={4} padding={2}>
              <Grid item xs={12}>
                <Typography variant="h5" sx={{fontWeight: 500}}>User Info</Typography>
              </Grid>
              <Grid item xs={4}>
                <Stack spacing={1}>
                    <InputLabel htmlFor={"name"}>Name</InputLabel>
                    <OutlinedInput
                      id="name"
                      type="text"
                      name="name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.name}
                      fullWidth
                    />
                    {touched.name && errors.name && (
                      <FormHelperText error>
                        {errors.name}
                      </FormHelperText>
                    )}
                  </Stack>
              </Grid>
              <Grid item xs={4}>
                <Stack spacing={1}>
                    <InputLabel htmlFor={"phone"}>Phone Number</InputLabel>
                    <OutlinedInput
                      id="phone"
                      type="text"
                      name="phone"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.phone}
                      fullWidth
                    />
                    {touched.phone && errors.phone && (
                      <FormHelperText error>
                        {errors.phone}
                      </FormHelperText>
                    )}
                  </Stack>
              </Grid>
              <Grid item xs={4}>
                <Stack spacing={1}>
                    <InputLabel htmlFor={"email"}>Email Address</InputLabel>
                    <OutlinedInput
                      id="email"
                      type="text"
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                      fullWidth
                    />
                    {touched.email && errors.email && (
                      <FormHelperText error>
                        {errors.email}
                      </FormHelperText>
                    )}
                  </Stack>
              </Grid>
              <Grid item xs={4}>
                <SingleSelect
                  label={'Category'}
                  value={values?.category}
                  handleChange={(e)=>{
                    setFieldValue("category", e)
                  }}
                  name={"Category"}
                  id={"Category"}
                  items={[
                    <MenuItem value="b2b">B2B</MenuItem>,
                    <MenuItem value="b2c">B2C</MenuItem>
                  ]}
                />
              </Grid>
              <Grid item xs={4}>
                <SingleSelect
                  label={'Segment'}
                  value={values?.segment}
                  handleChange={(e)=>{
                    setFieldValue("segment", e)
                  }}
                  name={"Segment"}
                  id={"Segment"}
                  items={[
                    <MenuItem value="household">Household</MenuItem>,
                    <MenuItem value="commercial">Commercial</MenuItem>,
                    <MenuItem value="institution">Institution</MenuItem>
                  ]}
                />
              </Grid>
              <Grid item xs={4}>
                <Stack spacing={1}>
                    <InputLabel htmlFor={"age"}>Age</InputLabel>
                    <OutlinedInput
                      id="age"
                      name="age"
                      type="number"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.age}
                      fullWidth
                    />
                  </Stack>
              </Grid>
              <Grid item xs={4}>
                <SingleSelect
                  label={'Gender'}
                  value={values?.gender}
                  handleChange={(e)=>{
                    setFieldValue("gender", e)
                  }}
                  name={"Gender"}
                  id={"Gender"}
                  items={[
                    <MenuItem value="M">Male</MenuItem>,
                    <MenuItem value="F">Female</MenuItem>,
                    <MenuItem value="O">Nonbinary</MenuItem>
                  ]}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h5" sx={{fontWeight: 500}}>User Addresses</Typography>
              </Grid>

              <Grid item xs={3}>
                <OutlinedInput
                  id="addressType"
                  type="text"
                  name="addressType"
                  placeholder="Enter Address Type"
                  onBlur={handleBlur}
                  onChange={(e)=>setAddressType(e.target.value)}
                  value={addressType}
                  fullWidth
                /> 
              </Grid>
              <Grid item xs={4}>
                <OutlinedInput
                  id="address"
                  type="text"
                  name="address"
                  placeholder="Enter Address"
                  onBlur={handleBlur}
                  onChange={(e)=>setAddress(e.target.value)}
                  value={address}
                  fullWidth
                />
              </Grid>
              <Grid item xs={3}>
                <OutlinedInput
                  id="pincode"
                  type="text"
                  name="pincode"
                  placeholder="Enter Pincode"
                  onBlur={handleBlur}
                  onChange={(e)=>setPincode(e.target.value)}
                  value={pincode}
                  fullWidth
                /> 
              </Grid>
              <Grid item xs={2}>
                <IconButton sx={{background: "#dfdfdf"}} onClick={addUserAddress}>
                  <PlusOutlined/>
                </IconButton>
              </Grid>
                    
              {
                addresses && addresses?.length>0 && addresses[0].address && addresses?.map((address, idx)=>{
                  return (
                    <Grid item xs={4} key={idx}>
                      <MainCard
                        headerBorder
                        headerPadding={1.6}
                        title={
                          <Stack direction={'row'} spacing={2}  alignItems={"center"}>
                            <Typography>{`${address?.type??'-'}`}</Typography>
                            <Box sx={{ width: '100%' }}/>  
                            <IconButton onClick={()=>removeAddress(address?.id)}>
                              <DeleteOutlined/>
                            </IconButton>
                          </Stack>  
                        }
                      >
                        <Typography variant="h6" sx={{mb: 1}}>{address.address}</Typography>
                        <Typography variant="h6" >{address.pincode}</Typography>
                      </MainCard>
                    </Grid>
                    
                  ) 
                })
              }
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={4} direction={"row-reverse"} sx={{pt: 4, pb: 2}}>
                <Button variant="contained" sx={{px: 5, py: 1.2}} type="submit" >Save</Button>
                <Button disabled={isSubmitting} sx={{px: 5, py: 1.2, color: "red"}} onClick={()=>{navigate(-1)}} >Cancel</Button>
              </Stack>
            </Grid>
          </form>
        )}
      </Formik>
    </MainCard>
  );
};

export default CreateCustomer;
