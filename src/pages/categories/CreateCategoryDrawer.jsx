import { Box, Divider, Drawer, IconButton, InputLabel, List, OutlinedInput, Stack, Typography, Button, FormHelperText } from "@mui/material";
import { ArrowLeftOutlined, UserOutlined } from "@ant-design/icons";
import ImagePicker from "../../components/ImagePicker";
import { Formik } from "formik";
import * as Yup from 'yup';
import { updateCategory } from "../../network/service";

const CreateCategoryDrawer = ({ open, onClose, onSave, onEdit, category }) => {

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Formik
        initialValues={{
          name: category?.name,
          imageBlob: category? 'image': null
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required('Service name is required'),
          imageBlob: Yup.string().required('Image is required'),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            const categoryToUpdate = {
              name: values.name, 
              imageBlob: values.imageBlob,
              category
            }
            const data = await updateCategory(categoryToUpdate)
            setStatus({ success: true });
            setSubmitting(false); 
            if(category){
              onEdit(data.category)
            }else{
              onSave(data.category)
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
                    {`${category!=null ? "Edit": "Create"} Category`}
                  </Typography>
                </Stack>
                <Divider sx={{ my: "8px" }} />
                <List sx={{p: "16px"}}>
                  <Stack spacing={2}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor={"name"}>Category Name</InputLabel>
                      <OutlinedInput
                        id={"name"}
                        type="text"
                        name={"name"}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder={"Enter category name"}
                        value={values.name}
                        fullWidth
                      />
                      {touched.name && errors.name && (
                        <FormHelperText error>
                          {errors.name}
                        </FormHelperText>
                      )}
                    </Stack>
                    <Stack spacing={2} display={"flex"}>
                        <InputLabel>Image</InputLabel>
                        <ImagePicker 
                          tag={'image'}
                          icon={<UserOutlined style={{fontSize: "36px"}}/>}
                          value={category?.image}
                          onChange={(v)=>setFieldValue("imageBlob", v)}
                        />
                        {touched.imageBlob && errors.imageBlob && (
                          <FormHelperText error>
                            {errors.imageBlob}
                          </FormHelperText>
                        )}
                    </Stack>
                  </Stack>
                </List>
              </Box>
              <Divider/>
              <Stack direction="row" justifyContent="flex-end" spacing={2} sx={{ p: "24px 16px" }}>
                <Button disabled={isSubmitting} variant="outlined" onClick={onClose}>Cancel</Button>
                <Button disabled={isSubmitting} variant="contained" color="primary" type="submit">{ category ? 'Update': 'Save'}</Button>
              </Stack>
            </Box>
          </form>
        )}
      </Formik>
    </Drawer>
  )
}

export default CreateCategoryDrawer;
