import React, { useState, useRef,useEffect} from "react";
import { Stack, Avatar, Button, Grid } from "@mui/material";
import BasicModal from "./modal";
import ReactCrop, { getCroppedCanvas } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
const Profile = () => {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState();
  const [src, setSrc] = useState(null);
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState()
  const [output, setOutput] = useState(null);
  const imgRef = useRef(null)


  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSrc(URL.createObjectURL(event.target.files[0]));
      const reader = new FileReader()
      reader.readAsDataURL(event.target.files[0]);
      console.log(reader.result)
      reader.addEventListener('load', (e) => {
        const data = e.target.result;
        setImage(data)
      })
      
    }
  };
  useEffect(() => {
    console.log("image");
  }, [output]);
  console.log('completedCrop', getCroppedCanvas)
//   const openImgEditor = () => {
//     if (imgRef.current && completedCrop) {
//       setCompletedCrop(crop); // Set the new value of the crop state
//       const canvas = getCroppedCanvas(imgRef.current, completedCrop);
//       canvas.toBlob(blob => {
//         setImage(URL.createObjectURL(blob));
//         setOpen(false);
//       });
//     }
//   };
const canv = () => {
    if (crop) {
      const canvas = document.createElement("canvas");
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext("2d");

      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );

      canvas.toBlob((blob) => {
        // const newImg = document.createElement("img");
        const url = URL.createObjectURL(blob);
        console.log('url', url)
        // newImg.onload = () => {
        //   // no longer need to read the blob so it's revoked
        //   URL.revokeObjectURL(url);
        // };
      
        // newImg.src = url;
        // document.body.appendChild(newImg);
      });
      return;
      const pixelRatio = window.devicePixelRatio;
      canvas.width = crop.width * pixelRatio;
      canvas.height = crop.height * pixelRatio;
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      ctx.imageSmoothingQuality = "high";
  
      // Load the image using the HTMLImageElement constructor
      const img = new Image();
      img.src = image
      console.log(img)
      img.onload = () => {
        ctx.drawImage(
          img,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          crop.width,
          crop.height
        );
        
        const base64Image = canvas.toDataURL("image/jpeg");
  
        // Add load event listener to ensure image has loaded before setting output
        const outputImage = new Image();
        outputImage.onload = () => {
          setOutput(base64Image);
        };
        outputImage.src = base64Image;
      };
      img.src = image;
    }
    console.log("outtt", output);
    console.log("crop",crop);
    setOpen(false);
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
                <ReactCrop
                    crop={crop}
                    onChange={(percentCrop) => setCrop(percentCrop)}
                    onComplete={(c) => setCompletedCrop(c)}
        >
          <img
            src={src}

          />
        </ReactCrop>
       
                </Grid>
                
             
              
            
            <Grid item md={6}>
              <button onClick={() => setOpen(false)}>Cancel</button>
            </Grid>
            <Grid item md={6}>
              <button onClick={canv}>sabt</button>
            </Grid>
          </Grid>
        </BasicModal>
      </Stack>
    </>
  );
};

export default Profile;
