import React, { useContext, useRef, useState } from 'react';
import QrScanner from 'qr-scanner';
import {Button,Grid,Card,CardContent,Box} from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
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

const WebScan = () => {
  const{isUser,setIsUser}=useContext(ProductContext)
  const hasCall = useRef(false);
  const [isStart, setisStart] = useState(false);
  const videoRef = useRef(null);
  const navigate=useNavigate();
  let qrScanner;
 
const handleResult=async (e)=>{
if(hasCall.current){
return 
}

 try{
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
    { productId:e.data},
 config
  )
  hasCall.current=true;
  navigate("/");
 }catch(err){
console.log(err)
 }
}
  const startScanning = () => {
    if (videoRef.current) {
      qrScanner = new QrScanner(
        videoRef.current,
        result =>{
            handleResult(result)
        },
        {
          onDecodeError: error => console.error('Error decoding QR code:', error),
          preferredCamera: 'enviroment', 
          maxScansPerSecond: 50,
          highlightScanRegion:true,
          highlightCodeOutline:true,
          calculateScanRegion: () => {
          
            const video = videoRef.current;
            const width = video.width;
            const height = video.height;
            const scanRegionSize = 0.6;
            return {
              top: (1 - scanRegionSize) / 2 * height,
              right: (1 + scanRegionSize) / 2 * width,
              bottom: (1 + scanRegionSize) / 2 * height,
              left: (1 - scanRegionSize) / 2 * width,
            };
          },
        
        }
      );
   
      qrScanner.start();
    }
  };


  const stopScanning = () => {
    if (qrScanner) {
      qrScanner.stop();
    }
  };


 

  return (

    <Card
    variant="outlined"
    sx={{
      height: '400px',
      width: '75%', // Set a fixed width or use percentage as needed
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      margin: 'auto', // Center the card horizontally
    }}
  >
    <CardContent>
     
      <Box sx={{ mb: 10 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center',padding:'10px' }}>
  <video ref={videoRef} width="400" height="auto" autoPlay></video>
  
  <Button variant="contained" onClick={startScanning} sx={{ margin: '5px', width: '80%' }}>
    Enable
  </Button>
  <Button variant="contained" onClick={stopScanning} sx={{ width: '80%' }}>
    Disable
  </Button>
</Box>

      </Box>
    </CardContent>
  </Card>
  



  );
};

export default WebScan


