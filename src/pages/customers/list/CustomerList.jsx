import { PlusOutlined } from '@ant-design/icons';
import { Button, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CustomerList =()=>{

    const navigate = useNavigate();

    const onAddCustomer =()=>{
        navigate('/customer');
    }

    return (
        <Grid container rowSpacing={2.5} columnSpacing={2.75}>
            <Grid item xs={8}>
                <Typography variant="h3">My Customers</Typography>
            </Grid>
            <Grid item xs={4} justifyContent={"end"} display={"flex"}>
                <Button
                    variant="contained" size="medium" sx={{px: 4}}
                    onClick={onAddCustomer}
                    startIcon={
                      <PlusOutlined style={{fontSize: "16px"}}/>
                    }
                >
                    Add Customer
                </Button>
            </Grid>
        </Grid>
    )
}

export default CustomerList;