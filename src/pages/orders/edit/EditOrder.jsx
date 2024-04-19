import React, { useState, useEffect } from "react";
import { Autocomplete, Box, Button, Divider, Grid,  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, InputLabel, OutlinedInput, Stack, TextField, Typography, FormHelperText } from "@mui/material";
import MainCard from "../../../components/MainCard";
import * as Yup from "yup";
import { Formik } from "formik";
import { createOrder, createUser, createUserAddress, editOrder, getCategories, getOrder, getServices, getTechnicians, getUsers } from "../../../network/service";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { MailOutlined, PhoneOutlined, PushpinOutlined } from "@ant-design/icons";
import OrderTechnicians from "../create/OrderTechnicians";

const EditOrder = () => {

  const location = useLocation();
  const { data } = location.state || {};
  const order = data.order;
  // const [order, setOrder] = useState(data.order);
  

  const [users, setUsers] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [category, selectCategory] = useState(null);
  const [service, selectService] = useState(null);
  const [technicians, setTechnicians] = useState([]);
  const [categories, setCategories] = useState([]);
  const [orderCategory, setOrderCategory] = useState(null);

  const [index, setIndex] = useState(0);

  const navigate = useNavigate();

  const [addedTechnicians, setAddedTechnicians] = useState([]);
  const handleTechniciansChange = (e)=>{
    setAddedTechnicians(e);
  }

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await Promise.all([
          getUsers(),
          getServices(),
          getTechnicians(),
          getCategories(),
        ]);
        setUsers(data[0].users);
        setServices(data[1].services);
        setTechnicians(data[2].technicians);
        setCategories(data[3].categories);

        if(order.service.category_id){
          const category = data[3].categories.find((c)=>c.id==order.service.category_id);
          selectCategory(category)
          selectService(order.service)
        }

        if(order.technicians){
          const ids = order.technicians.map((e)=>e.technician_id);
          setAddedTechnicians(ids);
        }

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
      if(index!=0){
        selectService(null);
      }
      setIndex(index+1);
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
            category: orderCategory,
            userId: order?.user?.id,
            phone: order?.user?.phone,
            altPhone: order?.alternative_phone,
            techn: order?.technician,
            technician: order?.technician?.id,
            techPhone: order?.technician?.phone,
            address: order?.address,
            pincode: order?.pincode,
            notes: order?.notes,
            serviceDesc: order?.service_description,
            service: order?.service?.id,
            date: order?.date,
            time: dayjs().set('hour', order?.start_time?.split(':')[0]).set('minute', order?.start_time?.split(':')[1]).set('second', order?.start_time?.split(':')[2])
          }}
          validationSchema={Yup.object().shape({
            phone: Yup.string()
              .matches(
                /^(?:[0-9] ?){6,14}[0-9]$/,
                "Invalid phone number"
              )
              .required("Phone number is required"),
            notes: Yup.string().max(255).notRequired(),
            serviceDesc: Yup.string().max(255).notRequired(),
            service: Yup.string().required("Service is required"),
            date: Yup.string().required("Date is required"),
            time: Yup.string().required("Time is required"),
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
            try {

              const data = {
                orderId: order.id,
                date: values.date,
                startTime: values.time,
                serviceId: values.service,
                serviceDescription: values.serviceDesc,
                notes: values.notes
              };

              await editOrder(data)

              setStatus({ success: true });
              setSubmitting(false); 
              
              navigate('/orders');
              
            } catch (err) {
              console.log('Error is')
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
                <Grid item xs={12} md={4} sm={5.5} mb={2}>
                  <MainCard>
                    <Stack spacing={1}>
                      <Typography variant="h5">{order?.user?.name}</Typography>
                      <Stack direction={"row"} alignItems={"center"} spacing={1}>
                        <PushpinOutlined />
                        <Typography variant="h6">{`${order?.userAddress?.address}, ${order?.userAddress?.pincode}`}</Typography>
                      </Stack>
                      <Stack direction={"row"} alignItems={"center"} spacing={1}>
                        <PhoneOutlined/>
                        <Typography variant="h6">{`${order?.user?.phone}, ${order?.userAddress?.alternative_phone}`}</Typography>
                      </Stack>
                    </Stack>

                  </MainCard>
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
                                value={category}
                                options={categories}
                                isOptionEqualToValue={(option, value) => option.id === value?.id}
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
                                value={service}
                                isOptionEqualToValue={(option, value) => option.id === value?.id}
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
                                  selectService(service)
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
                                  value={values?.serviceDesc!='null' ? values.serviceDesc : ''}
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
                                  value={dayjs(values?.date)}
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
                                  value={values?.time}
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
                <OrderTechnicians {...{ technicians }} handleChange={handleTechniciansChange} value={order?.technicians} orderId={order?.id}/>
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
                      value={values?.notes!='null' ? values.notes : ''}
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
                    <Button variant="contained" sx={{px: 5, py: 1.2}} type="submit" >Save</Button>
                    <Button disabled={isSubmitting} sx={{px: 5, py: 1.2, color: "red"}} onClick={()=>{navigate(-1)}} >Cancel</Button>
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

export default EditOrder;
