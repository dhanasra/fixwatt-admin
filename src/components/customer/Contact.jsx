import { Button, FormHelperText, Grid, InputLabel, OutlinedInput, Stack, Typography, useMediaQuery } from '@mui/material'
import React, { useState } from 'react'
import { Form, Formik } from "formik";
import * as Yup from 'yup';
import { contactServiceInquiry } from '../../network/service';
import { CheckCircleFilled } from '@ant-design/icons';

function Contact() {

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
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            message: ''
        }}
        validationSchema={Yup.object().shape({
          firstName: Yup.string().required('First name is required'),
          lastName: Yup.string().required('Last name is required'),
          phone: Yup.string()
            .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
            .required('Phone number is required'),
          email: Yup.string()
            .email('Invalid email address')
            .nullable(),
          message: Yup.string().required('Message is required'),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {

            const data = {
              firstName: values.firstName,
              lastName: values.lastName,
              email: values.email ?? '-',
              phone: values.phone,
              message: values.message
            }

            await contactServiceInquiry(data);

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
        {({ errors, touched, isSubmitting })=>(
          <Form noValidate>
            <Grid container spacing={2} sx={{my: 6, background: "#fff"}} justifyContent={"center"}>
              <Grid item xs={12} sx={{mb: 3}}>
                <Stack alignItems={"center"} sx={{mb: "32px", textAlign: "center"}} spacing={1}>
                  <Typography variant="h2">Get in touch with our team</Typography>
                  <Typography>Have a general question about our service, offers, or something else?</Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={8} mx={"16px"}>
                <Stack direction={"row"} spacing={4}>
                  <Stack spacing={1} sx={{width: "100%"}}>
                    <InputLabel htmlFor="email" >First Name</InputLabel>
                    <OutlinedInput
                        id="firstName"
                        type="text"
                        name="firstName"
                        placeholder="Enter first name"
                        sx={{
                          p: 0.5,
                          borderRadius: isMdScreen ? "16px": "8px",
                          background: "#efefef11"
                        }}
                        error={Boolean(touched.firstName && errors.firstName)}
                        fullWidth
                    />
                    <FormHelperText error>{touched.firstName && errors.firstName}</FormHelperText>
                  </Stack>
                  <Stack spacing={1} sx={{width: "100%"}}>
                    <InputLabel htmlFor="email" >Last Name</InputLabel>
                    <OutlinedInput
                        id="lastName"
                        type="text"
                        name="lastName"
                        placeholder="Enter last name"
                        sx={{
                          p: 0.5,
                          borderRadius: isMdScreen ? "16px": "8px",
                          background: "#efefef11"
                        }}
                        error={Boolean(touched.lastName && errors.lastName)}
                        fullWidth
                    />
                    <FormHelperText error>{touched.lastName && errors.lastName}</FormHelperText>
                  </Stack>
                </Stack>
              </Grid>
              <Grid item xs={12} md={8} mx={"16px"}>
                <Stack direction={"row"} spacing={4}>
                  <Stack spacing={1} sx={{width: "100%"}}>
                    <InputLabel htmlFor="email" >Email Address</InputLabel>
                    <OutlinedInput
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Enter email address"
                        sx={{
                          p: 0.5,
                          borderRadius: isMdScreen ? "16px": "8px",
                          background: "#efefef11"
                        }}
                        error={Boolean(touched.email && errors.email)}
                        fullWidth
                    />
                    <FormHelperText error>{touched.email && errors.email}</FormHelperText>
                  </Stack>
                  <Stack spacing={1} sx={{width: "100%"}}>
                    <InputLabel htmlFor="email" >Phone Number</InputLabel>
                    <OutlinedInput
                        id="phone"
                        type="phone"
                        name="phone"
                        placeholder="Enter phone number"
                        sx={{
                          p: 0.5,
                          borderRadius: isMdScreen ? "16px": "8px",
                          background: "#efefef11"
                        }}
                        error={Boolean(touched.phone && errors.phone)}
                        fullWidth
                    />
                    <FormHelperText error>{touched.phone && errors.phone}</FormHelperText>
                  </Stack>
                </Stack>
              </Grid>
              <Grid item xs={12} md={8} mx={"16px"}>
                <Stack spacing={1} sx={{width: "100%"}}>
                  <InputLabel htmlFor="message" >Message</InputLabel>
                  <OutlinedInput
                      id="message"
                      type="text"
                      name="message"
                      multiline
                      rows={10}
                      placeholder="Enter your message"
                      sx={{
                        p: 2.2,
                        borderRadius: isMdScreen ? "16px": "8px",
                        background: "#efefef11"
                      }}
                      error={Boolean(touched.message && errors.message)}
                      fullWidth
                  />
                  <FormHelperText error>{touched.message && errors.message}</FormHelperText>
                </Stack>
              </Grid>
              <Grid item xs={8}>
                <Stack alignItems={"center"}>
                  <Button
                    variant="contained" 
                    disabled={isSubmitting}
                    type='submit'
                    sx={{width: "200px", p: 1.5, m: 6, fontWeight: 600, fontSize: "18px", borderRadius: "30px", backgroundImage: 'linear-gradient(45deg, #6200ee 30%, #5b3fa9 90%)'}}>Send</Button>
                </Stack>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
  )
}

export default Contact