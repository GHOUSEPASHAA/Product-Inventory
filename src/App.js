import logo from './logo.svg';
import './App.css';
import Navbar from './components/NavBar';
import Home from './components/Home';
import AddProducts from './components/AddProducts';
import DisplayProducts from './components/DisplayProducts';
import About from './components/About';
import { Routes } from 'react-router-dom';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignIn from './components/SignIn';
import NavBar from './components/NavBar';
function App() {

  const [Mode, setMode] = useState('light');

  const toggleMode = () => {
    if (Mode === 'light') {
      setMode('dark');
       document.body.style.backgroundColor = 'grey';
    }
    else {
      setMode('light');
       document.body.style.backgroundColor = 'white';
    }
};
  return (
    <Router>
      <NavBar mode={Mode} toggleMode={toggleMode} />
    
      <Routes>
      <Route path="/" exact element={<Home/>} />
      <Route path="/add" element={<AddProducts/>} />
      <Route path="/dis" element={<DisplayProducts/>} />
      <Route path="/about" element={<About/>} />
      <Route path="/sign" element={<SignIn/>} />
     {/* <Route path="/action" component={ActionPage} />
      <Route path="/another-action" component={AnotherActionPage} />
      <Route path="/something" component={SomethingPage} />
  <Route path="/separated-link" component={SeparatedLinkPage} />*/}
  </Routes>
    
  </Router>
  );
}

export default App;
