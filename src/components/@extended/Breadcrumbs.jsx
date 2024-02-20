import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// material-ui
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import { Grid, IconButton, Stack, Typography } from '@mui/material';

// project imports
import MainCard from '../MainCard';
import { ArrowLeftOutlined } from '@ant-design/icons';

// ==============================|| BREADCRUMBS ||============================== //

const Breadcrumbs = ({ navigation, title, ...others }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [main, setMain] = useState();
  const [item, setItem] = useState();

  // set active item state
  const getCollapse = (menu) => {
    if (menu.children) {
      menu.children.filter((collapse) => {
        
        if (collapse.type && collapse.type === 'collapse') {
          getCollapse(collapse);
        } else if (collapse.type && collapse.type === 'item') {

          const pattern = /^\/orders\/d\/\d+$/;
          if (location.pathname === collapse.url || ( collapse.url == "/orders/d/" && pattern.test(location.pathname))) {
            setMain(menu);
            setItem(collapse);
            console.log(menu);
          }
        }
        return false;
      });
    }
  };

  useEffect(() => {
    navigation?.items?.map((menu) => {
      if (menu.type && menu.type === 'group') {
        getCollapse(menu);
      }
      return false;
    });
  });

  let mainContent;
  let itemContent;
  let breadcrumbContent = <Typography />;
  let itemTitle = '';

  // collapse item
  if (main && main.type === 'collapse') {
    mainContent = (
      <Typography component={Link} to={document.location.pathname} variant="h6" sx={{ textDecoration: 'none' }} color="textSecondary">
        {main.title}
      </Typography>
    );
  }

  // items
  if (item && (item.type === 'item' || item.type === 'item-back')) {
    
    itemTitle = item.title;
    itemContent = (
      <Typography variant="subtitle1" color="textPrimary">
        {itemTitle}
      </Typography>
    );

    // main
    breadcrumbContent = (
      <MainCard border={false} sx={{ mb: 3, bgcolor: 'transparent' }} {...others} content={false}>
        <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={1}>
          {
            (item.breadcrumbs !== false) &&
              <Grid item>
                <MuiBreadcrumbs aria-label="breadcrumb">
                  <Typography component={Link} to="/dashboard" color="textSecondary" variant="h6" sx={{ textDecoration: 'none' }}>
                    Home
                  </Typography>
                  {mainContent}
                  {itemContent}
                </MuiBreadcrumbs>
              </Grid>
          }
          {title && (
            <Grid item sx={{ mt: item.breadcrumbs !== false ? 1 : 0 }}>
              <Stack direction={"row"} spacing={1} alignItems={"center"}>
                {
                  item.showBack && (
                    <IconButton onClick={()=>{navigate(-1)}}>
                      <ArrowLeftOutlined/>
                    </IconButton>
                  )
                }
                <Typography variant="h3">{item.subtitle ?? item.title}</Typography>
              </Stack>
            </Grid>
          )}
        </Grid>
      </MainCard>
    );
  }


  return breadcrumbContent;
};

Breadcrumbs.propTypes = {
  navigation: PropTypes.object,
  title: PropTypes.bool
};

export default Breadcrumbs;
