import React from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, Glyphicon, FormGroup, FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { updateField as updateFieldAction } from '../../modules/filteringForm';

const Header = ({ searchKeyWord, updateField }) => {
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
            <FormControl
              type="text"
              placeholder="Search"
              value={searchKeyWord}
              onChange={event => updateField({ prop: 'searchKeyWord', value: event.target.value })}
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
  searchKeyWord: PropTypes.string.isRequired,
  updateField: PropTypes.func.isRequired,
};

const mapStateToProps = ({ filteringForm: { searchKeyWord } }) => {
  return { searchKeyWord };
};

export default connect(mapStateToProps, { updateField: updateFieldAction })(Header);
