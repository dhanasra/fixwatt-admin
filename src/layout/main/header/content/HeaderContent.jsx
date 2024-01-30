import { Box, Stack } from "@mui/material";
import FullScreen from "../options/Fullscreen";
import Profile from "../options/Profile";
import Settings from "../options/Settings";

const HeaderContent = ()=>{

    return (
        <Stack direction={"row"} spacing={2} sx={{width: "100%"}}>
            <Box sx={{ width: '100%', ml: 1 }} />
            <FullScreen/>
            <Settings/>
            <Profile/>
        </Stack>
    );
}

export default HeaderContent;