import { SettingOutlined } from "@ant-design/icons";
import { Box, IconButton } from "@mui/material";
import { motion } from 'framer-motion';

const Settings = ()=>{
    return (
        <Box sx={{ flexShrink: 0, ml: 1 }}>
            <IconButton
                disableRipple
                color="secondary"
                title="Download Free Version"
                sx={{ color: 'text.primary' }}
            >
                <motion.div
                animate={{ scale: [1, 1], rotate: 360 }}
                transition={{ ease: 'easeInOut', repeat: Infinity, duration: 3 }}
                >
                    <SettingOutlined />
                </motion.div>
            </IconButton>
        </Box>
    )
}

export default Settings;