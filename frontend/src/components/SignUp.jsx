import React, { useContext, useState } from 'react'
import {Container,Card,Typography,FormControl,TextField,Button,Link} from '@mui/material'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { ProductContext } from '../../context/productProvider';
import { toast } from 'react-toastify';
const Signup = () => {
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [email, setemail] = useState('');
  const{isUser,setIsUser}=useContext(ProductContext);
  const navigate = useNavigate();

  const submitHandler =async (e) => {
    console.log("hello")
  e.preventDefault();
    if (!email || !password || !username) {
      toast("add all the fields !", {
        theme: 'light',
        type: "error",
        autoClose: 1000,
        position: "top-center",
    });
      return
    }

    try {
      const { data }  = await axios.post("http://localhost:8080/user/signup",{email,password,username},{ headers: { "Content-Type": 'application/json' } })
     localStorage.setItem('userInfo',JSON.stringify(data));
     setIsUser(true);
     navigate("/");
    }
    catch (error) {
      toast("Something Wrong or user already exist whith this email !", {
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
      alignItems: 'center',
      minHeight: '100vh',
    }}>
      <Card sx={{ width: '100%', maxWidth: '400px', p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h6">Register</Typography>
        <Typography variant="body2" sx={{ mb: 5 }}>Create Your Free Account Now!</Typography>

        <FormControl sx={{ width: '100%', mb: 3 }}>
          <TextField
            label="Username"
            size="small"
            fullWidth
            sx={{ mb: 3 }}
            onChange={(e) => setusername(e.target.value)}
            value={username}
          />
          <TextField
            type="email"
            label="Email"
            size="small"
            fullWidth
            sx={{ mb: 3 }}
            onChange={(e) => setemail(e.target.value)}
            value={email}
          />
          <TextField
            type="password"
            label="Password"
            size="small"
            fullWidth
            sx={{ mb: 3 }}
            onChange={(e) => setpassword(e.target.value)}
            value={password}
          />
          <Button variant="contained" fullWidth sx={{ mb: 3 }} onClick={submitHandler}>Register</Button>
        </FormControl>
        <Link component={RouterLink} to="/LogIn" underline="none" sx={{ color: '#002884', fontWeight: 'bold' }}>
        <Typography variant="body2" sx={{ mb: 5 }}>Already have an account? Login</Typography>
                  </Link>
       
      </Card>
    </Container>
  )
}

export default Signup