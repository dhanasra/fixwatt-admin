import { Box, Divider, Drawer, IconButton, InputLabel, List, OutlinedInput, Stack, Typography, Button, Grid, FormHelperText, Autocomplete, TextField } from "@mui/material";
import { ArrowLeftOutlined, UserOutlined } from "@ant-design/icons";
import ImagePicker from "../../components/ImagePicker";
import { Formik } from "formik";
import * as Yup from 'yup';
import { updateService } from "../../network/service";

const CreateTechnicianDrawer = ({ open, onClose, onSave, onEdit, technician, categories }) => {

  const category = categories.find((e)=>e.id==technician?.category_id)

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Formik
        initialValues={{
          name: technician?.name,
          phoneNumber: technician?.phoneNumber,
          service: technician?.service
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required('Name is required'),
          phoneNumber: Yup.string().required('Phone number is required'),
          service: Yup.string().required('Service is required')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {

            // var category = categories.find((item)=>item['name']==values.category);
            // if(category){
            //   const serviceToUpdate = {
            //     name: values.name, 
            //     categoryId: category.id, 
            //     price: values.price, 
            //     iconBlob: values.iconBlob,
            //     imageBlob: values.imageBlob,
            //     service
            //   }
            //   const data = await updateService(serviceToUpdate)
            //   setStatus({ success: true });
            //   setSubmitting(false); 
            //   if(service){
            //     onEdit(data.service)
            //   }else{
            //     onSave(data.service)
            //   } 
            // }
          } catch (err) {
            console.log(err);
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }}
      >
        {({ errors, values, touched, handleChange, handleSubmit, handleBlur, isSubmitting, setFieldValue })=>(
          <form noValidate style={{height: "100%"}} onSubmit={handleSubmit}>
            <Box sx={{ width: "500px", height: "100%", display: "flex", flexDirection: "column" }}>
              <Box sx={{ p: "12px", flex: "1", overflowY: "auto" }}>
                <Stack direction={"row"} alignItems={"center"} spacing={1}>
                  <IconButton>
                    <ArrowLeftOutlined />
                  </IconButton>
                  <Typography variant="h4">
                    {`${technician!=null ? "Edit": "Add"} Technician`}
                  </Typography>
                </Stack>
                <Divider sx={{ my: "8px" }} />
                <List sx={{p: "16px"}}>
                  <Stack spacing={2}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor={"name"}>Technician Name</InputLabel>
                      <OutlinedInput
                        id={"name"}
                        type="text"
                        name={"name"}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder={"Enter technician name"}
                        value={values.name}
                        fullWidth
                      />
                      {touched.name && errors.name && (
                        <FormHelperText error>
                          {errors.name}
                        </FormHelperText>
                      )}
                    </Stack>
                    <Stack spacing={1}>
                      <InputLabel htmlFor={"phoneNumber"}>Phone Number</InputLabel>
                      <OutlinedInput
                        id={"phoneNumber"}
                        type="text"
                        name={"phoneNumber"}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder={"Enter technician phone number"}
                        value={values.phoneNumber}
                        fullWidth
                      />
                      {touched.phoneNumber && errors.phoneNumber && (
                        <FormHelperText error>
                          {errors.phoneNumber}
                        </FormHelperText>
                      )}
                    </Stack>
                    <Stack spacing={1}>
                      <InputLabel htmlFor={"service"}>Category</InputLabel>
                      <Autocomplete
                          disablePortal
                          id="category"
                          name="category"
                          options={categories}
                          defaultValue={category}
                          filterOptions={(options, state) =>
                              options.filter(option => option.name.toLowerCase().includes(state.inputValue.toLowerCase()))
                          }
                          onChange={(e)=>{
                            setFieldValue("category", e.target.textContent)
                          }}
                          getOptionLabel={(option) => `${option.name}`}
                          renderInput={(params) => (
                              <TextField
                                  {...params}
                                  type="text"
                                  value={values.category}
                                  name="category"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  placeholder={"Enter service category"}
                                  fullWidth
                                  variant="outlined"
                              />
                          )}
                      />
                      {touched.category && errors.category && (
                          <FormHelperText error>
                            {errors.category}
                          </FormHelperText>
                        )}
                    </Stack>
                  </Stack>
                </List>
              </Box>
              <Divider/>
              <Stack direction="row" justifyContent="flex-end" spacing={2} sx={{ p: "24px 16px" }}>
                <Button disabled={isSubmitting} variant="outlined" onClick={onClose}>Cancel</Button>
                <Button disabled={isSubmitting} variant="contained" color="primary" type="submit">{ technician ? 'Update': 'Save'}</Button>
              </Stack>
            </Box>
          </form>
        )}
      </Formik>
    </Drawer>
  )
}

export default CreateTechnicianDrawer;
