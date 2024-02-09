import { Avatar, Box, Stack, Typography } from "@mui/material"
import DB from "../../../../network/db";

const Profile =()=>{

    const user = DB.getUser();

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <Box sx={{ flexShrink: 0, ml: 1 }}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ p: 0.5 }}>
                <Avatar alt="profile user" src={''} sx={{ width: 32, height: 32 }} />
                <Typography variant="subtitle1">{capitalizeFirstLetter(user.name)}</Typography>
            </Stack>
        </Box>
    )
}

export default Profile;