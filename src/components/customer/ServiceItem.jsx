import { Stack, Typography } from "@mui/material";
import MainCard from "../MainCard";

const ServiceItem = ({ service })=>{

  return (
    <MainCard>
      <Stack direction={"column"} >
        <Typography>{service.name}</Typography>
      </Stack>
    </MainCard>
  )
}

export default ServiceItem;