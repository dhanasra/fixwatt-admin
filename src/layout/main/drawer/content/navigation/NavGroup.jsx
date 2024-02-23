import PropTypes from 'prop-types';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, List, Typography, Collapse } from '@mui/material';
import NavItem from './NavItem';
import CollapseItem from './CollpaseItem';

const NavGroup = ({ item }) => {
  const menu = useSelector((state) => state.menu);
  const { drawerOpen } = menu;
  const [open, setOpen] = useState(false); // State to control the collapse

  const handleCollapseToggle = () => {
    setOpen(!open);
  };

  const renderChildren = (children) => {
    return children.map((childItem) => {
      switch (childItem.type) {
        case 'item':
          return !childItem.showBack ? <NavItem key={childItem.id} item={childItem} level={1} /> : <></>;
        case 'collapse':
          return (
            <NavGroup key={childItem.id} item={childItem} />
          );
        default:
          return null;
      }
    });
  };

  return (
    <List
      subheader={
        item.title && (item.type != "collapse") && drawerOpen && (
          <Box sx={{ pl: 3, mb: 1.5 }}>
            <Typography variant="subtitle2" color="textSecondary">
              {item.title}
            </Typography>
          </Box>
        )
      }
      sx={{ mb: item.type != "collapse" && drawerOpen ? 1.5 : 0, py: 0, zIndex: 0 }}
    >
      {item.type === 'collapse' ? (
        <>
          {/* <Typography
            variant="caption"
            color="error"
            sx={{ p: 2.5, cursor: 'pointer' }}
            onClick={handleCollapseToggle}
          >
            {item.title}
          </Typography> */}
          <CollapseItem onClick={handleCollapseToggle} key={item.id} item={item} level={1} isSelected={open}/>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {renderChildren(item.children)}
          </Collapse>
        </>
      ) : (
        renderChildren(item.children)
      )}
    </List>
  );
};

NavGroup.propTypes = {
  item: PropTypes.object
};

export default NavGroup;
