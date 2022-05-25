import React, { useState, useEffect } from 'react';
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import {
  Form,
  Button,
  Row,
  Col,
  Placeholder,
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { getUserDetails, updateUser } from '../../actions/userActions';
import { listUserOrders } from '../../actions/orderActions';
import FormContainer from '../../components/FormContainer';
import { USER_UPDATE_RESET } from '../../constants/userConstants';
import { toast } from 'react-toastify';
import OrdersTable from '../../features/orders/OrdersTable';
import { FormatDate } from '../../utilities/FormatNumber';
import Meta from '../../components/Meta';

const UserDetailsPage = () => {
  const params = useParams();
  const userId = params.userId;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const orderUserList = useSelector((state) => state.orderUserList);
  const { orders, loading: loadingOrders, error: errorOrders } = orderUserList;

  useEffect(() => {
    dispatch(listUserOrders(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    dispatch({ type: USER_UPDATE_RESET });
    dispatch(getUserDetails(userId));
  }, [dispatch, userId]);

  return (
    <>
      <Meta title='Inteli|gets | Admin' />
      <Link to='/admin/users' className='btn btn-light my-3'>
        Go Back
      </Link>
      <Row className='g-5'>
        <Col md={4}>
          {error && <Message variant='danger'>{error}</Message>}
          {loading ? (
            <Loader />
          ) : (
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>{user.name}</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Email:</strong>{' '}
                <a href={`mailto:${user.email}`}>{user.email}</a>
              </ListGroup.Item>
              <ListGroup.Item>User Id: {user._id}</ListGroup.Item>
              <ListGroup.Item>
                <strong>Member since:</strong> {FormatDate(user.createdAt)}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Last Updated:</strong> {FormatDate(user.updatedAt)}
              </ListGroup.Item>
              <ListGroupItem>
                <strong>Number of orders:</strong>{' '}
                {loadingOrders ? 'loading...' : orders ? orders.length : 0}
              </ListGroupItem>{' '}
              <ListGroup.Item
                active
                action
                href={`/admin/user/${userId}/edit`}
                className='mt-5'
              >
                Edit User Details
              </ListGroup.Item>
            </ListGroup>
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
            <OrdersTable orders={orders} />
          )}
        </Col>
      </Row>
    </>
  );
};

export default UserDetailsPage;
