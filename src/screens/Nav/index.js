import React, { Component } from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
class NavBar extends Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Multichain</Navbar.Brand>
        <Nav className="mr-auto">
          <div style={{ paddingLeft: 10 }}>
            <Nav.Link href="/">Info</Nav.Link>
          </div>

          <div style={{ paddingLeft: 10 }}>
            <Nav.Link href="/permissions">Permission</Nav.Link>
          </div>

          <div style={{ paddingLeft: 10 }}>
            <Nav.Link href="/issue">Issue</Nav.Link>
          </div>

          <div style={{ paddingLeft: 10 }}>
            <Nav.Link href="/verification">Verification</Nav.Link>
          </div>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-info">Search</Button>
        </Form>
      </Navbar>
    );
  }
}

export default NavBar;
