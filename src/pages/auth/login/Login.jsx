import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack } from '@mui/material';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import AuthWrapper from '../AuthWrapper';
import AnimateButton from '../../../components/@extended/AnimateButton';
import { getOrders, login } from '../../../network/service';
import { useNavigate } from 'react-router-dom';
import DB from '../../../network/db';

const Login = () => {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <AuthWrapper>
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

            setStatus({ success: true });
            setSubmitting(false);

            navigate('/dashboard', { replace: true });
          } catch (err) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form noValidate>
            <Grid container spacing={3}>
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
    </AuthWrapper>
  );
};

export default Login;
