import React from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, Glyphicon, FormGroup, FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { updateField as updateFieldAction } from '../../modules/filteringForm';
import './Header.css';

const Header = ({ searchKeyword, updateField }) => {
  return (
    <Navbar fixedTop>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="#home"><Glyphicon glyph="globe" /></a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>

      <Navbar.Collapse>
        <Navbar.Form pullLeft>
          <FormGroup>
            <FormControl
              type="text"
              placeholder="Search"
              value={searchKeyword}
              onChange={event => updateField({ prop: 'searchKeyword', value: event.target.value })}
            />
          </FormGroup>
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

Header.propTypes = {
  searchKeyword: PropTypes.string.isRequired,
  updateField: PropTypes.func.isRequired,
};

const mapStateToProps = ({ filteringForm: { searchKeyword } }) => {
  return { searchKeyword };
};

export default connect(mapStateToProps, { updateField: updateFieldAction })(Header);
