import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

// project import
import LogoImg from './LogoImg';
import { activeItem } from '../store/reducers/menu';
import config from '../config';

const Logo = ({ sx, to }) => {
  const { defaultId } = useSelector((state) => state.menu);
  const dispatch = useDispatch();
  return (
    <ButtonBase
      disableRipple
      component={Link}
      onClick={() => dispatch(activeItem({ openItem: [defaultId] }))}
      to={!to ? config.defaultPath : to}
      sx={sx}
    >
      <LogoImg />
    </ButtonBase>
  );
};

Logo.propTypes = {
  sx: PropTypes.object,
  to: PropTypes.string
};

export default Logo;
