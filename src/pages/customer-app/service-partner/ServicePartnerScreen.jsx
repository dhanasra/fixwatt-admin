import { Button, Grid, InputLabel, OutlinedInput, Stack, Typography, useMediaQuery } from "@mui/material";
import CustomerAppBar from "../../../components/customer/CustomerAppBar";
import MainCard from "../../../components/MainCard";

function ServicePartnerScreen (){

  const isMdScreen = useMediaQuery('(min-width:960px)');

  return (
    <>
      <CustomerAppBar minimal={true}/>
      <Grid container alignItems={"center"} justifyContent={"center"} sx={{marginTop: "80px"}}>
        <Grid item xs={6} alignItems={"center"}>
          <MainCard>
            <Grid container spacing={2} alignItems={"center"} justifyContent={"center"}>
              <Grid item xs={12} md={8} mx={"16px"} justifyContent={"center"}>
                <Stack justifyContent={"center"} alignItems={"center"}>
                  <Typography variant="h3">Service Partner</Typography>
                  <Typography variant="h6">Become a technician in fixwatt</Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={8} mx={"16px"}>
                <Stack spacing={1} sx={{width: "100%"}}>
                  <InputLabel htmlFor="name" >Name</InputLabel>
                  <OutlinedInput
                      id="name"
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      sx={{
                        borderRadius: isMdScreen ? "16px": "8px",
                        background: "#efefef11"
                      }}
                      fullWidth
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} md={8} mx={"16px"}>
                <Stack spacing={1} sx={{width: "100%"}}>
                  <InputLabel htmlFor="number" >Phone Number</InputLabel>
                  <OutlinedInput
                      id="number"
                      type="text"
                      name="number"
                      placeholder="Enter your number"
                      sx={{
                        borderRadius: isMdScreen ? "16px": "8px",
                        background: "#efefef11"
                      }}
                      fullWidth
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} md={8} mx={"16px"}>
                <Stack spacing={1} sx={{width: "100%"}}>
                  <InputLabel htmlFor="number" >Service you offer</InputLabel>
                  <OutlinedInput
                      id="number"
                      type="text"
                      name="number"
                      placeholder="Eg. Plumbing, Electrical, etc."
                      sx={{
                        borderRadius: isMdScreen ? "16px": "8px",
                        background: "#efefef11"
                      }}
                      fullWidth
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} md={8} mx={"16px"}>
                <Stack spacing={1} sx={{width: "100%"}}>
                  <InputLabel htmlFor="location" >Area</InputLabel>
                  <OutlinedInput
                      id="area"
                      type="text"
                      name="area"
                      placeholder="Enter your area"
                      sx={{
                        borderRadius: isMdScreen ? "16px": "8px",
                        background: "#efefef11"
                      }}
                      fullWidth
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} md={8} mx={"16px"}>
                <Stack spacing={1} sx={{width: "100%"}}>
                  <InputLabel htmlFor="pincode" >Pincode</InputLabel>
                  <OutlinedInput
                      id="pincode"
                      type="text"
                      name="pincode"
                      placeholder="Enter your pincode"
                      sx={{
                        borderRadius: isMdScreen ? "16px": "8px",
                        background: "#efefef11"
                      }}
                      fullWidth
                  />
                </Stack>
              </Grid>
              <Grid item xs={8}>
                <Stack alignItems={"center"}>
                  <Button
                    variant="contained" 
                    onClick={()=>{}}
                    sx={{width: "200px", p: 1.5, m: 6, fontWeight: 600, fontSize: "18px", borderRadius: "30px", backgroundImage: 'linear-gradient(45deg, #6200ee 30%, #5b3fa9 90%)'}}>Send</Button>
                </Stack>
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
      </Grid>
    </>
  )
}

export default ServicePartnerScreen;