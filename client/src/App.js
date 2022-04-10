import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import './App.css';

import MenuBar from './components/MenuBar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import { Container } from 'semantic-ui-react';


function App() {
  return (
     <Router>
      
      <Container>
        <MenuBar/>
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route exact path='/login' element = {<Login/>}/>
          <Route exact path='/register' element = {<Register/>}/>
        </Routes>
      </Container>
      
    </Router>
  );
}

export default App;
