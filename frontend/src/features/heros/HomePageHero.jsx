import React, { useEffect } from 'react';
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  Col,
  Row,
  Carousel,
  Card,
  Image,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails } from '../../actions/productActions';
import { login } from '../../actions/userActions';
import accounts from '../../utilities/LoginDemoAccounts';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import LoginToDemoAccountsButtons from '../instantAccounts/LoginToDemoAccountsButtons';
import { Link } from 'react-router-dom';
const HomePageHero = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Card
      className='p-5 py-3 mb-5 '
      style={{
        backgroundColor: '#A7A7A7',
        backgroundImage: 'url("/images/hero-background.jpg")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        borderRadius: '1rem',
      }}
    >
      <Row className=' justify-content-between'>
        <Col lg={6} className='d-flex align-items-center'>
          <Card.Body className='d-flex flex-column align-items-start'>
            <h1 className='display-2 fw-bold text-light'>
              Inteli<span className='text-dark'>|gets</span>
            </h1>
            <p
              className='fs-4  text-dark'
              style={{ lineHeight: '1.2rem', letterSpacing: '0.05rem' }}
            >
              A fully functional{' '}
              <span className='text-light'>fullstack e-commerce store</span>{' '}
              that supports multiple user roles,{' '}
              <span className='text-light'>
                the creation, reading, deletion and updating (CRUD)
              </span>{' '}
              of user generated orders and reviews and management of products.
            </p>
            <LoginToDemoAccountsButtons />
          </Card.Body>
        </Col>
        <Col
          lg={6}
          className='position-relative align-self-center d-none d-lg-block'
          style={{ maxHeight: '350px', transform: 'translateY(0%)' }}
        >
          <Link to='/product/626887852959f8820baa5e70'>
            <img
              src='/images/iphone-hero-image.png'
              loading='lazy'
              className='w-100'
              style={{
                maxHeight: '450px',
                maxWidth: '100%',
                objectFit: 'contain',
              }}
            />
          </Link>
        </Col>
      </Row>
    </Card>
  );
};

export default HomePageHero;
