import { CloseOutlined, DeleteFilled, DeleteOutlined, EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import * as Yup from 'yup';
import { Avatar, Button, Dialog, Divider, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import MainCard from "../MainCard";
import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AnimateButton from "../@extended/AnimateButton";

const LoginPopup =({open, onCancel, onOk})=>{

    const theme = useTheme();

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
  
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
    
    return(
    <Dialog open={open}>
        <MainCard
            borderRadius={1}
            headerBorder
            sx={{maxWidth: "460px", minWidth: "400px" }}
            title={
                <Stack direction={"row"} justifyContent={"space-between"}>
                    <Stack spacing={0.2}>
                        <Typography variant="h3">Login/Signup</Typography>
                        <Typography variant="body2">Login to continue your booking</Typography>
                    </Stack>
                    <IconButton onClick={()=>onCancel()}>
                        <CloseOutlined/>
                    </IconButton>
                </Stack>
            }
        >
            <Formik
                initialValues={{
                phone: '8940710708',
                password: '123456',
                }}
                validationSchema={Yup.object().shape({
                phone: Yup.string().required('Phone is required'),
                password: Yup.string().required('Password is required'),
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                try {
                    
                    const data = await login({phone: values.phone, password: values.password});
                    DB.initialize(data);
                    const uData = await getUserById(data.user.id);
                    Cookies.set('user', JSON.stringify(uData.user));

                    onOk();

                    setStatus({ success: true });
                    setSubmitting(false);
                } catch (err) {
                    setStatus({ success: false });
                    setErrors({ submit: err.message });
                    setSubmitting(false);
                }
                }}
            >
                {({ errors, touched, isSubmitting }) => (
                <Form noValidate>
                    <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Stack spacing={1}>
                        <InputLabel htmlFor="phone">Phone Number</InputLabel>
                        <Field
                            as={OutlinedInput}
                            id="phone"
                            name="phone"
                            placeholder="Enter phone number"
                            fullWidth
                            error={Boolean(touched.phone && errors.phone)}
                        />
                        <FormHelperText error>{touched.phone && errors.phone}</FormHelperText>
                        </Stack>
                    </Grid>
                    <Grid item xs={12}>
                        <Stack spacing={1}>
                        <InputLabel htmlFor="password-login">Password</InputLabel>
                        <Field
                            as={OutlinedInput}
                            id="password-login"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder="Enter password"
                            fullWidth
                            error={Boolean(touched.password && errors.password)}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={togglePasswordVisibility}
                                edge="end"
                                size="large"
                                >
                                {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                </IconButton>
                            </InputAdornment>
                            }
                        />
                        <FormHelperText error>{touched.password && errors.password}</FormHelperText>
                        </Stack>
                    </Grid>
                    {errors.submit && (
                        <Grid item xs={12}>
                        <FormHelperText error>{errors.submit}</FormHelperText>
                        </Grid>
                    )}
                    <Grid item xs={12} sx={{ mt: 3 }}>
                        <AnimateButton>
                        <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                            Login
                        </Button>
                        </AnimateButton>
                    </Grid>
                    </Grid>
                </Form>
                )}
            </Formik>
        </MainCard>
    </Dialog>
)}

export default LoginPopup;