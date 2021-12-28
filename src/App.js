import React from 'react';

//Rounting
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//styles
import { GlobalSyles } from './GlobalStyles';
import Header from './components/Header';
import Home from './components/Home'
import Movie from './components/Movie';
import NotFound from './components/NoFound';
function App() {
  return (
    <Router>      
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/:movieId' element={<Movie/>}/>
        <Route path='/*' element={<NotFound/>}/>
      </Routes>
      <GlobalSyles/>
    </Router>
  );
}

export default App;
