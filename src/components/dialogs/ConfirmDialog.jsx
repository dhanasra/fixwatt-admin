import { DeleteFilled, DeleteOutlined } from "@ant-design/icons";
import { Avatar, Button, Dialog, Stack, Typography } from "@mui/material";
import MainCard from "../MainCard";
import { useTheme } from "@emotion/react";

const ConfirmDialog =({open, onCancel, onOk, title, content, btnTxt})=>{

    const theme = useTheme();
    
    return(
    <Dialog open={open}>
        <MainCard
            borderRadius={1}
            headerBorder
            sx={{maxWidth: "460px" }}
        >
            <Stack spacing={3} px={4} alignItems={"center"}>
                <Avatar sx={{width: 70, height: 70, background: `${theme.palette.error.lighter}`}} >
                    <DeleteFilled style={{color: `${theme.palette.error.main}`, fontSize: 26}}/>
                </Avatar>
                <Typography variant="h4" sx={{textAlign: "center"}}>{title}</Typography>
                <Typography variant="body1" sx={{textAlign: "center"}}>{content}</Typography>
                <Stack direction={"row"} spacing={2} sx={{width: "100%"}}>
                    <Button variant="outlined" onClick={onCancel} sx={{px: 3}} fullWidth>Cancel</Button>
                    <Button variant="contained" color="error" onClick={onOk} sx={{px: 3}} fullWidth>{btnTxt??"Ok"}</Button>
                </Stack>
            </Stack>
        </MainCard>
    </Dialog>
)}

export default ConfirmDialog;