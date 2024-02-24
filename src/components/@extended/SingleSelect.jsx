import React from 'react';
import { Stack, InputLabel, Select, MenuItem, OutlinedInput, FormHelperText } from '@mui/material'; // Import necessary Material-UI components

function SingleSelect({ id, label, value, name, handleBlur, handleChange, items, start }) {
  return (
    <Stack key={id} spacing={1} sx={{width: "100%"}}>
      { label && <InputLabel htmlFor={id}>{label}</InputLabel>}
      <Select
        startAdornment={start}
        id={id}
        value={value}
        onChange={(e)=>handleChange(e.target.value)}
        onBlur={handleBlur}
        name={name}
        fullWidth
        variant="outlined"
        displayEmpty
        input={<OutlinedInput id={id} />}
      >
        {items}
      </Select>
    </Stack>
  );
}

export default SingleSelect;
