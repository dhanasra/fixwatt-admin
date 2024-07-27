import { Grid, Stack, Typography } from "@mui/material"
import { BsPeopleFill } from "react-icons/bs"
import { FaTools, FaUser } from "react-icons/fa"

const WorkCount = ()=>{
  return (
    <>
      <Grid container alignItems={"center"} justifyContent={"center"} spacing={2} sx={{background: "rgba(245,245,245,0.80)", p: 2, mb: 2}}>
        <Grid item xs={3}>
          <Stack direction={"row"} justifyContent={"center"} alignItems={"center"} spacing={3}>
            <FaUser style={{fontSize: "40px"}}/>
            <Stack direction={"column"}>
              <Typography variant="h3">50+</Typography>
              <Typography variant="body1">Technicians</Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={3}>
          <Stack direction={"row"} justifyContent={"center"} alignItems={"center"} spacing={3}>
            <BsPeopleFill style={{fontSize: "50px"}}/>
            <Stack direction={"column"}>
              <Typography variant="h3">1450+</Typography>
              <Typography variant="body1">Customers</Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={3}>
          <Stack direction={"row"} justifyContent={"center"} alignItems={"center"} spacing={3}>
            <FaTools style={{fontSize: "40px"}}/>
            <Stack direction={"column"}>
              <Typography variant="h3">4000+</Typography>
              <Typography variant="body1">Services</Typography>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </>
  )
}

export default WorkCount;