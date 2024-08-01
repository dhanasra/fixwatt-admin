import { Dialog } from "@mui/material";
import MainCard from "../MainCard";

const SlotPicker =({open, onCancel, onOk})=>{
    
    return(
    <Dialog open={open}>
        <MainCard
            borderRadius={1}
            headerBorder
            sx={{maxWidth: "460px" }}
        >

        </MainCard>
    </Dialog>
)}

export default SlotPicker;