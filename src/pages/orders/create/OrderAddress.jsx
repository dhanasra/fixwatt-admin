import { FormHelperText, Grid, InputLabel, MenuItem, OutlinedInput, Stack, Switch, Typography } from "@mui/material";
import SingleSelect from "../../../components/@extended/SingleSelect";
import { useEffect, useState } from "react";

const OrderAddress =({
    handleBlur,
    setFieldValue,
    handleChange,
    values,
    touched,
    errors,
    user
  })=>{

  const [checked, setChecked] = useState(false)
  const [disableSwitch, setDisableSwitch] = useState(false)
  const userAddresses = user?.addresses ?? [];

  useEffect(() => {
      setChecked(values.userId == null);
      setDisableSwitch(values.userId == null);
  }, [values.userId]);

  const handleAddressStateChange =(e)=>{
    setChecked(e.target.checked)
    if(e.target.checked){
      setFieldValue("address", '')
      setFieldValue("pincode", '')
      setFieldValue("addressType", '')
      setFieldValue("addressId", '')
      setFieldValue("altPhone", '')
    }else{
      const ua = userAddresses.length>0 ? userAddresses[0] : null;
      if(ua!=null){
        setFieldValue("addressId", ua?.id);
        setFieldValue("address", ua?.address??'')
        setFieldValue("pincode", ua?.pincode??'')
        setFieldValue("altPhone", ua?.alternative_phone??'')
      }
    }
  }

  return (
    <>
      <Grid item xs={12}>
        <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
          <Typography variant="h5" sx={{my: 0.6}}>Address</Typography>
          <Stack direction={"row"} alignItems={"center"}>
            <Typography>Use New Address</Typography>
            <Switch
              value={false}
              checked={checked}
              disabled={disableSwitch}
              onChange={handleAddressStateChange}
            />
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={2}>
        {
          !checked
            ? (
              <SingleSelect
                label={'Address Type'}
                value={values.addressId}
                handleChange={(e)=>{
                  setFieldValue("addressId", e)
                  const ua = userAddresses.find((ua)=>ua.id==e);
                  console.log(ua)
                  setFieldValue("address", ua?.address??'')
                  setFieldValue("pincode", ua?.pincode??'')
                  setFieldValue("altPhone", ua?.alternative_phone??'')
                }}
                name={"addressId"}
                id={"addressId"}
                items={ userAddresses.map(
                  (e)=>{
                    return <MenuItem value={e.id}>{e?.type}</MenuItem>
                  }
                )}
              />
            )
            : (
              <Stack spacing={1}>
                <InputLabel htmlFor={"address"}>Address Type</InputLabel>
                <OutlinedInput
                  id={"addressType"}
                  type="text"
                  name={"addressType"}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.addressType}
                  fullWidth
                />
                {touched.addressType && errors.addressType && (
                  <FormHelperText error>
                    {errors.addressType}
                  </FormHelperText>
                )}
              </Stack>
            )
        }
    </Grid>
    <Grid item xs={5}>
      <Stack spacing={1}>
        <InputLabel htmlFor={"address"}>Address</InputLabel>
        <OutlinedInput
          id={"address"}
          type="text"
          disabled={!checked}
          name={"address"}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.address}
          fullWidth
        />
        {touched.address && errors.address && (
          <FormHelperText error>
            {errors.address}
          </FormHelperText>
        )}
      </Stack>
    </Grid>
    <Grid item xs={5}>
      <Stack spacing={1}>
        <InputLabel htmlFor={"pincode"}>Pincode</InputLabel>
        <OutlinedInput
          id={"pincode"}
          type="text"
          name={"pincode"}
          disabled={!checked}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.pincode}
          fullWidth
        />
        {touched.pincode && errors.pincode && (
          <FormHelperText error>
            {errors.pincode}
          </FormHelperText>
        )}
      </Stack>
    </Grid>
    <Grid item xs={6}>
      <Stack spacing={1}>
        <InputLabel htmlFor={"phone"}>Phone number</InputLabel>
        <OutlinedInput
          id={"phone"}
          type="text"
          name={"phone"}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.phone}
          fullWidth
        />
        {touched.phone && errors.phone && (
          <FormHelperText error>
            {errors.phone}
          </FormHelperText>
        )}
      </Stack>
    </Grid>
    <Grid item xs={6}>
      <Stack spacing={1}>
        <InputLabel htmlFor={"altPhone"}>Alternative Phone number</InputLabel>
        <OutlinedInput
          id={"altPhone"}
          type="text"
          name={"altPhone"}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.altPhone}
          disabled={!checked}
          fullWidth
        />
        {touched.altPhone && errors.altPhone && (
          <FormHelperText error>
            {errors.altPhone}
          </FormHelperText>
        )}
      </Stack>
    </Grid>
    </>
  )
}

export default OrderAddress;