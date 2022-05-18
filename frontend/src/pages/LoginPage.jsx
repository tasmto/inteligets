import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Form, Button, Row, Col, Placeholder } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { login } from '../actions/userActions';
import FormContainer from '../components/FormContainer';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    //  Redirect if already loggedIn
    if (userInfo) {
      navigate(redirect || '/');
    }
  }, [userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {!loading ? (
        <>
          <Form onSubmit={submitHandler} className='gy-3'>
            <Form.Group controlId='email' className='mb-4'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter your email...'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='password' className='mb-4'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter your password...'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary'>
              Sign In
            </Button>
          </Form>
          <Row className='py-3'>
            <Col>
              New Customer?{' '}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : '/register'}
              >
                Register
              </Link>
            </Col>
          </Row>
        </>
      ) : (
        <>
          <Row className='gy-3'>
            <Col xs={12}>
              <Placeholder xs={8} as='h3' size='lg' />
              <Placeholder xs={10} as='p' size='lg' className='py-3' />
            </Col>
            <Col xs={12}>
              <Placeholder xs={6} as='h3' size='lg' />
              <Placeholder xs={10} as='p' size='lg' className='py-3' />
            </Col>
            <Col xs={12}>
              <Placeholder.Button bg='primary' xs={6} aria-hidden='true' />
            </Col>
          </Row>
          <Row className='gy-3 mt-2'>
            <Col xs={5}>
              <Placeholder xs={12} as='p' size='lg' className='py-3' />
            </Col>
            <Col xs={6}>
              <Placeholder xs={12} as='p' size='lg' className='py-2' />
            </Col>
          </Row>
        </>
      )}
    </FormContainer>
  );
};

export default LoginPage;
