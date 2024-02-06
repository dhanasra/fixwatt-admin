import { Grid } from "@mui/material";
import AuthCard from "./AuthCard";

const AuthWrapper = ({ children }) => (
  <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: { xs: 'calc(100vh - 134px)', md: 'calc(100vh - 112px)' } }}>
    <Grid item>
      <AuthCard>{children}</AuthCard>
    </Grid>
  </Grid>
);

export default AuthWrapper;
