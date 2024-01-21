import { useRef, useState, useEffect, React, useContext } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'
import { IconButton,TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody,Container} from "@mui/material";
import axios from 'axios';
import { ProductContext } from "../../context/productProvider";




function Home() {

  const hasMounted = useRef(false);
  const navigate=useNavigate();
  const{isUser,setIsUser}=useContext(ProductContext)

  const { products, setProducts,selectedEdit,setSelectedEdit}  = useContext(ProductContext);


  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/product/getAllProduct");
      console.log(data.products);
      setProducts(data);
  
    } catch (err) {
      console.log(err)
    }
  }

  const handleEdit=(id)=>{
  
    console.log(id)
    setSelectedEdit(id);
    navigate("/Update")
  }


  const handleDelet=async (id)=>{
    const user=JSON.parse(localStorage.getItem('userInfo'))
    if(!isUser || !user){
      return console.log("log in kro")
    }
       const config = { headers: { Authorization: `Bearer ${user.token}` } }
    try{
const delet=await axios.post("http://localhost:8080/product/delet",{productId:id},config);
console.log(delet)
fetchProducts();
    }catch(err){
console.log(err)
fetchProducts();
    }
  }

  useEffect(() => {
    if (!hasMounted.current) {
      console.log('Running useEffect...');
      fetchProducts();
      hasMounted.current = true;
    }
  }, [products])



  return (
    <>
     
      <Container>
        <TableContainer component={Paper} sx={{ mt: 4, }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>

                <TableCell>Date Received/Quantity</TableCell>
                <TableCell>  Date Dispatched/Quantity</TableCell>
                <TableCell> Pending Items</TableCell>
                <TableCell> Status</TableCell>
                <TableCell> QR Code (Click to download)</TableCell>
                <TableCell> Admin Panel</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              {products && products.products.map((p) => (
                <TableRow key={p._id}>
                  <TableCell>{p.Name}</TableCell>
                  <TableCell>{p.receivedDate.split("-").reverse().join('/')}/{p.receivedQuantity}</TableCell>
                  <TableCell>{p.dispatchDate}/{p.dispatchQantity}</TableCell>
                  <TableCell>{p.dispatchQantity ? JSON.parse(p.receivedQuantity) - JSON.parse(p.dispatchQantity) : p.receivedQuantity}</TableCell>
                  <TableCell>{p.dispatchQantity ? JSON.parse(p.receivedQuantity) - JSON.parse(p.dispatchQantity) === 0 ? 'dispatch' : 'pending' : 'pending'}</TableCell>
                  <TableCell>{
                    <a href={p.qr.toString()} download>
             <img src={p.qr} alt=""/>
                    </a>
                    }</TableCell>
                  <TableCell>
               
                  <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={()=>handleEdit(p._id)}
                
                color="#707070"
              >
                <EditIcon color="primary"  />
              </IconButton>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                  onClick={()=>handleDelet(p._id)}
                color="#707070"
              >
                 <DeleteIcon color='primary' />
              </IconButton>
     
</TableCell>
                </TableRow>))}





            </TableBody>
          </Table>
        </TableContainer>

      </Container>

  
    </>

  );
}
export default Home;