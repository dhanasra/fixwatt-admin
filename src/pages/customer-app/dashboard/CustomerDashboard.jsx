import { Box, Grid, Stack, Typography } from "@mui/material";
import CustomerAppBar from "../../../components/customer/CustomerAppBar";
import MainCard from "../../../components/MainCard";
import { useEffect, useState } from "react";
import { getCategories } from "../../../network/service";
import { formatImage } from "../../../utils/utils";
import CategoriesGrid from "../../../components/customer/CategoriesGrid";
import ImagesGrid from "../../../components/customer/ImagesGrid";
import { GrUserWorker } from "react-icons/gr";
import { GroupOutlined, UserOutlined } from "@ant-design/icons";
import { RiToolsLine } from "react-icons/ri";
import { BsPeopleFill, BsTools } from "react-icons/bs";
import { FaPeopleGroup, FaUser } from "react-icons/fa6";
import { HiOutlineUser, HiOutlineUsers } from "react-icons/hi2";
import { FaTools } from "react-icons/fa";

const CustomerDashboard = ()=>{

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCategories();
        setCategories(data.categories);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <CustomerAppBar/>
      <Grid container sx={{padding: "100px 100px"}}>
        <Grid item xs={5}>
          <Stack direction={"column"} spacing={3}>
            <Stack direction={"column"}>
              <Typography variant="h1" sx={{maxWidth: "500px", fontWeight: 500, height: 50}}>Expert Services,</Typography>
              <Typography variant="h1" sx={{maxWidth: "500px", fontWeight: 500}}>Right at Your Doorstep</Typography>
            </Stack>
            <CategoriesGrid categories={categories}/>
          </Stack>
        </Grid>
        <Grid item xs={7}>
          <ImagesGrid/>
        </Grid> 
      </Grid>
      <Grid container alignItems={"center"} justifyContent={"center"} spacing={2} sx={{background: "rgba(245,245,245,0.80)", p: 2}}>
        <Grid item xs={3}>
          <Stack direction={"row"} justifyContent={"center"} alignItems={"center"} spacing={3}>
            <FaUser style={{fontSize: "40px"}}/>
            <Stack direction={"column"}>
              <Typography variant="h3">50+</Typography>
              <Typography variant="body1">Technicians</Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={3}>
          <Stack direction={"row"} justifyContent={"center"} alignItems={"center"} spacing={3}>
            <BsPeopleFill style={{fontSize: "50px"}}/>
            <Stack direction={"column"}>
              <Typography variant="h3">1450+</Typography>
              <Typography variant="body1">Customers</Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={3}>
          <Stack direction={"row"} justifyContent={"center"} alignItems={"center"} spacing={3}>
            <FaTools style={{fontSize: "40px"}}/>
            <Stack direction={"column"}>
              <Typography variant="h3">4000+</Typography>
              <Typography variant="body1">Services</Typography>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </>
  )
}

export default CustomerDashboard;