import { Avatar, Box, Stack, Typography } from "@mui/material"

const Profile =()=>{
    return (
        <Box sx={{ flexShrink: 0, ml: 1 }}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ p: 0.5 }}>
                <Avatar alt="profile user" src={''} sx={{ width: 32, height: 32 }} />
                <Typography variant="subtitle1">Fixwatt Admin</Typography>
            </Stack>
        </Box>
    )
}

export default Profile;