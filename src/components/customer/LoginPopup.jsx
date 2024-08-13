import { CloseOutlined, DeleteFilled, DeleteOutlined, EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import * as Yup from 'yup';
import { Avatar, Button, Dialog, Divider, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import MainCard from "../MainCard";
import { Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookies from 'js-cookie';
import AnimateButton from "../@extended/AnimateButton";
import { getUserById, login, register } from "../../network/service";
import DB from "../../network/db";

const LoginPopup =({open, onCancel, onOk})=>{

    const theme = useTheme();

    const navigate = useNavigate();

    const [ isLogin, setIsLogin ] = useState(true);

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
                        <Typography variant="h3">{ isLogin ? 'Login': 'Signup' }</Typography>
                        {
                            isLogin
                            ? <Typography variant="body2">Don't have an account? <Link onClick={()=>setIsLogin(false)}>Create Now</Link></Typography>
                            : <Typography variant="body2">Already have an account? <Link onClick={()=>setIsLogin(true)}>Login Now</Link></Typography>
                        }
                    </Stack>
                    <IconButton onClick={()=>onCancel()}>
                        <CloseOutlined/>
                    </IconButton>
                </Stack>
            }
        >
            <Formik
                initialValues={{
                phone: '',
                password: '',
                name: '',
                }}
                validationSchema={Yup.object().shape({
                    name: Yup.string().required('Name is required'),
                    phone: Yup.string().required('Phone is required'),
                    password: Yup.string().required('Password is required'),
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                try {
                    
                    const data = isLogin
                    ? await login({phone: values.phone, password: values.password})
                    : await register({phone: values.phone, password: values.password, name: values.name}); 
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
                    {
                        !isLogin && <Grid item xs={12}>
                            <Stack spacing={1}>
                            <InputLabel htmlFor="name">Full Name</InputLabel>
                            <Field
                                as={OutlinedInput}
                                id="name"
                                name="name"
                                placeholder="Enter your name"
                                fullWidth
                                error={Boolean(touched.name && errors.name)}
                            />
                            <FormHelperText error>{touched.name && errors.name}</FormHelperText>
                            </Stack>
                        </Grid>
                    }
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
                            {
                                isLogin ? "Login": "Create"
                            }
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