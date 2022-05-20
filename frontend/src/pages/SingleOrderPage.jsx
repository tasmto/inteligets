import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails } from '../actions/orderActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import {
  Button,
  Placeholder,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
} from 'react-bootstrap';

const SingleOrderPage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, order, error } = orderDetails;

  useEffect(() => {
    dispatch(getOrderDetails(params.orderId));
  }, [params.orderId]);

  return (
    <>
      {error ? (
        <Message variant='danger'>{error}</Message>
      ) : loading ? (
        <Loader />
      ) : (
        <>
          <h1>Order: {order._id}</h1>
          <Row>
            <Col md={8} xs={{ order: 'second' }}>
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
                  <ListGroup variant='flush'>
                    {Object.entries(order.shippingAddress).map(
                      (field, index) => (
                        <ListGroup.Item key={index}>
                          <strong className='text-capitalize fw-bold'>
                            {field.at(0)}:
                          </strong>{' '}
                          <span>{field.at(1)}</span>
                        </ListGroup.Item>
                      )
                    )}
                  </ListGroup>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4} xs={{ order: 'first' }}>
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
                </ListGroup>
              </Card>
            </Col>
            <Col md={12} className='mt-3' xs={{ order: 'last' }}>
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
