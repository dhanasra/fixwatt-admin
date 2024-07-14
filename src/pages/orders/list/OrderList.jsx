import { ChromeOutlined, ExportOutlined, FilterOutlined, MobileFilled, MobileOutlined, PlusOutlined, SearchOutlined, ToolOutlined } from "@ant-design/icons";
import { Box, Button, FormControl, IconButton, InputAdornment, MenuItem, OutlinedInput, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StripedDataGrid } from "../../../components/grid-styled";
import { exportData, formatDate, formatTime } from "../../../utils/utils";
import { useTheme } from "@emotion/react";
import MainCard from "../../../components/MainCard";
import { approveOrder, getOrders, getServices, searchOrders, updateOrderStatus } from "../../../network/service";
import { ArrowLeftIcon, ArrowRightIcon } from "@mui/x-date-pickers";
import SingleSelect from "../../../components/@extended/SingleSelect";
import OptionsMenu from "./OptionsMenu";
import { BsBrowserChrome } from "react-icons/bs";

const OrderList = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const [searching, setSearching] = useState(false);

  const [orders, setOrders] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [services, setServices] = useState([]);

  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');

  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if(page!=-1 && !searching){
          console.log('hello')
          const data = await Promise.all([
            getOrders({page: page+1, filter: filter}),
            getServices()
          ]);
          
          setOrders(data[0].orders.data);
          setTotal(data[0].orders.total);
          setServices(data[1].services);

          const s = (page*10)+1;
          const isNextEnable = (s+9)<=data[0].orders.total ? true : false;

          setStart(s)
      
          setEnd(isNextEnable ? (s+9) : data[0].orders.total);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [page, filter]);

  useEffect(() => {
    handleSearch(serviceFilter);
  }, [serviceFilter]);

  const handleFilter = (e)=>{
    setFilter(e);
    setPage(0);
  }

  const handleServiceFilter = (e)=>{
    setServiceFilter(e);
  }

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

  const handleSearch = async (event) => {

    if(event?.target?.value || serviceFilter){

      console.log(serviceFilter)

      setSearching(true);
      setPage(0);
      const res = await searchOrders({page: page+1, filter: filter, searchTerm: event?.target?.value??'', service: serviceFilter});

      const orders = res.orders;
      setOrders(orders.data);
      setTotal(orders.total);

      const s = (page*10)+1;
      const isNextEnable = (s+9)<= orders.total ? true : false;

      setStart(s)
  
      setEnd(isNextEnable ? (s+9) : orders.total);
    }else{
      console.log('error')
      setSearching(false);
      setPage(0);
    }
  };

  const renderTextCell = (params) => (
    <Stack>
      <Typography variant="title">{params.value}</Typography>
    </Stack>
  );

  const renderOptionsCell = (params) => (
    <OptionsMenu order={params.value}/>
  );

  const renderIconCell = (params) => (
    <Stack marginLeft={"6px"}>
      {
        (params.value == 'mobile')
        ? <MobileOutlined style={{fontSize: "20px"}}/>
        : <ChromeOutlined style={{fontSize: "20px"}}/> 
      }  
    </Stack> 
  );

  const onExport = async() => {

    const resp = await getOrders({page: 1, limit: total, filter: 'all'})
    const data = resp.orders.data;
    const formatted = data.map((d)=>{
      return {
        username: d.user.name,
        phone: d.user.phone,
        email: d.user.email,
        address: d.address,
        start_time: d.start_time,
        end_time: d.end_time,
        date: d.date,
        invoice_id: d.invoice_id,
        service_description: d.service_description,
        quantity: d.quantity,
        price: d.price,
        subtotal: d.subtotal,
        additional_charges: d.additional_charges,
        total: d.total,
        payment_received_from_customer: d.payment_received_from_customer,
        payment_received_by: d.payment_received_by,
        status: d.status,
        notes: d.notes,
        service_name: d.service.name,
        category_name: d.service.category_name,
      }

    })

    exportData(formatted, "orders")
  };

  const renderSingleSelectCell = (params) => {
      return <SingleSelect
        id={`status-list-${params.value.id}`}
        handleChange={async(v)=>{
          let order;
          if(v=="APPROVED"){
            const data = await approveOrder({orderId: params.value.id, status: v})
            order = data.order;
          }else{
            const data = await updateOrderStatus({orderId: params.value.id, status: v})
            order = data.order;
          }
          if(order){
            const updatedList = orders.map(item =>{
              return item.id === order.id ? { ...item, status: v } : item
            });
            setOrders([...updatedList]);
          }
        }}
        value={params.value.status}
        items={[
          <MenuItem value="PENDING" key={"pending"} disabled>PENDING</MenuItem>,
          <MenuItem value="APPROVED" key={"approved"} >APPROVED</MenuItem>,
          <MenuItem value="REJECTED" key={"rejected"}  >ON GOING</MenuItem>,
          <MenuItem value="CANCELLED" key={"cancelled"}  >CANCELLED</MenuItem>,
          <MenuItem value="COMPLETED" key={"completed"}  >COMPLETED</MenuItem>
        ]}
      />
  };

  const columns = [
    { field: 'customer', headerName: 'Customer', width: 160, renderCell: renderTextCell },
    { field: 'phone', headerName: 'Phone Number', width: 160, renderCell: renderTextCell },
    { field: 'service', headerName: 'Service', flex: 1, renderCell: renderTextCell },
    // { field: 'address', headerName: 'Address', flex: 1, renderCell: renderTextCell },
    { field: 'date', headerName: 'Date', width: 120, renderCell: renderTextCell },
    { field: 'time', headerName: 'Time', width: 120, renderCell: renderTextCell },
    { field: 'status', headerName: 'Order Status', width: 160, renderCell: renderSingleSelectCell },
    { field: 'env', headerName: 'Env', width: 60, renderCell: renderIconCell },
    { field: 'order', headerName: '', width: 60, renderCell: renderOptionsCell },
  ];

  const rows = orders.map((order) => {
    return {
      id: order.id,
      order: order,
      name: order.user_id,
      service: services.find((v)=>v.id==order.service_id)?.name,
      customer: order.user.name,
      phone: order.user.phone,
      time: formatTime(order.start_time),
      date: formatDate(new Date(order.date)),
      address: `${order.address}, ${order.pincode}`,
      status: order,
      env: order.env
    }
  });

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
                  placeholder="Search by name or phone number"
                  aria-describedby="header-search-text"
                  inputProps={{
                    'aria-label': 'weight'
                  }}
                />
              </FormControl>
            </Box>
            <Box sx={{width: "210px"}}>
              <SingleSelect
                start={
                  <ToolOutlined/>
                }
                handleChange={(e)=>handleServiceFilter(e)}
                value={serviceFilter}
                items={[
                  <MenuItem value={''}>All</MenuItem>,
                  ...services.map((e)=>{
                    return <MenuItem value={e.id}>{e.name}</MenuItem>
                  })
                ]}
              />
            </Box>
            <Box sx={{width: "210px"}}>
              <SingleSelect
                start={
                  <FilterOutlined/>
                }
                handleChange={(e)=>handleFilter(e)}
                value={filter}
                items={[
                  <MenuItem value={''}>All</MenuItem>,
                  <MenuItem value={'pending'}>Pending</MenuItem>,
                  <MenuItem value={'approved'}>Approved</MenuItem>,
                  <MenuItem value={'rejected'}>On Going</MenuItem>,
                  <MenuItem value={'cancelled'}>Cancelled</MenuItem>,
                  <MenuItem value={'completed'}>Completed</MenuItem>
                ]}
              />
            </Box>
            <Stack direction={"row"} spacing={2}>
              <Button
                  variant="outlined"
                  size="medium"
                  sx={{ px: 0, width: '140px' }}
                  onClick={onExport}
                  startIcon={<ExportOutlined style={{ fontSize: '16px' }} />}
                >
                Export
              </Button>
              <Button
                variant="outlined"
                size="medium"
                sx={{ px: 0, py: 0.9, width: '140px' }}
                onClick={onAddOrder}
                startIcon={<PlusOutlined style={{ fontSize: '16px' }} />}
              >
                Create Order
              </Button>
            </Stack>
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
