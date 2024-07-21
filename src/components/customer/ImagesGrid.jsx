import { Box, Grid, Stack } from "@mui/material";

const ImagesGrid = ()=>{

  return (
    <Grid container spacing={2} sx={{paddingTop: "24px"}}>
      <Grid item xs={2}>
      </Grid>
      <Grid item xs={5}>
        <Stack direction={"column"} spacing={2}>
          <Box sx={{borderRadius: "10px 0 0 0"}} component={'img'} src={"https://firebasestorage.googleapis.com/v0/b/fixwatt-admin.appspot.com/o/pexels-bidvine-517980-1249611.jpg?alt=media&token=d2ccf494-b41b-485b-8850-630e8a1a002a"} width={"100%"} height={"100%"} style={{ objectFit: 'contain'}}/>
          <Box sx={{borderRadius: "0 0 0 10px"}} component={'img'} src={"https://firebasestorage.googleapis.com/v0/b/fixwatt-admin.appspot.com/o/pexels-tima-miroshnichenko-6197122.jpg?alt=media&token=3bc55899-3e78-4b01-96ad-fc007c21c4ad"} width={"100%"} height={"100%"} style={{ objectFit: 'contain'}}/>
        </Stack>
      </Grid>
      <Grid item xs={5}>
        <Stack direction={"column"} spacing={2}>
          <Box sx={{borderRadius: "0 10px 0 0"}} component={'img'} src={"https://firebasestorage.googleapis.com/v0/b/fixwatt-admin.appspot.com/o/pexels-karolina-grabowska-4239131.jpg?alt=media&token=50b85715-0d03-4b26-8a8f-5b997bbb872a"} width={"100%"} height={"100%"} style={{ objectFit: 'contain'}}/>
          <Box sx={{borderRadius: "0 0 10px 0"}} component={'img'} src={"https://firebasestorage.googleapis.com/v0/b/fixwatt-admin.appspot.com/o/pexels-cristian-rojas-8853525.jpg?alt=media&token=8d2fc953-941b-44cb-9261-69741b3dbe2d"} width={"100%"} height={"100%"} style={{ objectFit: 'contain'}}/>
        </Stack>
      </Grid>
    </Grid>
  )
}

export default ImagesGrid;