// NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';

const NavBar = (props) => {
  return (
    <Navbar expand="lg" className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>

      <Container>
        <Navbar.Brand as={Link} to="/"> <img
            src='data:image/png;base64,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'
            alt="Logo"
            height="100"
            className="d-inline-block align-top"
          />
        
       </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/add">AddProducts</Nav.Link>
            <Nav.Link as={Link} to="/dis">DisplayProducts</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/sign">SignIn</Nav.Link>

        <div className={`form-check form-switch text-${props.mode==='light'? 'Dark' : 'light'}`}>
    <input className="form-check-input" onClick={props.toggleMode} type="checkbox" id="flexSwitchCheckDefault" />
    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Enable DarkMode </label>
</div>
           {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/action">Action</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/another-action">Another action</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/something">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/separated-link">Separated link</NavDropdown.Item>
  </NavDropdown>*/}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
