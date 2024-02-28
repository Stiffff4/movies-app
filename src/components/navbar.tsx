import { Menu, Item, Button } from 'semantic-ui-react';
import { Link, useNavigate } from 'react-router-dom';

export const NavBar = () => {
  const isLoggedIn = localStorage.getItem('guest_session_id') !== null;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/auth');
  };

  return (
    <>
      <Menu fixed="top" size="huge">
        <Item as={Link} to="/" style={{ fontSize: '1.5rem' }}>
          Home
        </Item>

        <Menu.Menu position="right">
          {isLoggedIn ? (
            <Item
              as={Button}
              to="/auth"
              style={{ fontSize: '1.5rem' }}
              onClick={handleLogout}
            >
              Logout
            </Item>
          ) : (
            <Item as={Link} to="/auth" style={{ fontSize: '1.5rem' }}>
              Auth
            </Item>
          )}
        </Menu.Menu>
      </Menu>
    </>
  );
};

export default NavBar;
