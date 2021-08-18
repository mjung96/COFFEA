import React, { useContext, useState } from 'react';
import logo from './coffee-beans-outline.png';
import { Menu, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/auth';

function MenuBar() {
  const { user, logout } = useContext(AuthContext);
  const pathname = window.location.pathname;
  const path = pathname === '/' ? 'COFFEA' : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  const menuBar = user ? (
    <Menu pointing secondary size="massive" color="brown">
          <Segment style={{ marginTop: 15 }}>
                <img
                    src={logo}
                    alt="Logo"
                />
                <Menu.Item position
                  name="COFFEA"
                  active
                  //active={activeItem === 'COFFEA'}
                  onClick={handleItemClick}
                  as={Link}
                  to="/"
                />
          </Segment>
          {/* <Menu.Item
            name="COFFEA"
            active={activeItem === 'COFFEA'}
            onClick={handleItemClick}
            as={Link}
            to="/"
          /> */}
          <Menu.Menu position='right'>
            <Menu.Item
                name={user.username}
                // active={activeItem === 'Log In'}
                // onClick={handleItemClick}
                // as={Link}
                // to="/login"
          />
            <Menu.Item
              name="Logout"
              onClick={logout}
            />
          </Menu.Menu>
        </Menu>
  ) : (
    <Menu pointing secondary size="massive" color="brown">
          <Segment style={{ marginTop: 15 }}>
                <img
                    src={logo}
                    alt="Logo"
                />
                <Menu.Item position
                  name="COFFEA"
                  active={activeItem === 'COFFEA'}
                  onClick={handleItemClick}
                  as={Link}
                  to="/"
                />
          </Segment>
          {/* <Menu.Item
            name="COFFEA"
            active={activeItem === 'COFFEA'}
            onClick={handleItemClick}
            as={Link}
            to="/"
          /> */}
          <Menu.Menu position='right'>
            <Menu.Item
                name="Log In"
                active={activeItem === 'Log In'}
                onClick={handleItemClick}
                as={Link}
                to="/login"
          />
            <Menu.Item
              name="Sign Up"
              active={activeItem === 'Sign Up'}
              onClick={handleItemClick}
              as={Link}
              to="/register"
            />
          </Menu.Menu>
        </Menu>
  )

  return menuBar;
        // <Menu pointing secondary size="massive" color="brown">
        //   <Segment style={{ marginTop: 15 }}>
        //         <img
        //             src={logo}
        //             alt="Logo"
        //         />
        //         <Menu.Item position
        //           name="COFFEA"
        //           active={activeItem === 'COFFEA'}
        //           onClick={handleItemClick}
        //           as={Link}
        //           to="/"
        //         />
        //   </Segment>
        //   {/* <Menu.Item
        //     name="COFFEA"
        //     active={activeItem === 'COFFEA'}
        //     onClick={handleItemClick}
        //     as={Link}
        //     to="/"
        //   /> */}
        //   <Menu.Menu position='right'>
        //     <Menu.Item
        //         name="Log In"
        //         active={activeItem === 'Log In'}
        //         onClick={handleItemClick}
        //         as={Link}
        //         to="/login"
        //   />
        //     <Menu.Item
        //       name="Sign Up"
        //       active={activeItem === 'Sign Up'}
        //       onClick={handleItemClick}
        //       as={Link}
        //       to="/register"
        //     />
        //   </Menu.Menu>
        // </Menu>
}

export default MenuBar;