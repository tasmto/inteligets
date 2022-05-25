import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Form, Button, Row, Col, Placeholder } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { register } from '../../actions/userActions';
import FormContainer from '../../components/FormContainer';
import Meta from '../../components/Meta';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');

  // * @todo: make this an object to have more validation or use react bootstrap
  const [message, setMessage] = useState(null);
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  // Clear all errors on Navigate in and out
  useEffect(() => {
    setMessage(null);
  }, []);

  useEffect(() => {
    //  Redirect if already loggedIn
    if (userInfo) {
      navigate(redirect || '/');
    }
  }, [userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword)
      return setMessage('Your passwords dont match');
    else if (password.length < 6)
      return setMessage('Your password is too short');

    dispatch(register(email, password, name));
  };

  return (
    <FormContainer>
      <Meta title='Inteli|gets | Sign up' />
      <h1>Sign Up</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {!loading ? (
        <>
          <Form onSubmit={submitHandler} className='gy-3'>
            <Form.Group controlId='name' className='mb-4'>
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter your full name...'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
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
            <Form.Group controlId='confirmPassword' className='mb-4'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm your password...'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            {message && !error && (
              <Message variant='danger' className='mb-4'>
                {message}
              </Message>
            )}
            <Button type='submit' variant='primary'>
              Sign Up
            </Button>
          </Form>
          <Row className='py-3'>
            <Col>
              Already have an account?{' '}
              <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                Sign In
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
              <Placeholder xs={7} as='h3' size='lg' />
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

export default RegisterPage;
