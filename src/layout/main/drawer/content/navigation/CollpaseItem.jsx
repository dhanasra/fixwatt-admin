import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ListItemButton, ListItemIcon, ListItemText, Typography, useTheme } from '@mui/material';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

const CollapseItem = ({ item, level, onClick, isSelected }) => {
  const { drawerOpen } = useSelector((state) => state.menu);
  const theme = useTheme();
  const { icon: Icon, external, url, target, disabled, title } = item;

  const itemTarget = external ? '_blank' : '_self';
  const listItemProps = external ? { component: 'a', href: url, target: target || itemTarget } : { component: forwardRef((props, ref) => <Link ref={ref} {...props} />) };

  const iconSelectedColor = 'primary.main';
  const textColor = 'text.primary';
  const iconStyle = {
    minWidth: 28,
    color: isSelected ? iconSelectedColor : textColor,
    ...(drawerOpen ? {} : {
      borderRadius: 1.5,
      width: 36,
      height: 36,
      alignItems: 'center',
      justifyContent: 'center',
      '&:hover': { bgcolor: 'secondary.lighter' },
      ...(isSelected && { bgcolor: 'primary.lighter' })
    })
  };

  return (
    <ListItemButton
      {...listItemProps}
      disabled={disabled}
      onClick={onClick}
      sx={{
        zIndex: 1200,
        pl: drawerOpen ? `${level * 28}px` : 1.5,
        py: !drawerOpen && level === 1 ? 1.25 : 1,
        ...(drawerOpen ? {
          '&:hover': { bgcolor: isSelected ? 'white' : 'primary.lighter' },
          '&.Mui-selected': {
            bgcolor: 'primary.lighter',
            borderRight: `2px solid ${theme.palette.primary.main}`,
            color: iconSelectedColor,
            '&:hover': { color: iconSelectedColor, bgcolor: 'primary.lighter' }
          }
        } : {
          '&:hover': { bgcolor: 'transparent' },
          '&.Mui-selected': { bgcolor: 'transparent', '&:hover': { bgcolor: 'transparent' } }
        })
      }}
    >
      {Icon && (
        <ListItemIcon sx={iconStyle}>
          <Icon style={{ fontSize: drawerOpen ? '1rem' : '1.25rem' }} />
        </ListItemIcon>
      )}
      {(drawerOpen || (!drawerOpen && level !== 1)) && (
        <ListItemText
          primary={<Typography variant="h6" sx={{ color: isSelected ? iconSelectedColor : textColor }}>{title}</Typography>}
        />
      )}
      <ListItemIcon sx={iconStyle}>
        {isSelected ? <UpOutlined /> : <DownOutlined />}
      </ListItemIcon>
    </ListItemButton>
  );
};

CollapseItem.propTypes = {
  item: PropTypes.object.isRequired,
  level: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired
};

export default CollapseItem;
