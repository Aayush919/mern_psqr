import React, { useContext, useState } from 'react'
import { Container, Card, Typography, FormControl, TextField, Button, Link } from '@mui/material'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import axios from 'axios';

import { toast } from 'react-toastify';
import { ProductContext } from '../../context/productProvider';

const LogIn = () => {

  const [password, setpassword] = useState('');
  const{isUser,setIsUser}=useContext(ProductContext);
  const [email, setemail] = useState('');
  const navigate = useNavigate();
 

  const submitHandler = async (e) => {
  
    e.preventDefault();
    if (!email || !password) {
      toast("add all the fields !", {
        theme: 'light',
        type: "error",
        autoClose: 1000,
        position: "top-center",
    });
      return


    }
    try {
      const { data } = await axios.post("http://localhost:8080/user/auth", { email, password }, { headers: { "Content-Type": 'application/json' } })
      localStorage.setItem('userInfo', JSON.stringify(data));
      setIsUser(true)
      navigate("/");
    }
    catch (error) {
      toast("Something Wrong !", {
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
        <Typography variant="h6">Login</Typography>
        <Typography variant="h5" sx={{ mb: 5 }}>Login to your account</Typography>

        <FormControl sx={{ width: '100%', mb: 3 }}>
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
          <Button variant="contained" fullWidth onClick={submitHandler}>Log In</Button>
        </FormControl>

        <Link component={RouterLink} to="/SignUp" underline="none" sx={{ color: '#002884', fontWeight: 'bold' }}>
          <Typography variant="body2" sx={{ mt: 3 }}>Don't have an account? Sign Up</Typography>
        </Link>

      </Card>
    </Container>
  )
}

export default LogIn