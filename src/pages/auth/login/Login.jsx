// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

import AuthWrapper from '../AuthWrapper';
import { Button, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import AnimateButton from '../../../components/@extended/AnimateButton';

const Login =()=>{

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
      setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
  
    return (
      <AuthWrapper>
        <Formik
          initialValues={{
            phone: null,
            password: null,
            submit: null
          }}
          validationSchema={Yup.object().shape({
            phone: Yup.string().required('Phone is required'),
            password: Yup.string().max(255).required('Password is required')
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
          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values })=>(
            <form noValidate onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="phone">Phone Number</InputLabel>
                    <OutlinedInput
                      id="phone"
                      type="phone"
                      value={values.phone}
                      name="phone"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                      fullWidth
                      error={Boolean(touched.phone && errors.phone)}
                    />
                    {touched.phone && errors.phone && (
                      <FormHelperText error id="standard-weight-helper-text-phone">
                        {errors.phone}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="password-login">Password</InputLabel>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(touched.password && errors.password)}
                      id="-password-login"
                      type={showPassword ? 'text' : 'password'}
                      value={values.password}
                      name="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            size="large"
                          >
                            {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                          </IconButton>
                        </InputAdornment>
                      }
                      placeholder="Enter password"
                    />
                    {touched.password && errors.password && (
                      <FormHelperText error id="standard-weight-helper-text-password-login">
                        {errors.password}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                {errors.submit && (
                  <Grid item xs={12}>
                    <FormHelperText error>{errors.submit}</FormHelperText>
                  </Grid>
                )}
                <Grid item xs={12} sx={{mt: 3}}>
                  <AnimateButton>
                    <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                      Login
                    </Button>
                  </AnimateButton>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </AuthWrapper>
    );
}

export default Login;