
import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Button, Icon, Menu } from 'semantic-ui-react'

const Navbar = () => {
  const history = useHistory()
  const { pathname } = useLocation();
  return (
    <Menu>
      <Menu.Item
          active={pathname === '/'}
          content='Home'
          onClick={() => history.push('/')}/>
        <Menu.Item
          active={pathname === '/users'}
          content='User'
          onClick={() => history.push('/users')} />
        <Menu.Item
          active={pathname === '/buses'}
          content='Buses'
          onClick={() => history.push('/buses')} />
        <Menu.Item
          active={pathname === '/favs'}
          onClick={() => history.push('/favs')}>
          Favorite <n></n> <Icon name='heart' />
        </Menu.Item>
        <Menu.Item  
          content='Sign Up'
          position='right' />
        <Menu.Item  
          content='Sign In' />
    </Menu>
  );
}

export default Navbar;