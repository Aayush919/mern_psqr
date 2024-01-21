import React from 'react';
import { Container, Card, CardContent,Box} from '@mui/material';

import { toast } from 'react-toastify';
import FileScan from './FileScan';
import WebScan from './WebScan';





const Scan = () => {

  return (
         
         <Container sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection:'column',
          alignItems: 'center',
          minHeight: '100vh', 
          gap:'20px',
          padding:'30px'
        }}>
        <FileScan/>
     
    <WebScan/>

        </Container>
     
  
      
    
 
  );
};

export default Scan;
