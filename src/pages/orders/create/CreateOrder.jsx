import React, { useState, useEffect } from "react";
import { Autocomplete, Box, Button, Divider, Grid,  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, InputLabel, OutlinedInput, Stack, TextField, Typography, useTheme, FormHelperText } from "@mui/material";
import MainCard from "../../../components/MainCard";
import * as Yup from "yup";
import { Formik } from "formik";
import { createOrder, createUser, createUserAddress, getCategories, getServices, getTechnicians, getUsers } from "../../../network/service";
import ServiceTable from "./ServiceTable";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useNavigate } from "react-router-dom";

const CreateOrder = () => {

  const theme = useTheme();

  const [users, setUsers] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, selectCategory] = useState(null);
  const [technicians, setTechnicians] = useState([]);

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
        setUsers(data[0].users);
        setCategories(data[1].categories);
        setServices(data[2].services);
        setTechnicians(data[3].technicians);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetch();
  }, [])

  useEffect(() => {
    if(category!=null){
      const updated = services.filter((s)=>s.category_name==category.name);
      setSelectedServices(updated);
      console.log('calling');
      console.log(updated)
    }
  }, [category])



  const tomorrow = new Date((new Date()) + 1);
  const formattedTomorrow = tomorrow.toISOString().slice(0, 10);

  return (
    <Box>
      <MainCard>
        <Formik
          initialValues={{ 
            customer: null,
            userId: null,
            phone: null,
            altPhone: null,
            technician: null,
            technicianPhone: null,
            techPhone: null,
            address: null,
            pincode: null,
            notes: null,
            serviceDesc: null,
            service: null,
            date: formattedTomorrow,
            time: dayjs().set('hour', 10).set('minute', 0).set('second', 0).format("HH:mm:ss")
          }}
          validationSchema={Yup.object().shape({
            customer: Yup.string().max(255).required("Customer is required"),
            technician: Yup.string().max(255).required("Technician is required"),
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
            pincode: Yup.string().max(255).required("Phone number is required"),
            notes: Yup.string().max(255).notRequired(),
            serviceDesc: Yup.string().max(255).notRequired(),
            service: Yup.string().required("Service is required"),
            date: Yup.string().required("Date is required"),
            time: Yup.string().required("Time is required"),
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
            try {

              const data = {
                date: values.date,
                startTime: values.time,
                address: values.address, 
                pincode: values.pincode,
                serviceId: values.service,
                serviceDescription: values.serviceDesc,
                technicianId: values.technician,
                notes: values.notes,
                alternativePhone: values.altPhone
              };

              if(values.userId){
                data.userId = values.userId;
                await createOrder(data)
              }else{
                const result = await createUser({name: values.customer, phone: values.phone});
                const user = result.user
                await createUserAddress({address: values.address, pincode: values.pincode, userId: user.id})
                data.userId = user.id;
                await createOrder(data)
              }
            
              setStatus({ success: true });
              setSubmitting(false); 
              
              navigate('/orders');
              
            } catch (err) {
              console.log(err)
              setStatus({ success: false });
              setErrors({ submit: err.message });
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
                          setFieldValue("phone", user?.phone)
                          
                          setFieldValue("userId", user?.id)
                          setFieldValue("customer", user?.id)

                          if(user.addresses?.length>0){
                            setFieldValue("address", user?.addresses[0]?.address)
                            setFieldValue("pincode", user?.addresses[0]?.pincode)
                            setFieldValue("userId", user?.id)
                          }else{
                            setFieldValue("address", '')
                            setFieldValue("pincode", '')
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
                <Grid item xs={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor={"address"}>Address</InputLabel>
                    <OutlinedInput
                      id={"address"}
                      type="text"
                      name={"address"}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.address}
                      fullWidth
                    />
                    {touched.address && errors.address && (
                      <FormHelperText error>
                        {errors.address}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor={"pincode"}>Pincode</InputLabel>
                    <OutlinedInput
                      id={"pincode"}
                      type="text"
                      name={"pincode"}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.pincode}
                      fullWidth
                    />
                    {touched.pincode && errors.pincode && (
                      <FormHelperText error>
                        {errors.pincode}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor={"phone"}>Phone number</InputLabel>
                    <OutlinedInput
                      id={"phone"}
                      type="text"
                      name={"phone"}
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
                <Grid item xs={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor={"altPhone"}>Alternative Phone number</InputLabel>
                    <OutlinedInput
                      id={"altPhone"}
                      type="text"
                      name={"altPhone"}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.altPhone}
                      fullWidth
                    />
                    {touched.altPhone && errors.altPhone && (
                      <FormHelperText error>
                        {errors.altPhone}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
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
                                  const category = categories[e.target.dataset?.optionIndex];
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
                                  const service = selectedServices[e.target.dataset?.optionIndex];
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
                                  value={dayjs().set('hour', 10).set('minute', 0).set('second', 0)}
                                  onChange={(v)=>{
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
                <Grid item xs={12}>
                  <Typography variant="h5" sx={{my: 0.6}}>Technician</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor={"technician"}>Name</InputLabel>
                    <Autocomplete
                      disablePortal
                      id="technician"
                      options={technicians}
                      filterOptions={(options, state) =>
                          options.filter(option =>
                              option.name.toLowerCase().includes(state.inputValue.toLowerCase()) ||
                              (option.phone && option.phone.toLowerCase().includes(state.inputValue.toLowerCase()))
                          )
                      }
                      onChange={(e)=>{
                        const technician = technicians[e.target.dataset?.optionIndex];
                        setFieldValue("technician", technician?.id)
                        setFieldValue("techPhone", technician?.phone)
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
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor={"techPhone"}>Phone number</InputLabel>
                    <OutlinedInput
                      id={"techPhone"}
                      type="text"
                      name={"techPhone"}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.techPhone}
                      readOnly
                      fullWidth
                    />
                    {touched.techPhone && errors.techPhone && (
                      <FormHelperText error>
                        {errors.techPhone}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
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
                    <Button disabled={isSubmitting} variant="contained" sx={{px: 5, py: 1.2}} type="submit">Create</Button>
                    <Button disabled={isSubmitting} sx={{px: 5, py: 1.2, color: "red"}} >Cancel</Button>
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
