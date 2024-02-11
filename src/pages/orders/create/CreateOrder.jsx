import React, { useState, useEffect } from "react";
import { Autocomplete, Box, Button, Divider, Grid, InputLabel, MenuItem, OutlinedInput, Stack, TextField, Typography, useTheme } from "@mui/material";
import MainCard from "../../../components/MainCard";
import { Formik } from "formik";
import { getCustomers } from "../../../network/service/customerService";
import { getServices, getTechnicians, getUsers } from "../../../network/service";
import ServiceTable from "./ServiceTable";
import SingleSelect from "../../../components/@extended/SingleSelect";

const CreateOrder = () => {

  const theme = useTheme();

  const [users, setUsers] = useState([]);
  const [services, setServices] = useState([]);
  const [technicians, setTechnicians] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await Promise.all([
          getUsers(),
          getServices(),
          getTechnicians()
        ]);
        setUsers(data[0].users);
        setServices(data[1].services);
        setTechnicians(data[2].technicians);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetch();
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
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h5" sx={{my: 0.6}}>Customer Details</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor={"user"}>Name</InputLabel>
                    <Autocomplete
                        freeSolo
                        disablePortal
                        id="user"
                        options={users}
                        filterOptions={(options, state) =>
                            options.filter(option =>
                                option.name.toLowerCase().includes(state.inputValue.toLowerCase()) ||
                                (option.email && option.email.toLowerCase().includes(state.inputValue.toLowerCase())) ||
                                (option.phone && option.phone.toLowerCase().includes(state.inputValue.toLowerCase()))
                            )
                        }
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
                    {touched.customer && errors.customer && (
                        <FormHelperText error>
                          {errors.customer}
                        </FormHelperText>
                      )}
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor={"service"}>Address</InputLabel>
                    <OutlinedInput/>
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor={"service"}>Pincode</InputLabel>
                    <OutlinedInput/>
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor={"service"}>Phone number</InputLabel>
                    <OutlinedInput/>
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor={"service"}>Alternative Phone number</InputLabel>
                    <OutlinedInput/>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h5" sx={{my: 0.6}}>Service</Typography>
                </Grid>
                <Grid item xs={12}>
                  <ServiceTable
                    services={services}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h5" sx={{my: 0.6}}>Technician</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor={"technician"}>Name</InputLabel>
                    <Autocomplete
                      freeSolo
                      disablePortal
                      id="technician"
                      options={technicians}
                      filterOptions={(options, state) =>
                          options.filter(option =>
                              option.name.toLowerCase().includes(state.inputValue.toLowerCase()) ||
                              (option.phone && option.phone.toLowerCase().includes(state.inputValue.toLowerCase()))
                          )
                      }
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
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor={"service"}>Phone number</InputLabel>
                    <OutlinedInput/>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{py: 1}}/>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor={"service"}>Notes</InputLabel>
                    <OutlinedInput
                      multiline
                      minRows={2}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={4} direction={"row-reverse"} sx={{pt: 4, pb: 2}}>
                    <Button variant="contained" sx={{px: 5, py: 1.2}}>Create</Button>
                    <Button sx={{px: 5, py: 1.2, color: "red"}} >Cancel</Button>
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
