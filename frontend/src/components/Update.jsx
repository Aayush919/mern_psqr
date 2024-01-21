import React,{useContext, useEffect, useRef, useState}from 'react';
import { Container, Typography, Button, TextField, MenuItem, FormControl, InputLabel, Select, Card, CardActions, CardContent, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from '../../context/productProvider';
import { toast } from 'react-toastify';
const Update = () => {

  const {selectedEdit,setSelectedEdit,isUser}  = useContext(ProductContext);
  const [Name, setName] = useState('C1');
  const [date, setDate] = useState('');
  const [quantity, setQuantity,] = useState('');
  const hasMounted = useRef(false);

  const navigate=useNavigate();
console.log(selectedEdit);
const submiHandler=async (e)=>{
  e.preventDefault();

  
  if(!Name || !date || !quantity || !selectedEdit){
    toast("add all the fields !", {
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
    return console.log("Please select a date in the past or today's date.");
  } 

  if(quantity<1){
       toast("select atleast one product!", {
      theme: 'light',
      type: "error",
      autoClose: 1000,
      position: "top-center",
  });
    return
  }
  const user=JSON.parse(localStorage.getItem('userInfo'))
  if(!isUser || !user){
    toast("Log In Now !", {
      theme: 'light',
      type: "error",
      autoClose: 1000,
      position: "top-center",
  });
    return
  }
     const config = { headers: { Authorization: `Bearer ${user.token}` } }
  try{
  
    
const {data}=await axios.post("http://localhost:8080/product/update",{Name:Name,receivedDate:date,receivedQuantity:quantity,productId:selectedEdit},config)
setSelectedEdit(null);
navigate("/");
  }
  catch(err){ 
    toast("Something Wrong  Or select Quantity more then or eqaul dispatch !", {
      theme: 'light',
      type: "error",
      autoClose: 1000,
      position: "top-center",
  });
    return
  }
}


const fetchOne=async ()=>{
  if(!selectedEdit){
    return console.log("please provide the id...!")
   }
  try{
    
   const { data } = await axios.post("http://localhost:8080/product/getOneProduct",{productId:selectedEdit},{headers:{'Content-Type':'application/json'}});
   console.log(data);
  setName(data.pr.Name);
  setDate(data.pr.receivedDate);
  setQuantity(data.pr.receivedQuantity);
  }catch(err){
   console.log(err)
  }
 
}



useEffect(() => {
  if (!hasMounted.current) {
     fetchOne();
    hasMounted.current = true;
  }
}, [selectedEdit])
  
  return (
    <Container sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh', 
    }}>
      <Card variant="outlined" sx={{ height: '400px', width: '400px', display: "flex", alignItems: "center", justifyContent: "center", flexDirection: 'column' }}>
        <CardContent>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h5" sx={{mb:'8px'}}>Update QR Code</Typography>
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
                 value={date}
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
              value={quantity}
                onChange={(e)=>setQuantity(e.target.value)}
                  InputProps={{ inputProps: { min: 1 } }}
                />
              </FormControl>

              <Button variant="contained" color="primary" sx={{ mb:1,ml:7,display:'flex',justifySelf:'center'}} onClick={submiHandler}>
                UPDATE QR
              </Button>
            </form>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Update



