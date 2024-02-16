import { Grid, Skeleton, Stack, Typography } from "@mui/material";
import MainCard from "../../components/MainCard";
import CountUp from 'react-countup';
import { CheckCircleFilled, CheckCircleOutlined, FieldTimeOutlined, LikeOutlined, ToolOutlined } from "@ant-design/icons";
import { useState } from "react";

const Dashboard = ()=>{

  const [insights, setInsights] = useState([
      {
          id: "total",
          name: "Total Orders",
          count: 0,
          icon: <ToolOutlined style={{fontSize: "32px", color: "grey"}} />
      },
      {
          id: "pending",
          name: "Pending Orders",
          count: 0,
          icon: <FieldTimeOutlined style={{fontSize: "32px", color: "blue"}} />
      },
      {
          id: "approved",
          name: "Approved Orders",
          count: 0,
          icon: <CheckCircleOutlined style={{fontSize: "32px", color: "orange"}} />
      },
      {
          id: "completed",
          name: "Completed Orders",
          count: 0,
          icon: <LikeOutlined style={{fontSize: "32px", color: "green"}} />
      }
  ]);


  return (
    <Grid container spacing={2}> 
      {
        insights.map((insight)=>{
          return (
            <Grid item xs={3} key={insight.id}>
                <MainCard>
                  <Stack>
                    <Typography variant="subtitle1" color={"grey"}>{insight.name}</Typography>
                    <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                        {insight.icon}
                        <CountUp start={0} end={insight.count} duration={2.5} separator="," style={{fontSize: "60px", color: "#3d3d3d", fontWeight: "900"}} />
                    </Stack>
                  </Stack>
                </MainCard>
            </Grid>
          )
        })
      }
    </Grid>
  )
}

export default Dashboard;