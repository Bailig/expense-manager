import React from 'react';
// import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, Glyphicon, FormGroup, FormControl, Button } from 'react-bootstrap';

const Header = () => {
  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="#home"><Glyphicon glyph="piggy-bank" /></a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>

      <Navbar.Collapse>
        <Navbar.Form pullLeft>
          <FormGroup>
            <FormControl type="text" placeholder="Search" />
          </FormGroup>{' '}

          <Button type="submit"><Glyphicon glyph="search" /></Button>
        </Navbar.Form>
        <Nav pullRight>
          <NavItem eventKey={1} href="#">
            Link
          </NavItem>

          <NavItem eventKey={2} href="#">
            Link
          </NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
