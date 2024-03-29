import React, {Fragment} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import './App.css';

import { AuthProvider } from './context/auth';
import  AuthRoute from './util/AuthRoute'; 

import MenuBar from './components/MenuBar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import { Container } from 'semantic-ui-react';

import SinglePost from './pages/SinglePost';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<AuthRoute />}>
              <Route exact path='/login' element={<Login/>}/>
            </Route>
            <Route exact path="/register" element={<AuthRoute />}>
              <Route exact path='/register' element={<Register/>}/>
            </Route>

            <Route exact path='/posts/:postId' element={<SinglePost/>}/>
          </Routes>
        </Container>

      </Router>
    </AuthProvider>
  );
}

export default App;
