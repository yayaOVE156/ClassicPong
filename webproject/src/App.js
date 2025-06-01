import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './homepage.js';
import Game from './game.js';
import Login from './login.js';
import Reg from './reg.js';
import Leaderboards from './lb.js';
import Navbar from './navbar.js';
import Bc from './background.js';
import About from './about.js';
import React, { useState } from 'react';
import { UserProvider } from './UserCtxt.js'; 


function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState({ x: 2, y: 2 });
  return (
    <>
      <UserProvider>
      <div className="App" style={{ width: '100%', minHeight: '100vh',margin: 0 }}>
        
        <Router>
          
          <Navbar />
          <Bc position={position}
            setPosition={setPosition}
            velocity={velocity}
            setVelocity={setVelocity}
          style={{backgroundColor:'black',}}/>
          <Routes>
            
            <Route path="/" element={<Homepage />} />
            <Route path="/game" element={<Game />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reg" element={<Reg />} />
            <Route path="/lb" element={<Leaderboards />} />
            <Route path ="/ab" element={<About/>} />
          </Routes>
        </Router>
      </div>
      </UserProvider>
    </>
  );
}

export default App;
