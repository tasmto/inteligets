import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, Link, Navigate } from 'react-router-dom';
import {
  Button,
  Placeholder,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import CheckoutSteps from '../../components/CheckoutSteps';
import { createOrder } from '../../actions/orderActions';
import { shippingPrice, taxPercentage } from '../../constants/magicNumbers';

const PlaceOrderPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;
  // Calculate prices
  // * @todo Have these prices formatted using helper hooks and padded to have 2 decimals
  cart.itemsPrice = cart.cartItems.reduce(
    (acc, item) => (acc += item.price * item.qty),
    0
  );
  cart.shippingPrice =
    cart.itemsPrice > shippingPrice.threshold ? 0 : shippingPrice.amount;

  cart.taxPrice = Number((cart.itemsPrice * (taxPercentage / 100)).toFixed(2));

  cart.totalPrice = Number(
    cart.itemsPrice + cart.shippingPrice + cart.taxPrice
  ).toFixed(2);

  useEffect(() => {
    if (success) navigate(`/order/${order.createdOrder._id}`);
  }, [success, order]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.preferredPaymentMethod,
        itemsPrice: cart.itemsPrice,
        taxPrice: cart.taxPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: Number(cart.totalPrice),
      })
    );
  };

  return (
    <>
      <CheckoutSteps />
      <Row>
        <Col md={8} xs={{ order: 'last' }}>
          <ListGroup variant='flush'>
            <ListGroup.Item className='mb-3'>
              <h2>Shipping Address:</h2>
              <ListGroup variant='flush'>
                {Object.entries(cart.shippingAddress).map((field, index) => (
                  <ListGroup.Item key={index}>
                    <strong className='text-capitalize fw-bold'>
                      {field.at(0)}:
                    </strong>{' '}
                    <span>{field.at(1)}</span>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>{cart.preferredPaymentMethod}</p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Products</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
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
                          {item.qty} x {item.price} = {item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
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
                  <Col>Items</Col>
                  <Col>R {cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>
                    {cart.shippingPrice !== 0
                      ? `R ${cart.shippingPrice}`
                      : 'Free!'}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>R {cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col className='fw-bold'>Total</Col>
                  <Col>R {cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {error && (
                <ListGroup.Item>
                  <Message variant='danger'>{error}</Message>
                </ListGroup.Item>
              )}
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Proceed to Payment
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderPage;
