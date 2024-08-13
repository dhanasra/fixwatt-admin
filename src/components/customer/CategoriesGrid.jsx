import { Box, Grid, Stack, Typography } from "@mui/material";
import MainCard from "../MainCard";
import { formatImage } from "../../utils/utils";
import { useNavigate } from "react-router-dom";

const CategoriesGrid = ({ categories })=>{

  const navigate = useNavigate();

  return (
    <MainCard>
      <Stack direction={"column"} >
        <Typography variant="h4" sx={{maxWidth: "500px", fontWeight: 500, marginBottom: "20px"}}>What are you looking for?</Typography>
        <Grid container spacing={2}>
          {
            categories.map((item)=>{
              return (
                <Grid  
                  sx={{cursor: "pointer"}}
                  onClick={()=>navigate(`/c/service?category=${item.id}`)}
                  item xs={4} 
                  key={item.id}
                >
                  <Stack direction={"column"} spacing={1}>
                    <Box
                      p={"10px"}
                      height={"72px"}
                      sx={{
                        borderRadius: "12px",
                        background: "rgba(245,245,245,0.80)"
                      }}
                    >
                      <Box component={'img'} src={formatImage(item.image)} width={"100%"} height={"100%"} style={{ objectFit: 'contain'}}/>
                    </Box>
                    <Box sx={{padding: "0 10px"}}>
                      <Typography variant="body2" sx={{textAlign: "center"}}>{item.name}</Typography>
                    </Box>
                  </Stack>
                </Grid>
              )
            })
          }
        </Grid>
      </Stack>
    </MainCard>
  )
}

export default CategoriesGrid;