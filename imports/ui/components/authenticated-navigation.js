import React from 'react';
import { browserHistory } from 'react-router';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';

const handleLogout = () => Meteor.logout(() => browserHistory.push('/meteor-vr/login'));

const userName = () => {
  const user = Meteor.user();
  const name = user && user.profile ? user.profile.name : '';
  return user ? `${name.first} ${name.last}` : '';
};

export const AuthenticatedNavigation = () => (
  <div>
    <Nav>
      <IndexLinkContainer to="/meteor-vr">
        <NavItem eventKey={ 1 } href="/meteor-vr">Index</NavItem>
      </IndexLinkContainer>
      <LinkContainer to="/meteor-vr/documents">
        <NavItem eventKey={ 2 } href="/documents">Documents</NavItem>
      </LinkContainer>
      <LinkContainer to="/meteor-vr/vr">
        <NavItem eventKey={ 3 } href="/meteor-vr/vr">Virtual Reality</NavItem>
      </LinkContainer>
    </Nav>
    <Nav pullRight>
      <NavDropdown eventKey={ 4 } title={ userName() } id="basic-nav-dropdown">
        <MenuItem eventKey={ 4.1 } onClick={ handleLogout }>Logout</MenuItem>
      </NavDropdown>
    </Nav>
  </div>
);
