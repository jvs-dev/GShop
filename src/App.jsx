import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, createBrowserRouter } from "react-router-dom";
import Home from './pages/Home/Home';
import Itemview from './pages/Itemview/Itemview';

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/item' element={<Itemview />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App