import { Box, Button, Dialog, Divider, FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Radio, RadioGroup, Stack, Typography } from "@mui/material";
import MainCard from "../MainCard";
import { CloseOutlined } from "@ant-design/icons";
import { formatDateOnly, formatDayOnly } from "../../utils/utils";
import { useTheme } from "@emotion/react";
import { useState } from "react";

const SlotPicker =({open, onCancel, onProceed})=>{

    const today = new Date();
    const theme = useTheme();

    const [ selectedDate, setSelectedDate ] = useState(null);
    const [ selectedTime, setSelectedTime ] = useState(null);

    const dates = [];

    const timings = [
        "10.00 AM", "11.00 AM", "12.00 PM", "01.00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM"
    ];

    for (let i = 0; i < 3; i++) {
        const nextDate = new Date(today);
        nextDate.setDate(today.getDate() + i);
        dates.push(nextDate);
    }
    
    return(
    <Dialog open={open}>
        <MainCard
            borderRadius={1}
            headerBorder
            sx={{maxWidth: "460px" }}
        >
            <Stack spacing={2}>
                <Stack spacing={2}>
                    <Typography variant="h5">When should the professional arrive?</Typography>
                    <Box>
                    <Grid container spacing={2}>
                        {
                            dates?.map((d)=>(
                                <Grid item xs={3} key={d}>
                                    <Box
                                        onClick={
                                            ()=>{
                                                setSelectedDate(d.toDateString());
                                            }
                                        }
                                        sx={{
                                            background: selectedDate==d.toDateString() ? theme.palette.primary.lighter: null,
                                            cursor: "pointer",
                                            border: `1px solid ${ selectedDate==d.toDateString() ? theme.palette.primary.main :theme.palette.grey.A800}`,
                                            borderRadius: "4px",
                                            padding: "10px 20px"
                                        }}      
                                    >
                                        <Stack alignItems={"center"}>
                                            <Typography>{formatDateOnly(d)}</Typography>
                                            <Typography>{formatDayOnly(d)}</Typography>
                                        </Stack>
                                    </Box>
                                </Grid>
                            ))
                        }
                    </Grid>
                    </Box>
                </Stack>
                <Stack spacing={2} direction={"column"}>
                    <Typography variant="h5">Select time slot of service</Typography>
                    <Box>
                        <Grid container spacing={2}>
                            {
                                timings?.map((t)=>(
                                    <Grid item xs={4} key={t}>
                                        <Box
                                            onClick={
                                                ()=>setSelectedTime(t)
                                            }
                                            sx={{
                                                background: selectedTime==t ? theme.palette.primary.lighter: null,
                                                cursor: "pointer",
                                                border: `1px solid ${ selectedTime==t ? theme.palette.primary.main :theme.palette.grey.A800}`,
                                                borderRadius: "4px",
                                                padding: "10px 20px"
                                            }}      
                                        >
                                            <Stack alignItems={"center"}>
                                                <Typography>{t}</Typography>
                                            </Stack>
                                        </Box>
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </Box>
                </Stack>
                <Box/>
                <Button disabled={ !(selectedDate && selectedTime) } onClick={()=>onProceed(selectedDate, selectedTime)} variant="contained">Proceed</Button>
            </Stack>
        </MainCard>
    </Dialog>
)}

export default SlotPicker;