import React, { useContext } from 'react'
import {Routes,Route}  from 'react-router-dom'
import Home from '../components/Home.jsx'
import Generate from '../components/Generate.jsx'
import LogIn from '../components/LogIn.jsx'
import SignUp from '../components/SignUp.jsx'
import Scan from '../components/Scan.jsx'
import Edit from '@mui/icons-material/Edit.js'
import Update from '../components/Update.jsx'




const Routing = () => {

  return (
    <div>
<Routes>
  <Route path="/"  element={<Home/>}/>
  <Route path="/SignUp"  element={<SignUp/>}/>
  <Route path="/LogIn"  element={<LogIn/>}/>
  <Route path="/Scan"  element={<Scan/>}/>
  <Route path="/Generate"  element={<Generate/>}/>
 <Route path="/Update"  element={<Update/>}/>
  <Route path="*"  element={<Home/>}/>
</Routes>


    </div>
  )
}

export default Routing