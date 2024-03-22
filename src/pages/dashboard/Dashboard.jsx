import { Box, Button, Grid, IconButton, Skeleton, Stack, Typography } from "@mui/material";
import MainCard from "../../components/MainCard";
import CountUp from 'react-countup';
import { CheckCircleFilled, CheckCircleOutlined, CloseOutlined, FieldTimeOutlined, FilterOutlined, LikeFilled, LikeOutlined, ToolFilled, ToolOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getCategories, getOrdersInfo } from "../../network/service";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const Dashboard = ()=>{


  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [insights, setInsights] = useState([
      {
          id: "total",
          name: "Total Orders",
          count: 0,
          payment_received: 0,
          payment_for_technician: 0,
          additional_charges: 0,
          icon: <ToolFilled style={{fontSize: "32px", color: "grey"}} />
      },
      {
          id: "pending",
          name: "Pending Orders",
          count: 0,
          payment_received: 0,
          payment_for_technician: 0,
          additional_charges: 0,
          icon: <FieldTimeOutlined style={{fontSize: "32px", color: "blue"}} />
      },
      {
          id: "approved",
          name: "Approved Orders",
          count: 0,
          payment_received: 0,
          payment_for_technician: 0,
          additional_charges: 0,
          icon: <CheckCircleFilled style={{fontSize: "32px", color: "orange"}} />
      },
      {
          id: "completed",
          name: "Completed Orders",
          count: 0,
          payment_received: 0,
          payment_for_technician: 0,
          additional_charges: 0,
          icon: <LikeFilled style={{fontSize: "32px", color: "green"}} />
      }
  ]);

  useEffect(() => {
    const fetchInfo = async () => {
      try {

        const data = await Promise.all([
          getOrdersInfo(startDate, endDate),
          getCategories()
        ]);

        localStorage.setItem('categories', JSON.stringify(data[1]))

        let total = 0;
        let total_payment_received = 0;
        let total_payment_for_technician = 0;
        let total_additional_charges = 0;

        const updatedInsights = insights.map((insight) => {
          const matchingStatus = data[0].info.find((info) => info.status === insight.id.toUpperCase());
          if(matchingStatus){
            total = total + matchingStatus.total;
            total_payment_received = total_payment_received + matchingStatus.total_payment_received;
            total_payment_for_technician = total_payment_for_technician + matchingStatus.total_payment_for_technician;
            total_additional_charges = total_additional_charges + matchingStatus.total_additional_charges;
          }
          return {
            ...insight,
            payment_received: matchingStatus ? matchingStatus.total_payment_received : 0,
            payment_for_technician: matchingStatus ? matchingStatus.total_payment_for_technician : 0,
            additional_charges: matchingStatus ? matchingStatus.total_additional_charges : 0,
            count: matchingStatus ? matchingStatus.total : 0,
          };
        });

        updatedInsights.map((d)=>{
          if(d.id=="total"){
            d.count = total;
            d.payment_received = total_payment_received;
            d.payment_for_technician = total_payment_for_technician;
            d.additional_charges = total_additional_charges;
            return d;
          }
          return d;
        })
  
        setInsights(updatedInsights);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchInfo();
  }, [startDate, endDate]);

  const handleStartDateChange = (date) => {
    console.log(date)
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleClearDates = () => {
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Grid container spacing={2}> 
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: "end", verticalAlign: "center" }}>
          <DatePicker
            label="From"
            value={startDate}
            format="MMM DD, YYYY"
            onChange={handleStartDateChange}
            renderInput={(params) => <Box {...params} />}
            inputFormat="dd/MM/yyyy"
          />
          <DatePicker
            label="To"
            value={endDate}
            format="MMM DD, YYYY"
            onChange={handleEndDateChange}
            renderInput={(params) => <Box {...params} />}
            inputFormat="dd/MM/yyyy"
          />
          <Box >
            <IconButton onClick={handleClearDates}
                edge="start"
                color="secondary"
                disabled={!(startDate!=null && endDate!=null)}
                sx={{ color: 'text.primary', border: "1px solid #f0f0f0", width: "42px", height: "42px", ml: "0px" }}
         >
              <CloseOutlined/>   
            </IconButton>
          </Box>
        </Box>
      </Grid>
      {
        insights.map((insight)=>{
          return (
            <Grid item xs={6} sm={6} md={3} xl={2} key={insight.id}>
                <MainCard>
                  <Stack >
                    <Typography variant="subtitle1" color={"grey"}>{insight.name}</Typography>
                    <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                        {insight.icon}
                        <CountUp start={0} end={insight.count} duration={2.5} separator="," style={{fontSize: "60px", color: "#3d3d3d", fontWeight: "900"}} />
                    </Stack>
                    <Stack spacing={1}>
                    <>
                    <Typography variant="body2" color={"grey"}>Payment From Customer</Typography>
                    <Typography variant="h6" sx={{textAlign: "end"}}>{ `\u20b9 ${insight.payment_received}`}</Typography>
                    </>
                    <>
                    <Typography variant="body2" color={"grey"}>Payment For Technician</Typography>
                    <Typography variant="h6" sx={{textAlign: "end"}}>{ `\u20b9 ${insight.payment_for_technician}`}</Typography>
                    </>
                    <>
                    <Typography variant="body2" color={"grey"}>Additional Charges</Typography>
                    <Typography variant="h6" sx={{textAlign: "end"}}>{ `\u20b9 ${insight.additional_charges}`}</Typography>
                    </>
                    <>
                    <Typography variant="body2" color={"grey"}>Revenue</Typography>
                    <Typography variant="h3" sx={{textAlign: "end"}}>{ `\u20b9 ${insight.payment_received - insight.payment_for_technician - insight.additional_charges}`}</Typography>
                    </>
                    </Stack>
                  </Stack>
                </MainCard>
            </Grid>
          )
        })
      }
    </Grid>
    </LocalizationProvider>
  )
}

export default Dashboard;