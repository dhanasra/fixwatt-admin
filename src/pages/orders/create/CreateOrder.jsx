import React, { useState, useEffect } from "react";
import { Autocomplete, Box, Grid, InputLabel, Stack, TextField } from "@mui/material";
import MainCard from "../../../components/MainCard";
import { Formik } from "formik";
import { getCustomers } from "../../../network/service/customerService";

const CreateOrder = () => {

  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      const data = await getCustomers();
      setCustomers(data.customers);
    };

    fetchCustomers();
  }, []);

  return (
    <Box>
      <MainCard>
        <Formik
          initialValues={{ customer: null }} // Set initial value for customer
          onSubmit={async () => {
            // Handle form submission
          }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
            <form noValidate onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor={"customer"}>Customer</InputLabel>
                    <Autocomplete
                        freeSolo
                        disablePortal
                        id="customer"
                        options={customers}
                        filterOptions={(options, state) =>
                            options.filter(option =>
                                option.name.toLowerCase().includes(state.inputValue.toLowerCase()) ||
                                (option.email && option.email.toLowerCase().includes(state.inputValue.toLowerCase())) ||
                                (option.phone && option.phone.toLowerCase().includes(state.inputValue.toLowerCase()))
                            )
                        }
                        getOptionLabel={(option) => `${option.name} ( ${option.phone} )`}
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
                    {touched.customer && errors.customer && (
                        <FormHelperText error>
                          {errors.customer}
                        </FormHelperText>
                      )}
                  </Stack>
                </Grid>

                <Grid item xs={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor={"service"}>Service</InputLabel>
                    <Autocomplete
                        freeSolo
                        disablePortal
                        id="service"
                        options={customers}
                        filterOptions={(options, state) =>
                            options.filter(option =>
                                option.name.toLowerCase().includes(state.inputValue.toLowerCase()) ||
                                (option.email && option.email.toLowerCase().includes(state.inputValue.toLowerCase())) ||
                                (option.phone && option.phone.toLowerCase().includes(state.inputValue.toLowerCase()))
                            )
                        }
                        getOptionLabel={(option) => `${option.name} ( ${option.phone} )`}
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
                    {touched.customer && errors.customer && (
                        <FormHelperText error>
                          {errors.customer}
                        </FormHelperText>
                      )}
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
