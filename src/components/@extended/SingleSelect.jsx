import React from 'react';
import { Stack, InputLabel, Select, MenuItem, OutlinedInput, FormHelperText } from '@mui/material'; // Import necessary Material-UI components

function SingleSelect({ id, label, name, handleBlur, handleChange, items }) {
  return (
    <Stack key={id} spacing={1}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Select
        id={id}
        value={"option1"}
        onChange={handleChange}
        onBlur={handleBlur}
        name={name}
        fullWidth
        variant="outlined"
        displayEmpty
        input={<OutlinedInput label={label} id={id} />}
      >
        {items}
      </Select>
    </Stack>
  );
}

export default SingleSelect;
