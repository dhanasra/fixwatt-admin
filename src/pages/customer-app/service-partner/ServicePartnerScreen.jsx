import { Button, FormHelperText, Grid, InputLabel, OutlinedInput, Stack, Typography, useMediaQuery } from "@mui/material";
import CustomerAppBar from "../../../components/customer/CustomerAppBar";
import MainCard from "../../../components/MainCard";
import { Form, Formik } from "formik";
import * as Yup from 'yup';
import { CheckCircleFilled } from "@ant-design/icons";
import { contactServicePartner } from "../../../network/service";
import { useState } from "react";

function ServicePartnerScreen (){

  const isMdScreen = useMediaQuery('(min-width:960px)');

  const [ completed, setCompleted ] = useState(false);

  return (
    completed
    ? <Stack spacing={2} justifyContent={"center"} alignItems={"center"} sx={{py: "100px", background: "#fff"}}>
      <CheckCircleFilled color="green" width={200} height={200} style={{fontSize: "80px", color: "green"}}/>
      <Typography variant="h2">Message sent successfully!</Typography>
      <Typography variant="h5">We will contact you soon!</Typography>
    </Stack>
    : <Formik
        initialValues={{
          name: '',
          phone: '',
          services: '',
          area: '',
          pincode: ''
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required('Name is required'),
        phone: Yup.string()
          .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
          .required('Phone number is required'),
        area: Yup.string().required('Area is required'),
        pincode: Yup.string().required('Pincode is required'),
        services: Yup.string().required('Services is required'),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
      try {

          const data = {
            name: values.name,
            pincode: values.pincode,
            area: values.area,
            services: values.services,
            phone: values.phone
          }

          await contactServicePartner(data);

          setCompleted(true);

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
        ({ errors, touched, isSubmitting })=>(
          <Form noValidate>
          <CustomerAppBar minimal={true}/>
          <Grid container alignItems={"center"} justifyContent={"center"} sx={{marginTop: "80px"}}>
            <Grid item xs={6} alignItems={"center"}>
              <MainCard>
                <Grid container spacing={2} alignItems={"center"} justifyContent={"center"}>
                  <Grid item xs={12} md={8} mx={"16px"} justifyContent={"center"}>
                    <Stack justifyContent={"center"} alignItems={"center"}>
                      <Typography variant="h3">Service Partner</Typography>
                      <Typography variant="h6">Become a technician in fixwatt</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={8} mx={"16px"}>
                    <Stack spacing={1} sx={{width: "100%"}}>
                      <InputLabel htmlFor="name" >Name</InputLabel>
                      <OutlinedInput
                          id="name"
                          type="text"
                          name="name"
                          placeholder="Enter your name"
                          sx={{
                            borderRadius: isMdScreen ? "16px": "8px",
                            background: "#efefef11"
                          }}
                          error={Boolean(touched.name && errors.name)}
                          fullWidth
                      />
                      <FormHelperText error>{touched.name && errors.name}</FormHelperText>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={8} mx={"16px"}>
                    <Stack spacing={1} sx={{width: "100%"}}>
                      <InputLabel htmlFor="phone" >Phone Number</InputLabel>
                      <OutlinedInput
                          id="phone"
                          type="text"
                          name="phone"
                          placeholder="Enter your number"
                          sx={{
                            borderRadius: isMdScreen ? "16px": "8px",
                            background: "#efefef11"
                          }}
                          error={Boolean(touched.phone && errors.phone)}
                          fullWidth
                      />
                      <FormHelperText error>{touched.phone && errors.phone}</FormHelperText>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={8} mx={"16px"}>
                    <Stack spacing={1} sx={{width: "100%"}}>
                      <InputLabel htmlFor="services" >Service you offer</InputLabel>
                      <OutlinedInput
                          id="services"
                          type="text"
                          name="services"
                          placeholder="Eg. Plumbing, Electrical, etc."
                          sx={{
                            borderRadius: isMdScreen ? "16px": "8px",
                            background: "#efefef11"
                          }}
                          error={Boolean(touched.services && errors.services)}
                          fullWidth
                      />
                      <FormHelperText error>{touched.services && errors.services}</FormHelperText>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={8} mx={"16px"}>
                    <Stack spacing={1} sx={{width: "100%"}}>
                      <InputLabel htmlFor="location" >Area</InputLabel>
                      <OutlinedInput
                          id="area"
                          type="text"
                          name="area"
                          placeholder="Enter your area"
                          sx={{
                            borderRadius: isMdScreen ? "16px": "8px",
                            background: "#efefef11"
                          }}
                          error={Boolean(touched.area && errors.area)}
                          fullWidth
                      />
                      <FormHelperText error>{touched.area && errors.area}</FormHelperText>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={8} mx={"16px"}>
                    <Stack spacing={1} sx={{width: "100%"}}>
                      <InputLabel htmlFor="pincode" >Pincode</InputLabel>
                      <OutlinedInput
                          id="pincode"
                          type="text"
                          name="pincode"
                          placeholder="Enter your pincode"
                          sx={{
                            borderRadius: isMdScreen ? "16px": "8px",
                            background: "#efefef11"
                          }}
                          error={Boolean(touched.pincode && errors.pincode)}
                          fullWidth
                      />
                      <FormHelperText error>{touched.pincode && errors.pincode}</FormHelperText>
                    </Stack>
                  </Grid>
                  <Grid item xs={8}>
                    <Stack alignItems={"center"}>
                      <Button
                        variant="contained" 
                        type="submit"
                        disabled={isSubmitting}
                        sx={{width: "200px", p: 1.5, m: 6, fontWeight: 600, fontSize: "18px", borderRadius: "30px", backgroundImage: 'linear-gradient(45deg, #6200ee 30%, #5b3fa9 90%)'}}>Send</Button>
                    </Stack>
                  </Grid>
                </Grid>
              </MainCard>
            </Grid>
          </Grid>
        </Form>
        )
      }
    </Formik>
  )
}

export default ServicePartnerScreen;