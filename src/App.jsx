import React from 'react';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Home } from './Pages/Home'
import { Pokemon } from './Pages/Pokemon'

export function App() {
   return (
    <Router>
        <Routes>
           <Route path='/' element={<Home />} />
           <Route path='pokemon/:id' element={<Pokemon />} />
        </Routes>
    </Router>
   )
}