import React, { useState, useRef, useContext } from 'react';
import { Card, Grid, Avatar, Button,CardContent,Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import { toast } from 'react-toastify';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import QrScanner from 'qr-scanner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from '../../context/productProvider';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const FileScan = () => {
  const{isUser,setIsUser}=useContext(ProductContext)

  const [file, setFile] = useState();
  const fileRef = useRef();
  const navigate = useNavigate();

  const handleClick = () => {
    fileRef.current.click();
  };

  const handleChange = async (e) => {
    const file = e.target.files[0];
    setFile(file);

    const imageUrl = URL.createObjectURL(file);

    const id = await QrScanner.scanImage(file);


    try {
      const user=JSON.parse(localStorage.getItem('userInfo'))
      if(!isUser || !user){
        toast('Log In First !', {
          theme: 'light',
          type: "error",
          autoClose: 1000,
          position: "top-center",
      });
        return 

      }
         const config = { headers: { Authorization: `Bearer ${user.token}` } }
      const { data } = await axios.post(
        "http://localhost:8080/product/dispatch",
        { productId: id },
      config
      );
     
      navigate("/");
    } catch (error) {
      toast('Already dispatch or Something Wrong  !', {
        theme: 'light',
        type: "error",
        autoClose: 1000,
        position: "top-center",
    });
    return
    }
  };

  return (


    <Card variant="outlined" sx={{ height: '400px', width: '75%', display: "flex", alignItems: "center", justifyContent: "center", flexDirection: 'column' }}>
    <CardContent>
      <Box sx={{ mt: 2 }}>
      <Avatar sx={{ bgcolor: 'grey', height: '200px', width: '200px', marginTop: '50px', '& img': { width: '100%', height: '100%', objectFit: 'cover' } }} variant="square">
          {file && <img src={URL.createObjectURL(file)} alt="" />}
        </Avatar>
        <Button
      component="label"
      variant="contained"
      startIcon={<CloudUploadIcon />}
      sx={{ mt: 2, width: '100%' }} 
    >
      Upload QR
      <VisuallyHiddenInput
        type="file"
        fullWidth
        ref={fileRef}
        onChange={handleChange}
      />
    </Button>
      </Box>
    </CardContent>
  </Card>
  
  )
}

export default FileScan;
