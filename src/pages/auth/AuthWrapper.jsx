import PropTypes from 'prop-types';

import { Box, Grid } from "@mui/material";
import AuthCard from "./AuthCard";
import logo from '../../assets/app-logo.png';

const AuthWrapper =({children})=>(
    <Grid container>
        {/* <Grid item xs={12} sx={{ ml: 3, mt: 1 }}>
            <Box component={'img'} src={logo} />
        </Grid> */}
        <Grid item xs={12}>
            <Grid
                item
                xs={12}
                container
                justifyContent="center"
                alignItems="center"
                sx={{ minHeight: { xs: 'calc(100vh - 134px)', md: 'calc(100vh - 112px)' } }}
            >
            <Grid item>
                <AuthCard>{children}</AuthCard>
            </Grid>
            </Grid>
        </Grid>
    </Grid>
)

AuthWrapper.propTypes = {
    children: PropTypes.node
};

export default AuthWrapper;