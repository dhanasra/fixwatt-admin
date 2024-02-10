import { Autocomplete, Box, OutlinedInput, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, styled } from "@mui/material";
import MainCard from "../../../components/MainCard";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const ServiceTable =({services})=>{


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <TableContainer component={Box}>
      <Table>
        <TableHead>
          <TableRow style={{ backgroundColor: '#f9fafa' }}>
            <TableCell style={{ width: '300px' }} >Service</TableCell>
            <TableCell style={{ width: 'auto' }} >Description</TableCell>
            <TableCell style={{ width: '220px' }} >Date</TableCell>
            <TableCell style={{ width: '220px' }} >Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <Autocomplete
                disablePortal
                id="service"
                options={services}
                filterOptions={(options, state) =>
                    options.filter(option =>
                        option.name.toLowerCase().includes(state.inputValue.toLowerCase()) ||
                        (option.email && option.email.toLowerCase().includes(state.inputValue.toLowerCase())) ||
                        (option.phone && option.phone.toLowerCase().includes(state.inputValue.toLowerCase()))
                    )
                }
                getOptionLabel={(option) => `${option.name}`}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        type="text"
                        name={"name"}
                        // onBlur={handleBlur}
                        // onChange={handleChange}
                        fullWidth
                        variant="outlined"
                    />
                )}
              />
            </TableCell>
            <TableCell>
              <OutlinedInput fullWidth/>
            </TableCell>
            <TableCell>
              <DatePicker
                value={dayjs('2022-04-17')}
                onChange={()=>{}}
              />
            </TableCell>
            <TableCell>
              <TimePicker
                value={dayjs('2022-04-17')}
                onChange={(newValue) => setValue(newValue)}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    </LocalizationProvider>
  )
}

export default ServiceTable;