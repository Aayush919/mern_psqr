import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


export const ProductContext=createContext('');



const ProductProvider = (props) => {
    const [products, setProducts] = useState();
    const [selectedEdit,setSelectedEdit]=useState(null);
    const[isUser,setIsUser]=useState(false);
    
    

      
  return (
    <ProductContext.Provider value={{products,setProducts,selectedEdit,setSelectedEdit,isUser,setIsUser}}>
{props.children}
    </ProductContext.Provider>
  )
}

export default ProductProvider