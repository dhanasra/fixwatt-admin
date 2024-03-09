import { Box, Divider, Drawer, IconButton, InputLabel, List, OutlinedInput, Stack, Typography, Button, Grid, FormHelperText, Autocomplete, TextField } from "@mui/material";
import { ArrowLeftOutlined, UserOutlined } from "@ant-design/icons";
import ImagePicker from "../../components/ImagePicker";
import { Formik } from "formik";
import * as Yup from 'yup';
import { updateService } from "../../network/service";

const CreateServiceDrawer = ({ open, onClose, onSave, onEdit, categories, service }) => {

  const category = categories.find((e)=>e.id==service?.category_id)

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Formik
        initialValues={{
          name: service?.name,
          category: category?.name,
          price: service?.price,
          iconBlob: service? 'icon': null,
          imageBlob: service? 'image': null
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required('Service name is required'),
          category: Yup.string().required('Category is required'),
          price: Yup.string().required('Price is required'),
          iconBlob: Yup.string().required('Icon is required'),
          imageBlob: Yup.string().required('Image is required'),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {

            console.log(values)

            var category = categories.find((item)=>item['name']==values.category);
            if(category){
              const serviceToUpdate = {
                name: values.name, 
                categoryId: category.id, 
                price: values.price, 
                iconBlob: values.iconBlob,
                imageBlob: values.imageBlob,
                service
              }
              const data = await updateService(serviceToUpdate)
              setStatus({ success: true });
              setSubmitting(false); 
              if(service){
                onEdit(data.service)
              }else{
                onSave(data.service)
              } 
            }
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
                    {`${service!=null ? "Edit": "Create"} Service`}
                  </Typography>
                </Stack>
                <Divider sx={{ my: "8px" }} />
                <List sx={{p: "16px"}}>
                  <Stack spacing={2}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor={"name"}>Service Name</InputLabel>
                      <OutlinedInput
                        id={"name"}
                        type="text"
                        name={"name"}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder={"Enter service name"}
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
                    <Stack spacing={1}>
                      <InputLabel htmlFor={"price"}>Price</InputLabel>
                      <OutlinedInput
                        id={"price"}
                        type="text"
                        name={"price"}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder={"Enter service price"}
                        value={values.price}
                        fullWidth
                      />
                      {touched.price && errors.price && (
                        <FormHelperText error>
                          {errors.price}
                        </FormHelperText>
                      )}
                    </Stack>
                    <Grid container>
                      <Grid item xs={6}>
                        <Stack spacing={2} display={"flex"}>
                            <InputLabel>Icon</InputLabel>
                            <ImagePicker
                              tag={'icon'}
                              icon={<UserOutlined style={{fontSize: "36px"}}/>}
                              value={service?.icon}
                              onChange={(v)=>{
                                setFieldValue("iconBlob", v);
                              }}
                            />
                            {touched.iconBlob && errors.iconBlob && (
                              <FormHelperText error>
                                {errors.iconBlob}
                              </FormHelperText>
                            )}
                        </Stack>
                      </Grid>
                      <Grid item xs={6}>
                        <Stack spacing={2} display={"flex"}>
                            <InputLabel>Image</InputLabel>
                            <ImagePicker 
                              tag={'image'}
                              icon={<UserOutlined style={{fontSize: "36px"}}/>}
                              value={service?.image}
                              onChange={(v)=>setFieldValue("imageBlob", v)}
                            />
                            {touched.imageBlob && errors.imageBlob && (
                              <FormHelperText error>
                                {errors.imageBlob}
                              </FormHelperText>
                            )}
                        </Stack>
                      </Grid>
                    </Grid>
                  </Stack>
                </List>
              </Box>
              <Divider/>
              <Stack direction="row" justifyContent="flex-end" spacing={2} sx={{ p: "24px 16px" }}>
                <Button disabled={isSubmitting} variant="outlined" onClick={onClose}>Cancel</Button>
                <Button disabled={isSubmitting} variant="contained" color="primary" type="submit">{ service ? 'Update': 'Save'}</Button>
              </Stack>
            </Box>
          </form>
        )}
      </Formik>
    </Drawer>
  )
}

export default CreateServiceDrawer;
