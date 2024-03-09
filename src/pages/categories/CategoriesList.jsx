import { Box, Button, Divider, Grid, Stack, Typography } from "@mui/material";
import MainCard from "../../components/MainCard";
import { deleteCategory, getCategories } from "../../network/service";
import { useEffect, useState } from "react";
import OptionsMenu from "./OptionsMenu";
import ConfirmDialog from "../../components/dialogs/ConfirmDialog";
import CreateCategoryDrawer from "./CreateCategoryDrawer";
import { PlusOutlined } from "@ant-design/icons";

const CategoriesList = ()=>{

  const [openCreate, setOpenCreate] = useState(false); 
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [categories, setCategories] = useState([]);
  const [categoryEdit, setCategoryEdit] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCategories();
        setCategories(data.categories);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchData();
  }, []);
  
  const handleClick = (id, category)=>{
    if(id=="edit"){
      setCategoryEdit(category);
      setOpenCreate(true);
    }else if(id=="delete"){ 
      setDeleteId(category.id);
      setOpenDelete(true);
    }
  }

  const handleDeleteClick = async()=>{
    await deleteCategory(deleteId);
    const updated = categories.filter((i)=>i.id!=deleteId);
    setCategories(updated)
    setOpenDelete(false);
  }

  return (
    <Box>
      <CreateCategoryDrawer
        open={openCreate} 
        onClose={()=>{
          setOpenCreate(false);
          setCategoryEdit(null);
        }} 
        category={categoryEdit}
        onEdit={(v)=>{
          // const updated = services.map((s)=>{
          //   if(s.id==v.id){
          //     return v;
          //   }
          //   return s
          // })
          // setServices(updated);
          // setOpenCreate(false);
        }}
        onSave={(v)=>{
          // setServices([...services, v])
          // setOpenCreate(false);
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
      <Grid container spacing={2}>
        {
          categories?.map((cat)=>{
            return (
              <Grid item xs={12} sm={6} md={3} xl={2} key={cat.id}>
                <MainCard
                  headerBorder
                  title={<Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                    <Typography variant="h5" sx={{fontWeight: 500}}>{cat.name}</Typography>
                    <OptionsMenu onClick={handleClick} category={cat}/>
                  </Stack>}
                >
                  <Box component={'img'} src={cat.image} width={"100%"} height={"200px"} style={{ objectFit: 'cover' }}/>
                </MainCard>
              </Grid>
            )
          })
        }
        <Grid item xs={12} sx={{my: 2}}>
          <Divider/>
        </Grid>
        <Grid item xs={12} >
          <Box sx={{justifyContent: 'end', width: "100%", alignItems: "end", textAlign: "end"}}>
            <Button
              variant="contained"
              size="medium"
              sx={{ }}
              onClick={()=>setOpenCreate(true)}
              startIcon={<PlusOutlined style={{ fontSize: '16px' }} />}
            >
              Create Category
            </Button>
          </Box>
        </Grid>
      </Grid>

    </Box>
  )
}

export default CategoriesList;