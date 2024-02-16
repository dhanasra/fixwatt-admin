import { PlusOutlined } from "@ant-design/icons";
import { Box, Button, IconButton, MenuItem, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StripedDataGrid } from "../../../components/grid-styled";
import { formatDate, formatTime } from "../../../utils/utils";
import { useTheme } from "@emotion/react";
import MainCard from "../../../components/MainCard";
import { approveOrder, getOrders, getServices, updateOrderStatus } from "../../../network/service";
import { ArrowLeftIcon, ArrowRightIcon } from "@mui/x-date-pickers";
import SingleSelect from "../../../components/@extended/SingleSelect";

const OrderList = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const [orders, setOrders] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [services, setServices] = useState([]);

  const [page, setPage] = useState(0);

  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await Promise.all([
          getOrders({page: page+1}),
          getServices()
        ]);
        
        setOrders(data[0].orders.data);
        setTotal(data[0].orders.total);
        setServices(data[1].services);

        const s = (page*10)+1;
        const isNextEnable = (s+9)<=data[0].orders.total ? true : false;

        setStart(s)
    
        setEnd(isNextEnable ? (s+9) : data[0].orders.total);

      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchOrders();
  }, [page]);


  const onMoveNext=async()=>{
    if((start+9)<total){
      setPage(page+1)
    }
  }

  const onMovePrev=async()=>{
    if(page>=1){
      setPage(page-1);
    }
  }

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

  const renderSingleSelectCell = (params) => (
      <SingleSelect
        
        id={`status-list-${params.value.id}`}
        handleChange={async(v)=>{
          if(v=="APPROVED" || v=="REJECTED"){
            await approveOrder({orderId: params.value.id, status: v})
          }else{
            await updateOrderStatus({orderId: params.value.id, status: v})
          }
          
        }}
        value={params.value.status}
        items={[
          <MenuItem value="APPROVED" key={"approved"} >APPROVED</MenuItem>,
          <MenuItem value="REJECTED" key={"rejected"}  >REJECTED</MenuItem>,
          <MenuItem value="CANCELLED" key={"cancelled"}  >CANCELLED</MenuItem>,
          <MenuItem value="COMPLETED" key={"completed"}  >COMPLETED</MenuItem>
        ]}
      />
  );

  const columns = [
    { field: 'service', headerName: 'Service', flex: 1, renderCell: renderTextCell },
    { field: 'address', headerName: 'Address', flex: 1, renderCell: renderTextCell },
    { field: 'date', headerName: 'Date', width: 120, renderCell: renderTextCell },
    { field: 'time', headerName: 'Time', width: 120, renderCell: renderTextCell },
    { field: 'status', headerName: 'Order Status', width: 160, renderCell: renderSingleSelectCell },
  ];

  const rows = orders.map((order) => ({
    id: order.id,
    name: order.user_id,
    service: services.find((v)=>v.id==order.service_id)?.name,
    time: formatTime(order.start_time),
    date: formatDate(new Date(order.date)),
    address: `${order.address}, ${order.pincode}`,
    status: order
  }));

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
          <Box
            sx={{position: "relative"}}
          >
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
              initialState={{ pagination: { paginationModel: { page: 0, pageSize: 10 } } }}
              // onPageSizeChange={(newPageSize) => {
              //   setPageSize(newPageSize);
              // }}
              // paginationMode="server"
              // onPageChange={handlePageChange}
              pageSize={10} 
              pageSizeOptions={[10]}
              checkboxSelection
              disableRowSelectionOnClick
              onRowSelectionModelChange={(selected) => {
                setSelectedContacts(selected);
              }}
              rowSelectionModel={selectedContacts}
            />
            <Box
              sx={{
                background:"white", 
                position: "absolute",
                bottom: 0, 
                height: 60,
                width: "100%",
                border: 1,
                borderColor: `${theme.palette.grey[200]}`,
                display: "flex",
                justifyContent: "end",
                px: "20px"
              }}
            >
             <Stack direction={"row"} alignItems={"center"}>
              <IconButton onClick={onMovePrev}>
                <ArrowLeftIcon/>
              </IconButton>
              <Typography
                sx={{mx: 1}}
              >
                {`${start} - ${end} of ${total}`}
              </Typography>
              <IconButton onClick={onMoveNext}>
                <ArrowRightIcon/>
              </IconButton>
             </Stack>
            </Box>
          </Box>
        </>
    </MainCard>
  );
};

export default OrderList;
