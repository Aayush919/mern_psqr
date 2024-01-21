import React, { useContext, useEffect } from 'react'
import Routing from './utills/Routing.jsx'
import { ProductContext } from '../context/productProvider.jsx'
import Nav from './utills/Nav.jsx';
import { useNavigate } from 'react-router-dom';



const App = () => {
  const navigate=useNavigate();
  
 
  const { selectedEdit,setSelectedEdit}  = useContext(ProductContext);
  const{isUser,setIsUser}=useContext(ProductContext)

  useEffect(() => {
      const user=JSON.parse(localStorage.getItem('userInfo'))
      if(user){
        setIsUser(true)
      }else{
        setIsUser(false)
        
      }
  
  }, [isUser,navigate])
  return (
    <div>
     <Nav/>
    <Routing/> 
    </div>
  )
}

export default App