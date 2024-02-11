import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Box, Button, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import MainCard from "../../components/MainCard";
import { deleteService, getCategories, getServices } from "../../network/service";
import { StripedDataGrid } from "../../components/grid-styled";
import CreateServiceDrawer from "./CreateServiceDrawer";
import ConfirmDialog from "../../components/dialogs/ConfirmDialog";

const ServicesList = () => {
  const theme = useTheme();

  const [openCreate, setOpenCreate] = useState(false); 
  const [openDelete, setOpenDelete] = useState(false);

  const [deleteId, setDeleteId] = useState(null);

  const [services, setServices] = useState([]);
  const [serviceEdit, setServiceEdit] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await Promise.all([
          getServices(),
          getCategories()
        ]);
        setServices(data[0].services);
        setCategories(data[1].categories);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchServices();
  }, []);

  const renderTextCell = (params) => (
    <Stack>
      <Typography variant="title">{params.value}</Typography>
    </Stack>
  );

  const handleDeleteClick = async()=>{
    await deleteService(deleteId);
    const updated = services.filter((i)=>i.id!=deleteId);
    setServices(updated)
    setOpenDelete(false);
  }

  const renderActionsCell = (params) => (
    <Stack direction={"row"} spacing={2}>
      <Tooltip title="Edit">
      <IconButton sx={{background: "#efefef"}} onClick={
        ()=>{
          const service = services.find((i)=>i.id===params.value);
          setServiceEdit(service);
          setOpenCreate(true);
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
    { field: 'name', headerName: 'Name', flex: 1, renderCell: renderTextCell },
    { field: 'category_name', headerName: 'Category', flex: 1, renderCell: renderTextCell },
    { field: 'price', headerName: 'Price', width: 180, renderCell: renderTextCell },
    { field: 'id', headerName: 'actions', width: 180, renderCell: renderActionsCell },
  ];

  return (
    <>
    <CreateServiceDrawer 
      open={openCreate} 
      onClose={()=>{
        setOpenCreate(false);
        setServiceEdit(null);
      }} 
      categories={categories}
      service={serviceEdit}
      onEdit={(v)=>{
        const updated = services.map((s)=>{
          if(s.id==v.id){
            return v;
          }
          return s
        })
        setServices(updated);
        setOpenCreate(false);
      }}
      onSave={(v)=>{
        setServices([...services, v])
        setOpenCreate(false);
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
      content={`By deleting this category, hereafter no orders can create in this category.`}
    />
    <MainCard sx={{ width: '100%' }}>
        <>
          <Stack direction={"row-reverse"} spacing={2} sx={{ mb: 3 }} alignItems={"center"}>
            <Box>
              <Button
                variant="outlined"
                size="medium"
                sx={{ px: 0, width: '140px' }}
                onClick={()=>setOpenCreate(true)}
                startIcon={<PlusOutlined style={{ fontSize: '16px' }} />}
              >
                Create Service
              </Button>
            </Box>
          </Stack>
          <StripedDataGrid
            rows={services}
            columns={columns}
            getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd')}
            sx={{
              '& .MuiDataGrid-columnHeader': { fontSize: '15px', fontWeight: '900' },
              '& .MuiDataGrid-cell': { fontSize: '14px' },
              border: 1,
              borderColor: `${theme.palette.grey[200]}`
            }}
            initialState={{ pagination: { paginationModel: { page: 0, pageSize: 10 } } }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </>
    </MainCard>
    </>
  );
};

export default ServicesList;
