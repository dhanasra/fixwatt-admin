import { ImportOutlined } from "@ant-design/icons";
import { Avatar, Button, CircularProgress, Dialog, Stack, Typography } from "@mui/material";
import MainCard from "../MainCard";
import { useTheme } from "@emotion/react";
import { useState } from "react";
import * as XLSX from 'xlsx';
import { importTechnicians, importUsers } from "../../network/service";
import { showSnackbar } from "../../utils/snackbar-utils";

const TechniciansImportDialog =({open, onCancel})=>{

    const theme = useTheme();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const pickFile = ()=>{
      document.getElementById(`import-technicians`).click();
    }

    const downloadFile = ()=>{
      downloadSampleFormat();
    }

    const importData=async()=>{
      setLoading(true);
      await importTechnicians(data);
      setLoading(false);
      setData(null);
      document.getElementById(`import-technicians`).value = null;
      showSnackbar("Technicians imported successfully", { variant: 'success' });
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
            name: item.name || null,
            phone: item.phone || null,
            area: item.area || null,
            pincode: item.pincode || null,
            categories: item.categories || null
        }));
        
        setData(modifiedData);
      };
      
      reader.readAsBinaryString(file);
    };

    const downloadSampleFormat = () => {
        const ws = XLSX.utils.aoa_to_sheet([
            ["name", "phone", "area", "pincode", "categories"],
            ["Dhana Sekaran", "738373833", "Madurai", "673673", "'Pest Control Service', 'Carpenter'"],
            ["Alagu raja", "738373833", "Madurai", "673673", "'Pest Control Service'"],
        ]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "SampleTechnicians");

        XLSX.writeFile(wb, "sample_technicians.xlsx");
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
                  ? <Typography textAlign={"center"} variant="h6">To import technicians list upload your XLSX file contains technician data.</Typography>
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
                <input id={`import-technicians`} type="file" accept=".xlsx, .xls" onChange={handleFileChange} style={{ display: "none" }} />
                
            </Stack>
        </MainCard>
    </Dialog>
)}

export default TechniciansImportDialog;