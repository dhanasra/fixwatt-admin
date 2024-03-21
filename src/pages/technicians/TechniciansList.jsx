import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Avatar, Box, Button, Chip, FormControl, IconButton, InputAdornment, OutlinedInput, Stack, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { StripedDataGrid } from "../../components/grid-styled";
import { useTheme } from "@emotion/react";
import MainCard from "../../components/MainCard";
import CreateTechnicianDrawer from "./CreateTechnicianDrawer";
import { deleteTechnician, getCategories, getTechnicians } from "../../network/service";
import ConfirmDialog from "../../components/dialogs/ConfirmDialog";

const TechniciansList = () => {
  const theme = useTheme();

  const [categories, setCategories] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);

  const [openDelete, setOpenDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);


  const [technicians, setTechnicians] = useState([]);
  const [technicianEdit, setTechnicianEdit] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await Promise.all([
          getCategories(),
          getTechnicians()
        ]);
        setCategories(data[0].categories);
        setTechnicians(data[1].technicians)
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, []);

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

  const handleDeleteClick = async()=>{
    await deleteTechnician(deleteId);
    const updated = technicians.filter((i)=>i.id!=deleteId);
    setTechnicians(updated)
    setOpenDelete(false);
  }

  const renderTextCell = (params) => (
    <Stack>
      <Typography variant="title">{params.value}</Typography>
    </Stack>
  );

  const renderChipsCell = (params) => {

    let items = params.value?.split?.(',').map((categoryId) => {
      const category = categories.find((cat) => cat.id == categoryId);
      return category ? category.name : null;
    });
    items = items?.filter(Boolean).join(', ');
    return (
      <Stack>
        <Typography variant="title" sx={{textOverflow: "ellipsis"}}>{items}</Typography>
      </Stack>
    )
  };

  const renderImageCell = (params) => (
    <Stack>
      <Avatar alt="picture" src={params.value??''} sx={{ width: 32, height: 32 }} />
    </Stack>
  );


  const renderActionsCell = (params) => (
    <Stack direction={"row"} spacing={2}>
      <Tooltip title="Edit">
      <IconButton sx={{background: "#efefef"}} onClick={
        ()=>{
          const technician = technicians.find((i)=>i.id===params.value);
          setTechnicianEdit(technician);
          setOpenDrawer(true);
        }}
      >
        <EditOutlined />
      </IconButton>
      </Tooltip>
      <Tooltip title="Make Inactive">
      <IconButton sx={{background: "#efefef"}} onClick={
        ()=>{
          setOpenDelete(true);
          setDeleteId(params.value)
        }}
      >
        <DeleteOutlined/>
      </IconButton>
      </Tooltip>
    </Stack>
  );


  const columns = [
    { field: 'picture', headerName: 'Picture', width: 80, renderCell: renderImageCell },
    { field: 'name', headerName: 'Name', flex: 1, renderCell: renderTextCell },
    { field: 'category_id', headerName: 'Category', flex: 1, renderCell: renderChipsCell },
    { field: 'area', headerName: 'Area', flex: 1, renderCell: renderTextCell },
    { field: 'pincode', headerName: 'Pincode', width: 130, renderCell: renderTextCell },
    { field: 'phone', headerName: 'Phone number', width: 130, renderCell: renderTextCell },
    { field: 'id', headerName: 'actions', width: 180, renderCell: renderActionsCell }
  ];

  return (
    <>
    <CreateTechnicianDrawer
      open={openDrawer} 
      onClose={()=>{
        setOpenDrawer(false);
      }} 
      technician={technicianEdit}
      categories={categories}
      onEdit={(v)=>{
        const updated = technicians.map((s)=>{
          if(s.id==v.id){
            return v;
          }
          return s
        })
        setTechnicians(updated);
        setOpenDrawer(false);
      }}
      onSave={(v)=>{
        setTechnicians([...technicians, v])
        setOpenDrawer(false);
      }}
    />
    <ConfirmDialog
      open={openDelete} 
      onOk={handleDeleteClick} 
      onCancel={()=>{
        setDeleteId(null)
        setOpenDelete(false)
      }} 
      btnTxt={"Delete"}
      title={"Are you sure you want to delete?"}   
      content={`By deleting this technician, hereafter you can not appoint any order to this technician.`}
    />
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
              onClick={()=>setOpenDrawer(true)}
              startIcon={<PlusOutlined style={{ fontSize: '16px' }} />}
            >
              Add Technician
            </Button>
          </Box>
        </Stack>
        <StripedDataGrid
          rows={technicians}
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
        />
      </>
    </MainCard>
    </>
  );
};

export default TechniciansList;
