import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const ServiceInfoTable =({order})=>{

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <TableContainer component={Box}>
      <Table>
        <TableHead>
          <TableRow style={{ backgroundColor: '#f9fafa' }}>
            <TableCell style={{ width: '180px' }} >Category</TableCell>
            <TableCell style={{ width: '180px' }} >Service</TableCell>
            <TableCell style={{ width: 'auto', textAlign: "start" }} >Description</TableCell>
            <TableCell style={{ width: '180px' }} >Date</TableCell>
            <TableCell style={{ width: '180px' }} >Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <Typography>{order?.service.category_name}</Typography>  
            </TableCell>
            <TableCell>
              <Typography>{order?.service.name}</Typography> 
            </TableCell>
            <TableCell>
              <Typography>{order?.service_description}</Typography> 
            </TableCell>
            <TableCell>
              <Typography>{order?.date}</Typography> 
            </TableCell>
            <TableCell>
              <Typography>{order?.start_time}</Typography> 
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    </LocalizationProvider>
  )
}

export default ServiceInfoTable;