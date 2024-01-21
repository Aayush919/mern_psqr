import React,{useContext, useState}from 'react';
import { Container, Typography, Button, TextField, MenuItem, FormControl, InputLabel, Select, Card, CardActions, CardContent, Box } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from '../../context/productProvider';
const Generate = () => {
  const navigate=useNavigate();
  const{isUser,setIsUser}=useContext(ProductContext)
 
  const [Name, setName] = useState('C1');
  const [date,setDate]=useState();
  const [quantity,setQuantity]=useState(); 

const submiHandler=async (e)=>{
  e.preventDefault();
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



  if(!Name || !date || !quantity){
    toast('add all the fields !', {
      theme: 'light',
      type: "error",
      autoClose: 1000,
      position: "top-center",
  });
    return
  }
 
  const currentDate = new Date();
  const selectedDateObj = new Date(date);

  if (selectedDateObj > currentDate) {
    toast("Please select a date in the past or today's date!", {
      theme: 'light',
      type: "error",
      autoClose: 1000,
      position: "top-center",
  });
    return
   
  } 

  if(quantity<1){
    toast("Quantity atleast 1", {
      theme: 'light',
      type: "error",
      autoClose: 1000,
      position: "top-center",
  });
    return
  
  }


  try{
    const config={ headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}` } }
const {data}=await axios.post("http://localhost:8080/product/create",{Name:Name,receivedDate:date,receivedQuantity:quantity},config)
setName('C1')
setDate();
setQuantity('')
navigate("/");
  }
  catch(err){ 
    toast("please try again !", {
      theme: 'light',
      type: "error",
      autoClose: 1000,
      position: "top-center",
  });
    return

  }
}



   
  
  return (
    <Container sx={{
      display: 'flex',
      justifyContent: 'center',
      flexDirection:'column',
      alignItems: 'center',
      minHeight: '100vh', 
      gap:'20px',
      padding:'10px'
    }}>
      <Card variant="outlined" sx={{ height: '400px', width: '400px', display: "flex", alignItems: "center", justifyContent: "center", flexDirection: 'column' }}>
        <CardContent>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h5" sx={{mb:'10px'}}>Generate QR Code</Typography>
            <form>
            <InputLabel id="name-label">Select (C1-C5)</InputLabel>
              <FormControl fullWidth sx={{ mb: 2 }}>
              
                <Select
                size="small"
                  labelId="name-label"
                  id="name"
                  name="name"
                  required
                  label="Select (C1-C5)"
                  defaultValue={Name}
                  onChange={(e)=>setName(e.target.value)}
                >

                
                  <MenuItem value="C1">C1</MenuItem>
                  <MenuItem value="C2">C2</MenuItem>
                  <MenuItem value="C3">C3</MenuItem>
                  <MenuItem value="C4">C4</MenuItem>
                  <MenuItem value="C5">C5</MenuItem>
                </Select>
              </FormControl>
              <InputLabel id="date-label">Date</InputLabel>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <TextField
                size="small"
                  type="date"
                  id="date"
                  name="date"
                  required
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  defaultValue={date}
                  onChange={(e)=>setDate(e.target.value)}
                />
              </FormControl>
              <InputLabel id="quantity-label">Quantity</InputLabel>
              <FormControl fullWidth sx={{ mb: 2 }}>
              
                <TextField
                size="small"
                  type="number"
                  id="quantity"
                  name="quantity"
                  required
                  fullWidth
                defaultValue={quantity}
                onChange={(e)=>setQuantity(e.target.value)}
                  InputProps={{ inputProps: { min: 1 } }}
                />
              </FormControl>
                
       <Button variant="contained" color="primary" sx={{ mb: 2,ml:5 ,display:'flex',justifySelf:'center'}} onClick={submiHandler}>
                Generate QR
              </Button>
            </form>
          </Box>
        </CardContent>
      </Card>


    
    </Container>
  );
};

export default Generate;



