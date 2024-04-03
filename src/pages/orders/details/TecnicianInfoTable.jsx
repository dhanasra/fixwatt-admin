import { Avatar, Box, Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MessageOutlined } from "@ant-design/icons";
import { notifyTechnicians } from "../../../network/service";
import { showSnackbar } from "../../../utils/snackbar-utils";

const TechnicianInfoTable =({orderId, technicians})=>{

  const sendCustomerInfo = async(phoneNumber)=>{
    await notifyTechnicians(orderId, phoneNumber);
    showSnackbar("Order Information Sent Successfully!", { variant: 'success' });
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <TableContainer component={Box}>
      <Table>
        <TableHead>
          <TableRow style={{ backgroundColor: '#f9fafa' }}>
            <TableCell style={{ width: '230px' }} >Profile</TableCell>
            <TableCell style={{ width: 'auto', textAlign: "start" }} >Area</TableCell>
            <TableCell style={{ width: '180px' }} >Pincode</TableCell>
            <TableCell style={{ width: '180px' }} >Services</TableCell>
            <TableCell style={{ width: '180px' }} >Phone Number</TableCell>
            <TableCell style={{ width: '100px' }} ></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            technicians.map((technician)=>{
              return (
                <TableRow>
                  <TableCell>
                    <Stack direction={"row"} spacing={1} alignItems={"center"}>
                      <Avatar alt="picture" src={technician.picture??''} sx={{ width: 32, height: 32 }} />
                      <Typography>{technician.name}</Typography> 
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography>{technician.area}</Typography> 
                  </TableCell>
                  <TableCell>
                    <Typography>{technician.pincode}</Typography> 
                  </TableCell>
                  <TableCell>
                    <Typography>{technician.category_name}</Typography> 
                  </TableCell>
                  <TableCell>
                    <Typography>{technician.phone}</Typography> 
                  </TableCell>
                  <TableCell>
                    <Stack alignItems={"end"}>
                      <Button onClick={()=>sendCustomerInfo(technician.phone)} variant="outlined" startIcon={<MessageOutlined style={{fontSize: "16px"}}/>} sx={{px: 2}}>Notify</Button>  
                    </Stack>
                  </TableCell>
                </TableRow>
              )
            })
          }
        </TableBody>
      </Table>
    </TableContainer>
    </LocalizationProvider>
  )
}

export default TechnicianInfoTable;