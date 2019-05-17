import React, { Component } from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
class NavBar extends Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Multichain</Navbar.Brand>
        <Nav className="mr-auto">
          <div style={{ paddingLeft: 10 }}>
            <Nav.Link href="/">Thông tin</Nav.Link>
          </div>

          <div style={{ paddingLeft: 10 }}>
            <Nav.Link href="/permissions">Quyền</Nav.Link>
          </div>

          <div style={{ paddingLeft: 10 }}>
            <Nav.Link href="/issue">Phát hành</Nav.Link>
          </div>

          <div style={{ paddingLeft: 10 }}>
            <Nav.Link href="/verification">Xác thực</Nav.Link>
          </div>
          <div style={{ paddingLeft: 10 }}>
            <Nav.Link href="/list-diploma">Danh sách</Nav.Link>
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
