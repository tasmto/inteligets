import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { deliverOrder, getOrderDetails } from '../../actions/orderActions';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import {
  Button,
  Placeholder,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
} from 'react-bootstrap';
import PayPalButton from '../../features/payments/paypal/PayPalButton';
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from '../../constants/orderConstants';
import Meta from '../../components/Meta';

const SingleOrderPage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, order, error } = orderDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    loading: loadingDeliver,
    success: successDeliver,
    error: errorDeliver,
  } = orderDeliver;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  useEffect(() => {
    dispatch(getOrderDetails(params.orderId));
  }, [params.orderId, dispatch, successPay, successDeliver]);

  // * Reset the order deliver and pay every time the page loads
  useEffect(() => {
    dispatch({ type: ORDER_DELIVER_RESET });
    dispatch({ type: ORDER_PAY_RESET });
  }, []);

  const markOrderAsDeliveredHandler = () => {
    dispatch({ type: ORDER_DELIVER_RESET });
    dispatch(deliverOrder(params.orderId));
  };

  return (
    <>
      <Meta title='Inteli|gets | Order' />
      {error ? (
        <Message variant='danger'>{error}</Message>
      ) : loading || loadingDeliver ? (
        <Loader />
      ) : loadingPay ? (
        <Loader />
      ) : (
        <>
          <h1>Order Details</h1>
          <Row className='gy-2 gx-3'>
            <Col md={8}>
              <ListGroup variant='flush'>
                <ListGroup.Item className='mb-3'>
                  <h2>Shipping Address:</h2>
                  <p>
                    Name: <strong>{order.user.name}</strong>
                  </p>
                  <p>
                    Email:{' '}
                    <a href={`mailto:${order.user.email}`}>
                      {order.user.email}
                    </a>
                  </p>
                  <p>
                    Address: {order.shippingAddress.street},{' '}
                    {order.shippingAddress.city},{' '}
                    {order.shippingAddress.country},{' '}
                    {order.shippingAddress.postalCode}
                  </p>
                  {order.isDelivered ? (
                    <Message variant='success'>
                      Delivered on: {order?.deliveredAt}
                    </Message>
                  ) : (
                    <>
                      <Message variant='dark'>
                        <span>Not delivered</span>
                      </Message>
                      {userInfo.isAdmin && (
                        <Button
                          className='btn-block'
                          onClick={markOrderAsDeliveredHandler}
                        >
                          Mark as delivered
                        </Button>
                      )}
                    </>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h2>Order</h2>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Payment Method</Col>
                      <Col>{order.paymentMethod}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>
                        {order.shippingPrice !== 0
                          ? `R ${order.shippingPrice}`
                          : 'Free!'}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Tax</Col>
                      <Col>R {order.taxPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col className='fw-bold'>Total</Col>
                      <Col>R {order.totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  {!order.isPaid && (
                    <ListGroup.Item>
                      {loadingPay ? <Loader /> : <PayPalButton order={order} />}
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Card>

              {order.isPaid ? (
                <Message variant='success'>Paid on: {order?.paidAt}</Message>
              ) : (
                <Message variant='warning'>Not paid yet</Message>
              )}
            </Col>

            <Col md={12}>
              <h2>Products</h2>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  {order.orderItems.length === 0 ? (
                    <Message>Order is empty</Message>
                  ) : (
                    <ListGroup variant='flush'>
                      {order.orderItems.map((item, index) => (
                        <ListGroup.Item key={index}>
                          <Row>
                            <Col md={2} xl={1}>
                              <Image
                                src={item.image}
                                alt={item.name}
                                fluid
                                rounded
                              />
                            </Col>
                            <Col>
                              <Link to={`/product/${item.product}`}>
                                {item.name}
                              </Link>
                            </Col>
                            <Col md={4}>
                              {item.qty} x {item.price} ={' '}
                              {item.qty * item.price}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default SingleOrderPage;
