import React, { useState, useEffect } from "react";
import { Autocomplete, Box, Button, Divider, Grid,  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, InputLabel, OutlinedInput, Stack, TextField, Typography, FormHelperText, IconButton, Chip, MenuItem, Checkbox, FormControlLabel, Switch, CircularProgress } from "@mui/material";
import MainCard from "../../../components/MainCard";
import * as Yup from "yup";
import { Formik } from "formik";
import { createOrder, createOrderTechnician, createUser, createUserAddress, getCategories, getServices, getTechnicians, getUsers } from "../../../network/service";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useNavigate } from "react-router-dom";
import OrderAddress from "./OrderAddress";
import OrderTechnicians from "./OrderTechnicians";

const CreateOrder = () => {

  const [users, setUsers] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, selectCategory] = useState(null);
  const [technicians, setTechnicians] = useState([]);

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(false);


  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await Promise.all([
          getUsers(),
          getCategories(),
          getServices(),
          getTechnicians()
        ]);

        const users = filterUsersWithValidAddresses(data[0].users);
        console.log(users)
        setUsers(users);
        setCategories(data[1].categories);
        setServices(data[2].services);
        setTechnicians(data[3].technicians);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetch();
  }, [])

  function filterUsersWithValidAddresses(users) {
      return users.map(user => {
          return {
              ...user,
              addresses: user.addresses.filter(address => address.id !== null)
          };
      });
  }

  useEffect(() => {
    if(category!=null){
      const updated = services.filter((s)=>s.category_name==category.name);
      setSelectedServices(updated);
    }
  }, [category])

  const tomorrow = new Date((new Date()) + 1);
  const formattedTomorrow = tomorrow.toISOString().slice(0, 10);

  const [addedTechnicians, setAddedTechnicians] = useState([]);
  const handleTechniciansChange = (e)=>{
    setAddedTechnicians(e);
  }

  return (
    <Box>
      <MainCard>
        <Formik
          initialValues={{ 
            customer: null,
            userId: null,
            phone: null,
            technician: null,
            technicianPhone: null,
            techPhone: null,
            notes: null,
            serviceDesc: null,
            service: null,
            date: formattedTomorrow,
            time: dayjs().set('hour', 10).set('minute', 0).set('second', 0).format("HH:mm:ss"),

            addressId: null,
            addressType: null,
            address: null,
            pincode: null,
            altPhone: null,
          }}
          validationSchema={Yup.object().shape({
            customer: Yup.string().max(255).required("Customer is required"),
            // technician: Yup.string().max(255).required("Technician is required"),
            phone: Yup.string()
              .matches(
                /^(?:[0-9] ?){6,14}[0-9]$/,
                "Invalid phone number"
              )
              .required("Phone number is required"),
            altPhone: Yup.string()
              .matches(
                /^(?:[0-9] ?){6,14}[0-9]$/,
                "Invalid phone number"
              ).notRequired(),
            address: Yup.string().max(255).required("Address is required"),
            addressType: Yup.string().max(255).required("Address type is required"),
            pincode: Yup.string().max(255).required("Pincode is required"),
            notes: Yup.string().max(255).notRequired(),
            serviceDesc: Yup.string().max(255).notRequired(),
            service: Yup.string().required("Service is required"),
            date: Yup.string().required("Date is required"),
            time: Yup.string().required("Time is required"),
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
            
            try {

              setLoading(true); 
              let userId = values.userId;

              if(!userId){
                const result = await createUser({name: values.customer, phone: values.phone});
                userId = result.user.id;
              }

              let userAddressId = values.addressId;
              if(!userAddressId){
                const { addressType, pincode, address, altPhone } = values;
                const result = await createUserAddress({ userId, pincode, address, type: addressType, alternative_phone: altPhone });
                userAddressId = result.userAddress.id;
              }
             
              const data = {
                userId,
                userAddressId,
                date: values.date,
                startTime: values.time,
                serviceId: values.service,
                serviceDescription: values.serviceDesc,
                notes: values.notes
              };

              const result = await createOrder(data)
              const orderId = result.order.id;

              await Promise.all(addedTechnicians.map(async(id)=>{
                await createOrderTechnician(orderId, id)
              }))

              setStatus({ success: true });
              setSubmitting(false); 
              setLoading(false); 
              
              navigate('/orders');
            } catch (err) {
              console.log(err)
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setLoading(false); 
              setSubmitting(false);
            }
          }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue }) => (
            <form noValidate onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h5" sx={{my: 0.6}}>Customer Details</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor={"user"}>Customer</InputLabel>
                    <Autocomplete
                        freeSolo
                        disablePortal
                        id="user"
                        options={users.map((user, index) => ({
                            ...user,
                            key: user.id 
                        }))}
                        filterOptions={(options, state) =>
                            options.filter(option =>
                                option.name.toLowerCase().includes(state.inputValue.toLowerCase()) ||
                                (option.email && option.email.toLowerCase().includes(state.inputValue.toLowerCase())) ||
                                (option.phone && option.phone.toLowerCase().includes(state.inputValue.toLowerCase()))
                            )
                        }
                        onChange={(e)=>{
                          const user = users[e.target.dataset?.optionIndex];

                          // set user fields
                          setFieldValue("phone", user?.phone)
                          setFieldValue("userId", user?.id)
                          setFieldValue("customer", user?.id)
                          setUser(user);

                          console.log(user?.addresses?.length)

                          if(user?.addresses?.length>0){
                            setFieldValue("addressId", user?.addresses[0]?.id)
                            setFieldValue("address", user?.addresses[0]?.address)
                            setFieldValue("addressType", user?.addresses[0]?.type)
                            setFieldValue("pincode", user?.addresses[0]?.pincode)
                            setFieldValue("altPhone", user?.addresses[0]?.alternative_phone)
                            setFieldValue("userId", user?.id)
                          }else{
                            setFieldValue("addressId", null)
                            setFieldValue("address", '')
                            setFieldValue("pincode", '')
                            setFieldValue("addressType", '')
                          }
                        }}
                        getOptionLabel={(option) => `${option.name} (${option.phone})`}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                type="text"
                                name={"customer"}
                                onBlur={handleBlur}
                                onChange={(e)=>{
                                  const value = e.target.value;
                                  setFieldValue("userId", null)
                                  setFieldValue("customer", value)
                                  handleChange(value);
                                }}
                                fullWidth
                                variant="outlined"
                            />
                        )}
                    />
                    {touched.customer && errors.customer && (
                        <FormHelperText error>
                          {errors.customer}
                        </FormHelperText>
                      )}
                  </Stack>
                </Grid>
                <OrderAddress {...{ handleBlur, handleChange, setFieldValue, values, touched, errors, user }} />
                <Grid item xs={12}>
                  <Typography variant="h5" sx={{my: 0.6}}>Service</Typography>
                </Grid>
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TableContainer component={Box}>
                      <Table>
                        <TableHead>
                          <TableRow style={{ backgroundColor: '#f9fafa' }}>
                            <TableCell style={{ width: '250px' }} >Category</TableCell>
                            <TableCell style={{ width: '250px' }} >Service</TableCell>
                            <TableCell style={{ width: 'auto' }} >Description</TableCell>
                            <TableCell style={{ width: '180px' }} >Date</TableCell>
                            <TableCell style={{ width: '180px' }} >Time</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell style={{ verticalAlign: 'top'}}>
                              <Stack spacing={1}>
                              <Autocomplete
                                disablePortal
                                id="category"
                                options={categories}
                                filterOptions={(options, state) =>
                                    options.filter(option =>
                                        option.name.toLowerCase().includes(state.inputValue.toLowerCase()) ||
                                        (option.email && option.email.toLowerCase().includes(state.inputValue.toLowerCase())) ||
                                        (option.phone && option.phone.toLowerCase().includes(state.inputValue.toLowerCase()))
                                    )
                                }
                                onChange={(e)=>{
                                  const data = e.target.innerHTML;
                                  const category = categories.find((i)=>i.name == data);
                                  setFieldValue("category", category?.id)
                                  selectCategory(category);
                                }}
                                getOptionLabel={(option) => `${option.name}`}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        type="text"
                                        name={"name"}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        fullWidth
                                        variant="outlined"
                                    />
                                )}
                              />
                              {touched.service && errors.service && (
                                  <FormHelperText error>
                                    {errors.service}
                                  </FormHelperText>
                                )}
                              </Stack>
                            </TableCell>
                            <TableCell style={{ verticalAlign: 'top'}}>
                              <Stack spacing={1}>
                              <Autocomplete
                                disablePortal
                                id="service"
                                options={selectedServices}
                                filterOptions={(options, state) =>
                                    options.filter(option =>
                                        option.name.toLowerCase().includes(state.inputValue.toLowerCase()) ||
                                        (option.email && option.email.toLowerCase().includes(state.inputValue.toLowerCase())) ||
                                        (option.phone && option.phone.toLowerCase().includes(state.inputValue.toLowerCase()))
                                    )
                                }
                                onChange={(e)=>{
                                  const data = e.target.innerHTML;
                                  const service = selectedServices.find((i)=>i.name == data);
                                  setFieldValue("service", service?.id)
                                }}
                                getOptionLabel={(option) => `${option.name}`}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        type="text"
                                        name={"name"}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        fullWidth
                                        variant="outlined"
                                    />
                                )}
                              />
                              {touched.service && errors.service && (
                                  <FormHelperText error>
                                    {errors.service}
                                  </FormHelperText>
                                )}
                              </Stack>
                            </TableCell>
                            <TableCell style={{ verticalAlign: 'top'}}>
                              <Stack spacing={1}>
                                <OutlinedInput
                                  id={"serviceDesc"}
                                  type="text"
                                  name={"serviceDesc"}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  value={values.serviceDesc}
                                  fullWidth
                                />
                                {touched.serviceDesc && errors.serviceDesc && (
                                  <FormHelperText error>
                                    {errors.serviceDesc}
                                  </FormHelperText>
                                )}
                              </Stack>
                            </TableCell>
                            <TableCell style={{ verticalAlign: 'top'}}>
                              <Stack spacing={1}>
                                <DatePicker
                                  value={dayjs(values.date)}
                                  format="MMM DD, YYYY"
                                  onChange={(v)=>{
                                    setFieldValue("date", v.format("YYYY-MM-DD"))
                                  }}
                                />
                                {touched.date && errors.date && (
                                  <FormHelperText error>
                                    {errors.date}
                                  </FormHelperText>
                                )}
                              </Stack>
                            </TableCell>
                            <TableCell style={{ verticalAlign: 'top'}}>
                              <Stack spacing={1}>
                                <TimePicker
                                  value={dayjs().set('hour', values.time.split(':')[0]).set('minute', values.time.split(':')[1]).set('second', values.time.split(':')[2])}
                                  onChange={(v)=>{
                                    console.log(v.format("HH:mm:ss"))
                                    setFieldValue("time", v.format("HH:mm:ss"))
                                  }}
                                />
                                {touched.time && errors.time && (
                                  <FormHelperText error>
                                    {errors.time}
                                  </FormHelperText>
                                )}
                              </Stack>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                    </LocalizationProvider>
                </Grid>
                <OrderTechnicians {...{ technicians }} handleChange={handleTechniciansChange}/>
                <Grid item xs={12}>
                  <Divider sx={{py: 1}}/>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor={"notes"}>Notes</InputLabel>
                    <OutlinedInput
                      id={"notes"}
                      type="text"
                      name={"notes"}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.notes}
                      multiline
                      minRows={2}
                    />
                    {touched.notes && errors.notes && (
                      <FormHelperText error>
                        {errors.notes}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={4} direction={"row-reverse"} sx={{pt: 4, pb: 2}}>
                    <Button disabled={loading} variant="contained" sx={{px: 5, py: 1.2}} type="submit">
                      {
                        loading
                        ? <CircularProgress size="1rem"/>
                        : 'Submit'
                      }
                    </Button>
                    <Button disabled={loading} sx={{px: 5, py: 1.2, color: "red"}} >Cancel</Button>
                  </Stack>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </MainCard>
    </Box>
  );
};

export default CreateOrder;
