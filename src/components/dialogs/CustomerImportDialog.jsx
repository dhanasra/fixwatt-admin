import { ImportOutlined } from "@ant-design/icons";
import { Avatar, Button, CircularProgress, Dialog, Stack, Typography } from "@mui/material";
import MainCard from "../MainCard";
import { useTheme } from "@emotion/react";
import { useState } from "react";
import * as XLSX from 'xlsx';
import { importUsers } from "../../network/service";
import { showSnackbar } from "../../utils/snackbar-utils";

const CustomerImportDialog =({open, onCancel})=>{

    const theme = useTheme();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const pickFile = ()=>{
      document.getElementById(`import-customers`).click();
    }

    const downloadFile = ()=>{
      downloadSampleFormat();
    }

    const importData=async()=>{
      setLoading(true);
      await importUsers(data);
      setLoading(false);
      setData(null);
      document.getElementById(`import-customers`).value = null;
      showSnackbar("User data imported successfully", { variant: 'success' });
    }

    const handleFileChange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        const binaryStr = event.target.result;
        const workbook = XLSX.read(binaryStr, { type: 'binary' });
        
        const firstSheetName = workbook.SheetNames[0];
        const firstSheet = workbook.Sheets[firstSheetName];
        const sheetData = XLSX.utils.sheet_to_json(firstSheet);
            
        const modifiedData = sheetData.map(item => ({
            ...item,
            type: item.type || null,
            address: item.address || null,
            pincode: item.pincode || null,
            alternative_phone: item.alternative_phone || null,
            name: item.name || null,
            category: item.category || null,
            segment: item.segment || null,
            phone: item.phone || null,
            age: item.age || null,
            gender: item.gender || null,
            email: item.email || null,
            status: "PENDING",
            roleId: 1
        }));

        console.log(modifiedData)
        
        setData(modifiedData);
      };
      
      reader.readAsBinaryString(file);
    };

    const downloadSampleFormat = () => {
        const ws = XLSX.utils.aoa_to_sheet([
            ["name", "email", "phone", "age", "gender", "segment", "category", "type", "address", "pincode", "alternative_phone"],
            ["Jhon Doe", "john@example.com", "1234567890", 22, "M", "household", "b2c", "HOME", "test address", "600000", "673563637"],
            ["Jacklin", "jacklin@example.com", "672672627", 22, "F", "commercial", "b2b", "HOME", "test address", "600000", "673563637"],
            ["Jacklin", "jacklin@example.com", "672672627", 22, "F", "commercial", "b2b"],
            ["Jacklin", "", "6726f2137", 18, "M",],
        ]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "SampleCustomers");

        XLSX.writeFile(wb, "sample_customers.xlsx");
    };
    
    const closeDialog=()=>{
      onCancel();
      setData(null);
    }

    return(
    <Dialog open={open}>
        <MainCard
            borderRadius={1}
            headerBorder
            sx={{maxWidth: "460px" }}
        >
            <Stack spacing={3} px={4} alignItems={"center"}>
                <Avatar sx={{width: 70, height: 70, background: `${theme.palette.info.lighter}`}} >
                    <ImportOutlined style={{color: `${theme.palette.info.main}`, fontSize: 26}}/>
                </Avatar>

                {
                  data==null
                  ? <Typography textAlign={"center"} variant="h6">To import customers list upload your XLSX file contains customer data.</Typography>
                  : <Typography textAlign={"center"} variant="h6">{`File uploaded succesfully. ${data?.length} data found. Click import to upload all data.`}</Typography>
                }

                

                {
                  loading
                  ? <CircularProgress/>
                  : data!=null
                  ? <Stack spacing={2} direction={"row"}>
                      <Button variant="outlined" onClick={closeDialog} sx={{width: 120}}>
                        Cancel
                      </Button>
                      <Button variant="contained" onClick={importData} sx={{width: 120}}>
                        Import Data
                      </Button>
                    </Stack>
                  : <Stack direction={"column"} spacing={2} alignItems={"center"}>
                    <Stack spacing={2} direction={"row"}>
                    <Button variant="outlined" onClick={closeDialog} sx={{width: 120}}>
                      Cancel
                    </Button>
                    <Button variant="contained" onClick={pickFile} sx={{width: 120}}>
                      Upload File
                    </Button>
                    </Stack>
                    <Button variant="text" onClick={downloadFile}>
                      Download Sample Format
                    </Button>
                  </Stack>
                }
                <input id={`import-customers`} type="file" accept=".xlsx, .xls" onChange={handleFileChange} style={{ display: "none" }} />
                
            </Stack>
        </MainCard>
    </Dialog>
)}

export default CustomerImportDialog;