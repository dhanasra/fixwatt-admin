import {
  Box,
  Button,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Stack
} from "@mui/material";
import MainCard from "../../../components/MainCard";
import PlaceholderImg from "../../../assets/welcome.png";
import * as Yup from "yup";
import { Formik } from "formik";
import { createUser } from "../../../network/service";

const CreateCustomer = () => {

  return (
    <MainCard
      sx={{
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
      }}
      contentSX={{
        width: "100%",
      }}
    >
      <Grid
        container
        spacing={3}
        columnSpacing={16}
        sx={{
          px: { xs: "8px", sm: "36px" },
          py: { xs: "24px", sm: "36px" },
        }}
      >
        <Grid
          item
          sm={5}
          xs={0}
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          <Box
            component="img"
            src={PlaceholderImg}
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item sm={7} xs={12}>
          <Formik
            initialValues={{name: '', phone: '', email: '', address: ''}}
            validationSchema={Yup.object().shape({
              name: Yup.string().max(255).required("Name is required"),
              phone: Yup.string()
                .matches(
                  /^(?:[0-9] ?){6,14}[0-9]$/,
                  "Invalid phone number"
                )
                .required("Phone number is required"),
              email: Yup.string().email("Must be a valid email").max(255),
              address: Yup.string().max(255),
            })}
            onSubmit={async(values, { setErrors, setStatus, setSubmitting, resetForm }) => {
              try {
                const customerData = {
                  name: values.name,
                  phone: values.phone,
                  email: values.email,
                  address: values.address
                };

                await createUser(customerData);

                setStatus({ success: true });
                setSubmitting(false); 
                resetForm();
              } catch (err) {
                setStatus({ success: false });
                setErrors({ submit: err.message });
                setSubmitting(false);
              }
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values,
            }) => (
              <form noValidate onSubmit={handleSubmit}>
                <Stack spacing={3} sx={{ width: "100%" }}>
                  {[
                    {
                      id: "full-name",
                      label: "Full Name",
                      name: "name",
                      placeholder: "Enter full name",
                    },
                    {
                      id: "phone-number",
                      label: "Phone Number",
                      name: "phone",
                      placeholder: "Enter phone number",
                    },
                    {
                      id: "email",
                      label: "Email Address",
                      name: "email",
                      placeholder: "Enter email address",
                    },
                    {
                      id: "address",
                      label: "Address",
                      name: "address",
                      placeholder: "Enter address",
                    }
                  ].map(({ id, label, name, placeholder }) => (
                    <Stack key={id} spacing={1}>
                      <InputLabel htmlFor={id}>{label}</InputLabel>
                      <OutlinedInput
                        id={id}
                        type="text"
                        multiline={id=="address"}
                        minRows={3}
                        name={name}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder={placeholder}
                        value={values[name]}
                        fullWidth
                      />
                      {touched[name] && errors[name] && (
                        <FormHelperText error>
                          {errors[name]}
                        </FormHelperText>
                      )}
                    </Stack>
                  ))}
                  <Box sx={{ height: "16px" }} />
                  <Button
                    disabled={isSubmitting}
                    variant="contained"
                    type="submit"
                    size="large" 
                  >
                    Add Customer
                  </Button>
                </Stack>
              </form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default CreateCustomer;
