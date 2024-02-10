import { Box, Divider, Drawer, IconButton, InputLabel, List, ListItem, OutlinedInput, Stack, Typography, Button } from "@mui/material";
import { ArrowLeftOutlined } from "@ant-design/icons";

const CreateServiceDrawer = ({ open, onClose }) => {
  
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: "500px", height: "100%", display: "flex", flexDirection: "column" }}>
        <Box sx={{ p: "16px", flex: "1", overflowY: "auto" }}>
          <Stack direction={"row"} alignItems={"center"} spacing={1}>
            <IconButton>
              <ArrowLeftOutlined />
            </IconButton>
            <Typography variant="h4">
              Create Service
            </Typography>
          </Stack>
          <Divider sx={{ my: "20px" }} />
          <List>
            <Stack spacing={3}>
              <Stack spacing={1}>
                <InputLabel htmlFor={"service"}>Service Name</InputLabel>
                <OutlinedInput />
              </Stack>
              <Stack spacing={1}>
                <InputLabel htmlFor={"service"}>Category</InputLabel>
                <OutlinedInput />
              </Stack>
              <Stack spacing={1}>
                <InputLabel htmlFor={"service"}>Price</InputLabel>
                <OutlinedInput />
              </Stack>
            </Stack>
          </List>
        </Box>
        <Divider sx={{ my: "20px" }} />
        <Stack direction="row" justifyContent="flex-end" spacing={2} sx={{ p: "16px" }}>
          <Button variant="outlined" onClick={onClose}>Cancel</Button>
          <Button variant="contained" color="primary">Save</Button>
        </Stack>
      </Box>
    </Drawer>
  )
}

export default CreateServiceDrawer;
