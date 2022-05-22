import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Form, Button, Row, Col, Placeholder, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { listMyOrders } from '../actions/orderActions';
import { AiFillEye } from 'react-icons/ai';
const ProfilePage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');

  // * @todo: make this an object to have more validation or use react bootstrap
  const [message, setMessage] = useState(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const updateLoading = userLogin.loading;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const myOrders = useSelector((state) => state.orderMyList);
  const { orders, loading: loadingOrders, error: errorOrders } = myOrders;

  // Clear all errors on Navigate in and out
  useEffect(() => {
    setMessage(null);
  }, []);

  useEffect(() => {
    //  Redirect if user isnt logged In
    if (!userInfo) return navigate('/login');

    // Get actual logged in user details
    if (!user.name) dispatch(getUserDetails('profile'));
    else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, userInfo, user]);

  useEffect(() => {
    dispatch(listMyOrders());
  }, [dispatch, userInfo, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword)
      return setMessage('Your passwords dont match');
    else if (password.length < 6)
      return setMessage('Your password is too short');

    // DISPATCH UPDATE PROFILE
    dispatch(updateUserProfile({ id: user._id, name, email, password }));
  };

  return (
    <Row>
      <Col md={4}>
        <h2>User Profile</h2>
        {error ? (
          <Message variant='danger'>{error}</Message>
        ) : loading || updateLoading ? (
          <p>Loading</p>
        ) : (
          <Form onSubmit={submitHandler} className='gy-3'>
            {/* ! message doesn't clear */}
            {success && <Message variant='success'>Update successful</Message>}
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
            <Button
              type='submit'
              variant='primary'
              disabled={
                email === user.email && name === user.name && password === ''
              }
            >
              Update Details
            </Button>
          </Form>
        )}
      </Col>
      {/* Orders */}
      <Col md={8}>
        <h2>My Orders:</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant='danger'>{errorOrders}</Message>
        ) : (
          <Table
            striped
            bordered
            hover
            responsive
            className='table-sm align-middle'
          >
            <thead>
              <tr>
                <th>Items</th>
                <th>Date</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Delivered</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders &&
                orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order.orderItems.length}</td>
                    {/* ! Format these correctly */}
                    <td>{new Date(order.createdAt).toDateString()}</td>
                    <td>{order.totalPrice}</td>
                    {/* Display icon instead */}
                    <td>{order.isPaid ? 'Paid' : 'Not Paid'}</td>
                    <td>{order.isDelivered ? 'Delivered' : 'Not delivered'}</td>
                    <td>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button variant='light' size='sm' title='View order'>
                          <AiFillEye className='icon' /> Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfilePage;
