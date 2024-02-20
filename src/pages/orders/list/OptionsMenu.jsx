import { EditOutlined, ExportOutlined, EyeOutlined, MoreOutlined } from "@ant-design/icons";
import { Box, IconButton, ListItem, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const OptionsMenu =({orderId, style})=>{

    const navigate = useNavigate();

    const integrations = [ 
      {
        name: "Order Details", 
        id: "view", 
        icon: <EyeOutlined style={{fontSize: "18px"}}/>
      }, 
      {
        name: "Edit Order", 
        id: "edit", 
        icon: <EditOutlined style={{fontSize: "18px"}}/>
      } 
    ]

    const [anchorEl, setAnchorEl] = useState(null);
    const anchorRef = useRef(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };
    
    const handleOptionClick = async(option) => {
        if(option['id']=='view'){
          navigate(`/orders/d/${orderId}`)
        }else if(option['id']=='edit'){
          
        }
        handleClose();
    };

    return (
        <Box sx={{ flexShrink: 0, }}>
            <IconButton
                component="span"
                disableRipple
                sx={style ?? {
                    bgcolor: open ? 'grey.300' : 'white'
                }}
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
                color="inherit"
            >
                <MoreOutlined />
            </IconButton>
            <Menu
                id="popup-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {
                    integrations.map((item)=>{
                        return <MenuItem key={item['id']} onClick={() => handleOptionClick(item)}>
                            <ListItem>
                                <ListItemIcon>
                                    {item['icon']}
                                </ListItemIcon>
                                <ListItemText primary={`${item['name']}`} />
                            </ListItem>
                        </MenuItem>
                    })
                }
            </Menu>
        </Box>
    )
}

export default OptionsMenu;