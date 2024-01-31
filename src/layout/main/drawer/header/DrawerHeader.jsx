import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Stack, Chip, Box } from '@mui/material';

// project import
import DrawerHeaderStyled from './DrawerHeaderStyled';
import logo from '../../../../assets/app-logo.png';


const DrawerHeader = ({ open }) => {
  const theme = useTheme();

  return (
    <DrawerHeaderStyled theme={theme} open={open}>
      <Box component={'img'} src={logo} />
    </DrawerHeaderStyled>
  );
};

DrawerHeader.propTypes = {
  open: PropTypes.bool
};

export default DrawerHeader;
