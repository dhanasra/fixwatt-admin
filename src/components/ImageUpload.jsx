import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormHelperText from "@mui/material/FormHelperText";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import "cropperjs/dist/cropper.css";
import Cropper from "react-cropper";
import { CloseCircleOutlined } from "@ant-design/icons";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(0),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseCircleOutlined />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

const messageContent = {
  logo: {
    deletemessage: "Delete_Logo_Message",
    title: "Delete_Logo",
  },
  cover: {
    deletemessage: "Delete_Cover_Message",
    title: "Delete_Cover",
  },
};

function ImageUpload({
  isOpen,
  handleClose,
  aspectRatio,
  type,
  title,
  isPreview,
  selectedImage,
  handleUpload,
  changeImage,
}) {
  //   const { t } = useTranslation();
  const [image, setImage] = useState();
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState();
  const [openConfirm, setConfirm] = React.useState(false);
  const openConfirmBox = () => {
    setConfirm(true);
  };
  useEffect(() => {
    setImage(selectedImage);
  }, [selectedImage]);

  const handleAction = (isDelete) => {
    setConfirm(false);
    if (isDelete) {
      handleUpload(type, "", true);
    }
  };

  const applyPhoto = () => {
    if (typeof cropper !== "undefined") {
      cropper.getCroppedCanvas().toBlob((blob) => {
        handleUpload(type, blob);
      }, "image/jpeg");
    }
  };

  return (
    <BootstrapDialog
      fullWidth={true}
      maxWidth={"md"}
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={isOpen}
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        {title}
      </BootstrapDialogTitle>

      <DialogContent dividers sx={{ p: 0 }}>
        <Box
          noValidate
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "0",
            margin: "0",
            m: "auto",
            p: 0,
          }}
        >
          <div style={{ width: "100%" }}>
            {isPreview && (
              <div className="preview_holder">
                <img
                  src={selectedImage}
                  alt="selectedImage"
                  className={`preview ${type}`}
                />
              </div>
            )}
            {!isPreview && (
              <div>
                <Cropper
                  style={{ height: 400, width: "100%" }}
                  zoomTo={0}
                  aspectRatio={aspectRatio}
                  preview=".img-preview"
                  src={image}
                  viewMode={1}
                  minCropBoxHeight={10}
                  minCropBoxWidth={10}
                  background={false}
                  responsive={true}
                  autoCropArea={1}
                  checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                  onInitialized={(instance) => {
                    setCropper(instance);
                  }}
                  guides={true}
                />
              </div>
            )}
          </div>
          <Dialog
            maxWidth="xs"
            open={openConfirm}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title">
              {messageContent[type]?.title}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                {messageContent[type]?.deletemessage}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => handleAction(false)}>{"Cancel"}</Button>
              <Button color="error" onClick={() => handleAction(true)}>
                {"Yes Delete It"}
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </DialogContent>
      <DialogActions>
        <Grid container gap={2} justifyContent="center">
          {!isPreview && (
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              display="flex"
              justifyContent="center"
            >
              <FormHelperText sx={{ fontSize: "1.4rem" }}>
                Use Your Mouse Wheel Trackpad Pinch To Zoom
              </FormHelperText>
            </Grid>
          )}

          <Grid item>
            <input
              style={{ display: "none" }}
              id="raised-button-file"
              onChange={changeImage}
              type="file"
              accept=".jpg,.png,.jpeg,.webpp"
            />
            <label htmlFor="raised-button-file">
              <Button sx={{ mx: 1 }} variant="outlined" component="span">
                {"Change Photo"}
              </Button>
            </label>
          </Grid>
          {!isPreview && (
            <Grid item>
              <Button sx={{ mx: 1 }} variant="contained" onClick={applyPhoto}>
                {"Apply"}
              </Button>
            </Grid>
          )}
        </Grid>
      </DialogActions>
    </BootstrapDialog>
  );
}

export default ImageUpload;