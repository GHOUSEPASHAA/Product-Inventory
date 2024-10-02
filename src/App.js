import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import AddProducts from './components/AddProducts';
import DisplayProducts from './components/DisplayProducts';
import About from './components/About';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [mode, setMode] = useState('light');
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = 'grey';
    } else {
      setMode('light');
      document.body.style.backgroundColor = 'white';
    }
  };

  return (
    <Router>
      <NavBar mode={mode} toggleMode={toggleMode} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddProducts token={token} />} />
        <Route path="/dis" element={<DisplayProducts token={token} />} />
        <Route path="/about" element={<About />} />
        <Route path="/log" element={<Login setToken={setToken} />} />
        <Route path="/reg" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
