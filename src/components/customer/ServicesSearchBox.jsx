import { Autocomplete, TextField } from "@mui/material"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ServicesSearchBox = ({ services })=>{

  const [selectedValue, setSelectedValue] = useState(null);

  const navigate = useNavigate();

  useEffect(()=>{
    if(selectedValue!=null){
      navigate(`/c/service?category=${selectedValue.category_id}`);
    }
  }, [ selectedValue ])

  return (
    <Autocomplete
      options={services}
      getOptionLabel={(service) => service.name}
      value={selectedValue}
      onChange={(event, newValue)=>{
        setSelectedValue(newValue);
      }}
      renderInput={(params) => <TextField
        sx={{minWidth: "200px", borderRadius: "100px"}}
        {...params} placeholder="Search services" variant="outlined" />}
      isOptionEqualToValue={(option, value) => option.id === value.id}
    />
  )
}

export default ServicesSearchBox;