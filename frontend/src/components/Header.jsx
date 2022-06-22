import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Navbar,
  Container,
  NavDropdown,
  Nav,
  Offcanvas,
  FormControl,
  Form,
  Button,
  Row,
  Col,
} from 'react-bootstrap';
import { useNavigate, Route, Routes } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from '../actions/userActions';
import SearchBox from '../features/productSearch/SearchBox';
import {
  RiShoppingCartFill,
  RiUser6Fill,
  RiLogoutBoxRLine,
  RiLogoutBoxLine,
  RiUserSettingsFill,
  RiStore2Fill,
  RiBarChartFill,
} from 'react-icons/ri';
import CartHeaderIndicator from '../features/cart/CartHeaderIndicator';

const Header = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = userLogin;
  const logoutHandler = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <header>
      <Navbar
        bg='light'
        variant='light'
        fixed='top'
        expand='md'
        className='mb-3 pt-3 pb-3 shadow-sm text-primary'
      >
        <Container>
          <Navbar.Brand
            style={{ cursor: 'pointer' }}
            onClick={() => {
              navigate('/');
            }}
          >
            Inteli<span className='text-muted'>|gets</span>
          </Navbar.Brand>

          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-md`}
            aria-labelledby={`offcanvasNavbarLabel-expand-md`}
            placement='end'
            className='bg-light'
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
                Inteli<span className='text-muted'>|gets</span>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className=' '>
              <Nav className='justify-content-end flex-grow-1 pe-3 mb-4 mb-md-0'>
                {userInfo ? (
                  <NavDropdown
                    title='My Account'
                    id='username'
                    className='mx-0 m-auto'
                  >
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>
                        <RiUser6Fill className='icon-sm me-2' />
                        Profile
                      </NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      <RiLogoutBoxLine className='icon-sm me-2' />
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <LinkContainer to='/login'>
                    <Nav.Link>
                      <RiLogoutBoxRLine className='icon me-1 my-auto' /> Sign In
                    </Nav.Link>
                  </LinkContainer>
                )}
                {userInfo && userInfo.isAdmin && (
                  <div className='ms-2 d-md-flex  align-items-center text-md-center'>
                    <LinkContainer to='admin/products'>
                      <Nav.Link>
                        <RiStore2Fill className='icon-sm me-2' />
                        Products
                      </Nav.Link>
                    </LinkContainer>
                    <LinkContainer to='admin/orders'>
                      <Nav.Link>
                        <RiBarChartFill className='icon-sm me-2' />
                        Orders
                      </Nav.Link>
                    </LinkContainer>
                    <LinkContainer to='admin/users'>
                      <Nav.Link>
                        <RiUserSettingsFill className='icon-sm me-2' />
                        Users
                      </Nav.Link>
                    </LinkContainer>
                  </div>
                )}
              </Nav>

              <SearchBox />
            </Offcanvas.Body>
          </Navbar.Offcanvas>
          <div className='d-sm-flex'>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />

            <CartHeaderIndicator />
          </div>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
