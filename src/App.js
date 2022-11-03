import React from 'react'
import { BrowserRouter , Routes, Route } from "react-router-dom";
import Listing from './components/Listing';
import AddData from './components/AddData';
import EditData from './components/EditData';
import Header from './layout/Header';
const App = () => {
  return (
    <>    
    <BrowserRouter >
      <Header />
      <Routes>
        <Route path="/" element={<Listing />} />
          <Route path="/add" element={<AddData />} />
          <Route path="/edit/:id" element={<EditData />} />
      </Routes>
    </BrowserRouter >
    </>

  )
}

export default App