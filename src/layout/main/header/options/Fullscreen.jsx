import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import { Box, IconButton } from '@mui/material';
import React, { useState } from 'react'

function FullScreen() {


    const [isFullScreen, setFullScreen] = useState(document.fullscreenElement !== null);

    const handleFullScreenToggle = () => {
        if (!isFullScreen) {
          // Enter full screen
          const element = document.documentElement;
          if (element.requestFullscreen) {
            element.requestFullscreen();
          } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
          } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
          } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
          }
        } else {
          // Exit full screen
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          }
        }
    
        // Update state
        setFullScreen(!isFullScreen);
      };

  return (
    <Box sx={{ flexShrink: 0, ml: 1 }}>
        <IconButton
            disableRipple
            onClick={handleFullScreenToggle}
            color="secondary"
            title= {isFullScreen ? "Exit Fullscreen" : "Fullscreen"}
            sx={{ color: 'text.primary'}}
        >
            { isFullScreen ? <FullscreenExitOutlined/> : <FullscreenOutlined /> }
        </IconButton>
    </Box>
  )
}

export default FullScreen