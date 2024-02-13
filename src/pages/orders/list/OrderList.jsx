import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Box, Button, FormControl, InputAdornment, OutlinedInput, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StripedDataGrid } from "../../../components/grid-styled";
import { formatDate, formatTime } from "../../../utils/utils";
import { useTheme } from "@emotion/react";
import MainCard from "../../../components/MainCard";
import { getOrders, getServices } from "../../../network/service";

const OrderList = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const [orders, setOrders] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await Promise.all([
          getOrders(),
          getServices()
        ]);
        console.log(data);
        setOrders(data[0].orders.data);
        setServices(data[1].services);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchOrders();
  }, []);

  const onAddOrder = () => {
    navigate("/orders/create");
  };

  // const handleSearch = async (event) => {
  //   const query = event.target.value.toLowerCase();
  //   const filtered = data.filter(
  //     (customer) =>
  //       customer.name?.toLowerCase()?.includes(query) ||
  //       customer.email?.toLowerCase()?.includes(query) ||
  //       customer.phone?.includes(query) ||
  //       customer.address?.toLowerCase()?.includes(query)
  //   );
  //   setOrders(filtered);
  // };

  const renderTextCell = (params) => (
    <Stack>
      <Typography variant="title">{params.value}</Typography>
    </Stack>
  );

  const columns = [
    { field: 'service', headerName: 'Service', flex: 1, renderCell: renderTextCell },
    { field: 'address', headerName: 'Address', flex: 1, renderCell: renderTextCell },
    { field: 'date', headerName: 'Date', width: 120, renderCell: renderTextCell },
    { field: 'time', headerName: 'Time', width: 120, renderCell: renderTextCell },
    { field: 'status', headerName: 'Order Status', width: 160, renderCell: renderTextCell },
  ];

  const rows = orders.map((order) => ({
    id: order.id,
    name: order.user_id,
    service: services.find((v)=>v.id==order.service_id)?.name,
    time: formatTime(order.start_time),
    date: formatDate(new Date(order.date)),
    address: `${order.address}, ${order.pincode}`,
    status: order.status
  })).reverse();

  return (
    <MainCard sx={{ width: '100%' }}>
        <>
          <Stack direction={'row'} spacing={2} sx={{ mb: 3 }} alignItems={"center"}>
            <Box sx={{ width: '100%' }}>
              {/* <FormControl sx={{ width: { xs: '100%', md: 300 } }}>
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
              </FormControl> */}
            </Box>
            <Box>
              <Button
                variant="outlined"
                size="medium"
                sx={{ px: 0, width: '140px' }}
                onClick={onAddOrder}
                startIcon={<PlusOutlined style={{ fontSize: '16px' }} />}
              >
                Create Order
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

export default OrderList;
