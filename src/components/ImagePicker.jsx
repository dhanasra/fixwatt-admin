import React, { useState } from "react";
import Button from "@mui/material/Button";
import ImageUpload from "./ImageUpload";
import axiosClient from "../network/axiosClient";
import { Box, CircularProgress, IconButton, Skeleton, Stack } from "@mui/material";
import { CloseOutlined } from "@ant-design/icons";
import { useTheme } from "@emotion/react";

function ImagePicker({tag, onChange, icon, value, type}) {

  const theme = useTheme();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(value);
  // const [loading, setLoading] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        handleOpen();
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const  handleUpload = async(type, blob, isDelete) => {
    if(blob){
      // const imageUrl = URL.createObjectURL(blob);
      handleClose();
      // setLoading(true);
      // const uploaded = await onUpload(blob, selectedImage);
      // console.log(blob)
      // setLoading(false);
      // setCroppedImage(uploaded);
      setCroppedImage(selectedImage);
      onChange(blob)
    }
  };

  const pickImage = ()=>{
    document.getElementById(`${tag}-raised-button-file`).click();
  }

  const removeImage =()=>{
    setCroppedImage(null);
    onChange(null);
  }

  return (
    <div>
      <Box
        sx={{
          cursor: "pointer",
          width: type=="rect" ? 230 : 130,
          height: 130,
          position: "relative",
          border: `1px solid ${theme.palette.grey[300]}`,
          borderRadius: "3px"
        }}
      >
        {/* {
          loading && <Skeleton animation="wave" variant="rectangular" width={126} height={126} sx={{m: "1px"}}/>
        } */}
        {
          croppedImage && <>
            <Box
              onClick={pickImage}
              sx={{
                
                width: "100%",
                height: "100%",
                borderRadius: "3px",
                background: `url(${croppedImage}) center/cover`,
              }}
            />
            <IconButton 
              sx={{
                position: "absolute", 
                top: 0, 
                right: 0
              }} onClick={removeImage}>
              <CloseOutlined style={{color: "#000000"}}/> 
            </IconButton>
          </>
        }

        {
          !croppedImage && <Stack spacing={2} p={2} justifyContent={"center"} height={"100%"}>
            {icon}
            <Button variant="contained" onClick={pickImage}>
              Upload
            </Button>
          </Stack>
        }
      </Box>
      <input
        style={{ display: "none" }}
        id={`${tag}-raised-button-file`}
        onChange={handleImageChange}
        type="file"
        accept=".jpg,.png,.jpeg,.webpp"
      />
      {isOpen && (
        <ImageUpload
          isOpen={isOpen}
          handleClose={handleClose}
          aspectRatio={ type=="rect" ? 2 : 1}
          type="cover" 
          title="Crop Image"
          isPreview={false}
          selectedImage={selectedImage}
          handleUpload={handleUpload}
          changeImage={handleImageChange}
        />
      )}
    </div>
  );
}

export default ImagePicker;
