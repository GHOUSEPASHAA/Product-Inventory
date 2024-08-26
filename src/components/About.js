import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Accordion from 'react-bootstrap/Accordion';
import { Button } from 'react-bootstrap';


export default function About() {
  const [mystyle, setMystyle] = useState({
    color : 'black',
    backgroundColor :'white'
  }
  )
  const[btnText,setBtn]=useState("Set Dark Mode")
  const handleColor = () => {
    if (mystyle.color == 'black') {
      setMystyle({
        color: 'white',
        backgroundColor:'black'
      })
      setBtn("set white Mode")
    }
    else {
      setMystyle({
        color: 'black',
        backgroundColor:'white'
      })
      setBtn("set dark Mode")
    }
  }
  return (
   
     <div className='contain' style={mystyle}>
      <div>
      <Accordion style={mystyle}>
        <Accordion.Item eventKey="0">
          <Accordion.Header style={mystyle}>Accordion Item #1</Accordion.Header>
          <Accordion.Body style={mystyle}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Accordion Item #2</Accordion.Header>
          <Accordion.Body style={mystyle}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

    </div><div>
        <Button variant="primary" style={{ marginLeft: "2px" }} onClick={handleColor}>{btnText}</Button>
      </div>
       </div>
   
    
  )
}
