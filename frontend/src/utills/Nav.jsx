
import { useRef, useState, useEffect, React, useContext } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { MenuItem,Box ,Toolbar,Container , Typography,Menu, IconButton,Link,Button , AppBar} from "@mui/material";
import { ProductContext } from "../../context/productProvider";

const Nav = () => {
    const hasMounted = useRef(false);
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const{isUser,setIsUser}=useContext(ProductContext)
 
   
    const navigate=useNavigate()

const handleLog=()=>{

 localStorage.removeItem('userInfo')
 setIsUser(true);
 navigate("/LogIn") 
}

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  useEffect(() => {
 
      const user=JSON.parse(localStorage.getItem('userInfo'))
      if(user){
        setIsUser(true)
      }else{
        setIsUser(false)
        
      }
   
  }, [isUser])
  
  return (
    <div>

<AppBar position="static">
        <Container maxWidth="xl" sx={{ backgroundColor: '#FFFFFF' }}   >
          <Toolbar disableGutters>

            <Box sx={{ flexGrow: 1, display: { xs: "flex" } }}>
            <Link component={RouterLink} to="/" underline="none" sx={{ color: '#002884', fontWeight: 'bold' }}>
            <Typography textAlign="center" color="#212884">Inventory Management System</Typography>
                  </Link>
           
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="#707070"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block" },
                }}
              >


                <MenuItem onClick={handleCloseNavMenu}>
                  <Link component={RouterLink} to="/Generate" underline="none" sx={{ color: '#002884', fontWeight: 'bold' }}>
                    Generate QR Code
                  </Link>

                </MenuItem>

                <MenuItem onClick={handleCloseNavMenu}>

                  <Link component={RouterLink} to="/Scan" underline="none" sx={{ color: '#002884', fontWeight: 'bold' }}>
                    Scan Qr Code
                  </Link>

                </MenuItem>
               { !isUser&&<MenuItem onClick={handleCloseNavMenu}>
                 <Link  variant='outlined'component={RouterLink} to="/LogIn" underline="none" sx={{ color: '#002884', fontWeight: 'bold' }}>
                  <Button variant="outlined" color="primary" sx={{ mr: 2 }}>
                    Sign in
                  </Button>
                  </Link>
                </MenuItem>}
                {!isUser&&<MenuItem onClick={handleCloseNavMenu}>
                <Link  variant='outlined'component={RouterLink} to="/SignUp" underline="none" sx={{ color: '#002884', fontWeight: 'bold' }}>
                <Button variant="contained" color="primary">
                    Register
                  </Button>
                  </Link> 
                </MenuItem>}
                {isUser&&<MenuItem onClick={handleCloseNavMenu}>
                <Link  variant='outlined'component={RouterLink} to="/SignUp" underline="none" sx={{ color: '#002884', fontWeight: 'bold' }}>
                <Button variant="contained" color="primary" onClick={handleLog}>
                    Log Out
                  </Button>
                  </Link> 
                </MenuItem>}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  )
}

export default Nav