import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, createBrowserRouter } from "react-router-dom";
import Home from './pages/Home/Home';
import Itemview from './pages/Itemview/Itemview';
import AddItem from './pages/addItem/addItem';

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/item' element={<Itemview />} />
        <Route path='/create' element={<AddItem />} />        
      </Routes>
    </BrowserRouter>
  )
}

export default App