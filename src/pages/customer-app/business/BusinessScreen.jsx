import { Box, Button, FormHelperText, Grid, InputLabel, OutlinedInput, Stack, Typography, useMediaQuery } from "@mui/material";
import CustomerAppBar from "../../../components/customer/CustomerAppBar";
import IMAGE from "../../../assets/admin-bg.png";
import OWNER from "../../../assets/owner.jpg";
import BUSINESS_ICON_1 from "../../../assets/business-icon1.svg";
import BUSINESS_ICON_2 from "../../../assets/business-icon2.svg";
import BUSINESS_ICON_3 from "../../../assets/business-icon3.svg";
import BUSINESS_ICON_4 from "../../../assets/business-icon4.svg";
import MainCard from "../../../components/MainCard";
import { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from 'yup';
import AutoSwitchingVerticalTabs from "./CompanyBenefits";
import Footer from "../../../components/customer/Footer";
import { contactBusinessInquiry } from "../../../network/service";

function BusinessScreen (){

  const isMdScreen = useMediaQuery('(min-width:960px)');

  const [ completed, setCompleted ] = useState(false);

  const items = [
    {
      icon: BUSINESS_ICON_1,
      title: "Simplify operational challenges",
      content: "Leverage our nationwide network of certified technicians. We handle their scheduling, allowing you to concentrate on your core priorities."
    },
    {
      icon: BUSINESS_ICON_2,
      title: "Comprehensive service documentation",
      content: "Our unique work management system tracks detailed service records. Access real-time updates on completed tasks through our intuitive dashboard."
    },
    {
      icon: BUSINESS_ICON_3,
      title: "Adaptable workforce solutions",
      content: "Easily scale your blue-collar workforce up or down as needed. We offer a “cloud-based workforce” so you don’t have to maintain a permanent team."
    },
    {
      icon: BUSINESS_ICON_4,
      title: "Efficient labor coordination",
      content: "Avoid the hassle of recruiting and managing your own teams. Our account managers handle sourcing and oversight from our pool of thousands of verified workers."
    }
  ];

  return (
    <>
      <CustomerAppBar minimal={true}/>
      <Grid container sx={{py: "100px", background: "#68687B"}}>
        <Grid xs={8} sx={{display: "flex", justifyContent: "end", px: "150px", py: "30px"}}>
          <Stack spacing={3}>
            <Typography variant="h1" fontSize={"44px"} fontWeight={900} color={"white"}>{"Proficient skilled"}<br />{"blue-collar workforce ready"}<br />{"to your needs."}</Typography>
            <Typography variant="h5" fontWeight={400} color={"#BfBfBf"} sx={{maxWidth: "600px"}}>Fixwatt simplifies your business operations by offering on-demand, fully-managed technicians. Easily track and manage their work, all within your current workflow, for a hassle-free integration.</Typography>
            <Stack direction={"row"} spacing={2}>
              <Button variant="contained" sx={{borderColor: "1px solid #E6E6FA", background: "#E6E6FA", color: "black", px: 3, py: 1.5, fontSize: "16px"}}>Get Started</Button>
              <Button variant="outlined" sx={{borderColor: "white", color: "white", px: 3, py: 1.5, fontSize: "16px"}} >Case Studies</Button>
            </Stack>
          </Stack>
        </Grid>
        <Grid xs={4}>
          <Box component={"img"} src={IMAGE} sx={{ width: "100%"}}/>
        </Grid>
      </Grid>
      <AutoSwitchingVerticalTabs/>
      <Stack alignItems={"center"} sx={{background: "#f1f4f8", py: 10}}>
        <Grid container spacing={4} sx={{maxWidth: "1000px"}}>
          <Grid item xs={12}>
            <Typography variant="h5" >Why Fixwatt</Typography>
            <Typography variant="h3" >Let's simplify and optimise your worker operations</Typography>
          </Grid>
          {
            items.map((item)=>{
              return (
                <Grid item key={item.title} xs={6}>
                  <Stack direction={"row"} spacing={2}>
                    <Box
                      component={"img"} src={item.icon}
                    />
                    <Stack sx={{width: "100%"}} spacing={1}>
                      <Typography variant="h5">{item.title}</Typography>
                      <Typography>{item.content}</Typography>
                    </Stack>
                  </Stack>
                </Grid>
              )
            })
          }
        </Grid>
      </Stack>
      <Stack alignItems={"center"} sx={{background: "#68687B", py: 8}}>
      <Formik
        initialValues={{
            contactName: '',
            businessName: '',
            services: '',
            email: '',
            phone: '',
            city: '',
            pincode: ''
        }}
        validationSchema={Yup.object().shape({
          contactName: Yup.string().required('Contact name is required'),
          businessName: Yup.string().required('Business name is required'),
          services: Yup.string().required('Services is required'),
          email: Yup.string()
            .email('Invalid email address')
            .nullable(),
          phone: Yup.string()
            .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
            .required('Phone number is required'),
          city: Yup.string().required('City is required'),
          pincode: Yup.string().required('Pincode is required'),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {

            const data = {
              contactName: values.name,
              businessName: values.pincode,
              city: values.area,
              services: values.services,
              pincode: values.pincode,
              email: values.email,
              phone: values.phone
            }

            await contactBusinessInquiry(data);

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
            <Grid container alignItems={"center"} justifyContent={"center"} sx={{marginTop: "80px"}}>
              <Grid item xs={6} alignItems={"center"}>
                <MainCard>
                  <Grid container spacing={2} alignItems={"center"} justifyContent={"center"}>
                    <Grid item xs={12} md={8} mx={"16px"} mt={"26px"} justifyContent={"center"}>
                      <Stack justifyContent={"center"} alignItems={"center"}>
                        <Typography variant="h3">Let us support your Business</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={8} mx={"16px"}>
                      <Stack spacing={1} sx={{width: "100%"}}>
                        <InputLabel htmlFor="contactName" >Contact Name</InputLabel>
                        <OutlinedInput
                            id="contactName"
                            type="text"
                            name="contactName"
                            placeholder="Enter your contact name"
                            sx={{
                              borderRadius: isMdScreen ? "16px": "8px",
                              background: "#efefef11"
                            }}
                            error={Boolean(touched.contactName && errors.contactName)}
                            fullWidth
                        />
                        <FormHelperText error>{touched.contactName && errors.contactName}</FormHelperText>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={8} mx={"16px"}>
                      <Stack spacing={1} sx={{width: "100%"}}>
                        <InputLabel htmlFor="businessName" >Business Name</InputLabel>
                        <OutlinedInput
                            id="businessName"
                            type="text"
                            name="businessName"
                            placeholder="Enter your business name"
                            sx={{
                              borderRadius: isMdScreen ? "16px": "8px",
                              background: "#efefef11"
                            }}
                            error={Boolean(touched.businessName && errors.businessName)}
                            fullWidth
                        />
                        <FormHelperText error>{touched.businessName && errors.businessName}</FormHelperText>
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
                        <InputLabel htmlFor="email" >Email</InputLabel>
                        <OutlinedInput
                            id="email"
                            type="text"
                            name="email"
                            placeholder="Enter your email"
                            sx={{
                              borderRadius: isMdScreen ? "16px": "8px",
                              background: "#efefef11"
                            }}
                            error={Boolean(touched.email && errors.email)}
                            fullWidth
                        />
                        <FormHelperText error>{touched.email && errors.email}</FormHelperText>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={8} mx={"16px"}>
                      <Stack spacing={1} sx={{width: "100%"}}>
                        <InputLabel htmlFor="services" >Service you need</InputLabel>
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
                        <InputLabel htmlFor="city" >City</InputLabel>
                        <OutlinedInput
                            id="city"
                            type="text"
                            name="city"
                            placeholder="Enter your city"
                            sx={{
                              borderRadius: isMdScreen ? "16px": "8px",
                              background: "#efefef11"
                            }}
                            error={Boolean(touched.city && errors.city)}
                            fullWidth
                        />
                        <FormHelperText error>{touched.city && errors.city}</FormHelperText>
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
      </Stack>
      <Stack alignItems={"center"} sx={{background: "#f1f4f8", py: 8}}>
        <Grid container sx={{maxWidth: "1000px"}} spacing={5} alignItems={"center"}>
          <Grid item xs={5}>
            <Box component={"img"} src={OWNER} sx={{ width: "100%", border: "10px solid white"}}/>
          </Grid>
          <Grid item xs={7}>
            <Stack spacing={2}>
              <Typography variant="h3">About Us</Typography>
              <Typography>
              Fixwatt is an online, on-demand service provider based in Madurai, specializing in installation, repair, and maintenance services with a focus on electrical and plumbing work. With over 40 skilled technicians, Fixwatt offers comprehensive solutions, including maintenance contracts for appliances and electrical goods. The platform aims to bridge the gap between technicians and customers, enhancing service accessibility in Tier 2 and 3 cities to match the convenience found in metro areas. Fixwatt serves a wide range of industries, including commercial, residential, industrial, hospitality, and construction sectors.
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Stack>
      <Footer/>
    </>
  )

}

export default BusinessScreen;