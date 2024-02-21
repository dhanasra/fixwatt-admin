import { Grid, Skeleton, Stack, Typography } from "@mui/material";
import MainCard from "../../components/MainCard";
import CountUp from 'react-countup';
import { CheckCircleFilled, CheckCircleOutlined, FieldTimeOutlined, LikeFilled, LikeOutlined, ToolFilled, ToolOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getCategories, getOrdersInfo } from "../../network/service";

const Dashboard = ()=>{

  const [insights, setInsights] = useState([
      {
          id: "total",
          name: "Total Orders",
          count: 0,
          icon: <ToolFilled style={{fontSize: "32px", color: "grey"}} />
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
          icon: <CheckCircleFilled style={{fontSize: "32px", color: "orange"}} />
      },
      {
          id: "completed",
          name: "Completed Orders",
          count: 0,
          icon: <LikeFilled style={{fontSize: "32px", color: "green"}} />
      }
  ]);

  useEffect(() => {
    const fetchInfo = async () => {
      try {

        const data = await Promise.all([
          getOrdersInfo(),
          getCategories()
        ]);

        localStorage.setItem('categories', JSON.stringify(data[1]))

        let total = 0;

        const updatedInsights = insights.map((insight) => {
          const matchingStatus = data[0].info.find((info) => info.status === insight.id.toUpperCase());
          console.log(matchingStatus)
          if(matchingStatus){
            total = total + matchingStatus.total;
          }
          return {
            ...insight,
            count: matchingStatus ? matchingStatus.total : 0,
          };
        });

        updatedInsights.map((d)=>{
          if(d.id=="total"){
            d.count = total;
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
  }, []);

  return (
    <Grid container spacing={2}> 
      {
        insights.map((insight)=>{
          return (
            <Grid item xs={6} sm={3} md={3} xl={2} key={insight.id}>
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