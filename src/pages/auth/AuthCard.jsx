import PropTypes from 'prop-types';

// material-ui
import { Box, Typography } from '@mui/material';

// project import
import MainCard from "../../components/MainCard";
import logo from '../../assets/app-logo.png';

const AuthCard =({children, ...other})=>(
    <MainCard
        sx={{
            maxWidth: { xs: 400, lg: 475 },
            margin: { xs: 2.5, md: 3 },
            '& > *': {
            flexGrow: 1,
            flexBasis: '50%'
            }
        }}
        content={false}
        {...other}
        border={false}
        boxShadow
    >
        <center style={{marginTop: '16px'}}>
            <Box component={'img'} src={logo} />
            <Typography variant="body1" sx={{color: "#AFAFAF"}}>Manage all your services & orders</Typography>
        </center>
        <Box sx={{ p: { xs: 2, sm: 3, md: 4, xl: 5 } }}>{children}</Box>
    </MainCard>
)

AuthCard.propTypes = {
    children: PropTypes.node
};

export default AuthCard;