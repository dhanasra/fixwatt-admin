// project import
import SimpleBarScroll from '../../../../components/third-party/SimpleBar';
import Navigation from './navigation/Navigation';

// ==============================|| DRAWER CONTENT ||============================== //

const DrawerContent = () => (
  <SimpleBarScroll
    sx={{
      '& .simplebar-content': {
        display: 'flex',
        height: 'auto',
        flexDirection: 'column'
      }
    }}
  >
    <Navigation />
  </SimpleBarScroll>
);

export default DrawerContent;
