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
const HomePageHero = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, product, error } = productDetails;

  // *Reset review on page load and get product details
  useEffect(() => {
    dispatch(listProductDetails('626887852959f8820baa5e6f'));
  }, []);

  return (
    <Card className='p-5 mb-5 bg-dark rounded-3 '>
      <Row>
        <Col md={6} className='d-flex align-items-center'>
          <Card.Body className='d-flex flex-column align-items-start'>
            <h1 className='display-6 fw-bold text-light'>
              Welcome to Inteli<span className='text-muted'>|gets</span>
            </h1>
            <p className='fs-4 text-muted'>
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
          md={6}
          className='position-relative align-self-center'
          style={{ maxHeight: '350px' }}
        >
          {!loading && (
            <>
              <Image
                src={product.image}
                fluid
                className='shadow-lg pointer'
                style={{ height: '100%', objectFit: 'cover' }}
                rounded
                onClick={() => navigate(`/product/626887852959f8820baa5e6f`)}
              />
              <Button
                size='md'
                className='btn btn-success mt-5 position-absolute start-50 translate-middle-x'
                type='button'
                style={{ bottom: '-20px' }}
                onClick={() => navigate(`/product/626887852959f8820baa5e6f`)}
              >
                View Product
              </Button>
            </>
          )}
        </Col>
      </Row>
    </Card>
  );
};

export default HomePageHero;
