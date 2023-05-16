import React, { useState, useRef,useEffect} from "react";
import { Stack, Avatar, Button, Grid } from "@mui/material";
import BasicModal from "./modal";
// import ReactCrop, { getCroppedCanvas } from 'react-image-crop';
// import 'react-image-crop/dist/ReactCrop.css';
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState();
  const [src, setSrc] = useState(null);
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState()
  const [output, setOutput] = useState(null);
  const imgRef = useRef(null)
  const cropperRef = useRef(null);

  const onCrop = () => {
    const cropper = cropperRef.current?.cropper;
    console.log(cropper.getCroppedCanvas().toDataURL());
    setOutput(cropper.getCroppedCanvas().toDataURL())
  };
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSrc(URL.createObjectURL(event.target.files[0]));
    }
  };
 
  const openImgEditor = () => {
   
    setOpen(false)
  };

  return (
    <>
      <Stack
        spacing={4}
        alignItems="center"
        sx={{
          justifyContent: "center",
          minWidth: "300px",
          minHeight: "300px",
          backgroundColor: "#fff",
          borderRadius: 5,
        }}
      >
        <Avatar
          sx={{
            width: 100,
            height: 100,
          }}
          src={output}
        ></Avatar>
        <Button
          onClick={() => setOpen(true)}
          variant="contained"
          component="label"
          sx={{ backgroundColor: "#00b0e4" }}
        >
          آپلود عکس
        </Button>
        <BasicModal isOpen={open} onClose={() => setOpen(false)}>
          <Grid justifyContent="center" alignItems='center' container>
            <Grid item md={12}>
              <Button component='label' fullWidth sx={{border:'1px dashed gray'}}>
                choose file
                <input type="file" hidden onChange={onImageChange} />
                </Button>
                </Grid>
                <Grid item md={12}>
                
         <Cropper
            src={src}
            style={{ height: 400, width: "100%" }}
            // Cropper.js options
            initialAspectRatio={16 / 9}
            guides={false}
            crop={onCrop}
            ref={cropperRef}
    />
        
                </Grid>
                
            <Grid item md={6}>
              <button onClick={() => setOpen(false)}>Cancel</button>
            </Grid>
            <Grid item md={6}>
              <button onClick={openImgEditor}>sabt</button>
            </Grid>
          </Grid>
        </BasicModal>
      </Stack>
    </>
  );
};

export default Profile;
