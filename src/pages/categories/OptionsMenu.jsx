import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";
import { Box, IconButton, ListItem,  ListItemText, Menu, MenuItem } from "@mui/material";
import { useRef, useState } from "react";

const OptionsMenu =({onClick, category, style})=>{

    const integrations = [ 
        {
          name: "Edit Category", 
          id: "edit", 
          icon: <EditOutlined style={{fontSize: "18px"}}/>
        },
        {
            name: "Delete Category", 
            id: "delete", 
            icon: <DeleteOutlined style={{fontSize: "18px"}}/>
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
        onClick(option['id'], category);
        handleClose();
    };

    return (
        <Box sx={{ flexShrink: 0, }}>
            <IconButton
                component="span"
                disableRipple
                sx={style ?? {
                    bgcolor: open ? 'grey.100' : 'white'
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