import { Box, Divider, Drawer, IconButton, InputLabel, List, OutlinedInput, Stack, Typography, Button, FormHelperText, Autocomplete, TextField } from "@mui/material";
import { ArrowLeftOutlined, UserOutlined } from "@ant-design/icons";
import { Formik } from "formik";
import * as Yup from 'yup';
import { updateTechnician } from "../../network/service";
import ImagePicker from "../../components/ImagePicker";

const CreateTechnicianDrawer = ({ open, onClose, onSave, onEdit, technician, categories }) => {

  console.log(categories);

  const category = categories.find((e)=>e.id==technician?.category_id)

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Formik
        initialValues={{
          name: technician?.name,
          phoneNumber: technician?.phone,
          category: technician?.category,
          area: technician?.area,
          pincode: technician?.pincode,
          imageBlob: category? 'image': null
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required('Name is required'),
          phoneNumber: Yup.string().required('Phone number is required'),
          category: Yup.string().required('Category is required'),
          imageBlob: Yup.string().required('Image is required'),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {

            var category = categories.find((item)=>item['name']==values.category);
            if(category){
              const technicianToUpdate = {
                name: values.name, 
                phone: values.phoneNumber, 
                categoryId: category.id, 
                imageBlob: values.imageBlob,
                area: values.area,
                pincode: values.pincode,
                technician
              }
              const data = await updateTechnician(technicianToUpdate)
              setStatus({ success: true });
              setSubmitting(false); 
              if(technician){
                onEdit(data.technician)
              }else{
                onSave(data.technician)
              } 
            }
          } catch (err) {
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
                    <Stack spacing={2} display={"flex"}>
                        <InputLabel>Image</InputLabel>
                        <ImagePicker
                          tag={'image'}
                          icon={<UserOutlined style={{fontSize: "36px"}}/>}
                          value={values?.image}
                          onChange={(v)=>setFieldValue("imageBlob", v)}
                        />
                        {touched.imageBlob && errors.imageBlob && (
                          <FormHelperText error>
                            {errors.imageBlob}
                          </FormHelperText>
                        )}
                    </Stack>
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
                    <Stack direction={"row"} spacing={3}>
                      <Stack spacing={1} sx={{width: "100%"}}>
                        <InputLabel htmlFor={"area"}>Area</InputLabel>
                        <OutlinedInput
                          id={"area"}
                          type="text"
                          name={"area"}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder={"Enter area"}
                          value={values.area}
                          fullWidth
                        />
                        {touched.area && errors.area && (
                          <FormHelperText error>
                            {errors.area}
                          </FormHelperText>
                        )}
                      </Stack>
                      <Stack spacing={1}>
                        <InputLabel htmlFor={"pincode"}>Pincode</InputLabel>
                        <OutlinedInput
                          id={"pincode"}
                          type="text"
                          name={"pincode"}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder={"Enter pincode"}
                          value={values.pincode}
                          fullWidth
                        />
                        {touched.pincode && errors.pincode && (
                          <FormHelperText error>
                            {errors.pincode}
                          </FormHelperText>
                        )}
                      </Stack>
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
