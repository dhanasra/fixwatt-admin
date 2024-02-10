import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Box, Button, FormControl, InputAdornment, OutlinedInput, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCustomers } from "../../../network/service/customerService";
import { StripedDataGrid } from "../../../components/grid-styled";
import { formatDate } from "../../../utils/utils";
import { useTheme } from "@emotion/react";
import MainCard from "../../../components/MainCard";

const TechniciansList = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const [customers, setCustomers] = useState([]);
  const [data, setData] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const customersData = await getCustomers();
        setData(customersData.customers);
        setCustomers(customersData.customers);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, []);

  const onAddCustomer = () => {
    navigate("/customer/create");
  };

  const handleSearch = async (event) => {
    const query = event.target.value.toLowerCase();
    const filtered = data.filter(
      (customer) =>
        customer.name?.toLowerCase()?.includes(query) ||
        customer.email?.toLowerCase()?.includes(query) ||
        customer.phone?.includes(query) ||
        customer.address?.toLowerCase()?.includes(query)
    );
    setCustomers(filtered);
  };

  const renderTextCell = (params) => (
    <Stack>
      <Typography variant="title">{params.value}</Typography>
    </Stack>
  );

  const columns = [
    { field: 'name', headerName: 'Name', width: 200, renderCell: renderTextCell },
    { field: 'phone', headerName: 'Phone number', width: 180, renderCell: renderTextCell },
    { field: 'email', headerName: 'Email Address', width: 180, renderCell: renderTextCell },
    { field: 'address', headerName: 'Address', flex: 1, renderCell: renderTextCell },
    { field: 'created', headerName: 'Created', width: 120, renderCell: renderTextCell }
  ];

  const rows = customers.map((customer) => ({
    id: customer.id,
    name: customer.name,
    phone: customer.phone,
    email: customer.email,
    address: customer.address,
    created: formatDate(customer.created_at)
  }));

  return (
    <MainCard sx={{ width: '100%' }}>
      <>
        <Stack direction={'row'} spacing={2} sx={{ mb: 3 }} alignItems={"center"}>
          <Box sx={{ width: '100%' }}>
            <FormControl sx={{ width: { xs: '100%', md: 300 } }}>
              <OutlinedInput
                id="header-search"
                startAdornment={
                  <InputAdornment position="start" sx={{ mr: -0.5 }}>
                    <SearchOutlined />
                  </InputAdornment>
                }
                onChange={handleSearch}
                placeholder="Search by name, email or phone number"
                aria-describedby="header-search-text"
                inputProps={{
                  'aria-label': 'weight'
                }}
              />
            </FormControl>
          </Box>
          <Box>
            <Button
              variant="outlined"
              size="medium"
              sx={{ px: 0, width: '140px' }}
              onClick={onAddCustomer}
              startIcon={<PlusOutlined style={{ fontSize: '16px' }} />}
            >
              Add Technician
            </Button>
          </Box>
        </Stack>
        <StripedDataGrid
          rows={rows}
          columns={columns}
          getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd')}
          sx={{
            '& .MuiDataGrid-columnHeader': { fontSize: '15px', fontWeight: '900' },
            '& .MuiDataGrid-cell': { fontSize: '14px' },
            border: 1,
            borderColor: `${theme.palette.grey[200]}`
          }}
          initialState={{ pagination: { paginationModel: { page: 0, pageSize: 5 } } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          disableRowSelectionOnClick
          onRowSelectionModelChange={(selected) => {
            setSelectedContacts(selected);
          }}
          rowSelectionModel={selectedContacts}
        />
      </>
    </MainCard>
  );
};

export default TechniciansList;
