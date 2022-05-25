import React, { PropTypes, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import {
  Modal,
  Button,
  Container,
  Col,
  Row,
  ListGroup,
  Form,
  Image,
} from 'react-bootstrap';
import Message from '../../components/Message';
import { addToCart, removeFromCart } from '../../actions/cartActions';
import { FormatCurrency } from '../../utilities/FormatNumber';

const CartModal = ({ showPopUp, toggle }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const handleClose = () => {
    toggle(false);
    console.log(123);
  };
  const handleConfirm = () => {
    toggle(false);
    console.log(123);
  };

  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  };

  return (
    <Modal
      show={showPopUp}
      onHide={handleClose}
      className='modal-dialog-scrollable cart-popup'
      keyboard={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>Your Cart ({cartItems?.length || 0})</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {' '}
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <ListGroup.Item key={item.product} className='my-2' variant='flush'>
              <Row className='g-3'>
                <Col xs={2}>
                  <Image src={item.image} alt={item.name} fluid rounded />
                </Col>
                <Col xs={4}>
                  <Link to={`/product/${item.product}`}>{item.name}</Link>
                </Col>
                <Col xs={2}>{FormatCurrency(item.price)}</Col>
                <Col xs={2}>
                  <Form.Control
                    as='select'
                    value={item.qty}
                    onChange={(e) => {
                      dispatch(addToCart(item.product, Number(e.target.value)));
                    }}
                  >
                    {[...Array(item.countInStock).keys()].map((count) => (
                      <option key={count + 1} value={count + 1}>
                        {count + 1}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
                <Col xs={2}>
                  <Button
                    type='button'
                    variant='light'
                    onClick={() => removeFromCartHandler(item.product)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))
        ) : (
          <Message variant='warning'>No Items in your Cart yet</Message>
        )}
      </Modal.Body>
      <Modal.Footer>
        {cartItems.length > 0 ? (
          <Button
            variant='success'
            size='block'
            onClick={() => {
              navigate('/cart');
              handleClose();
            }}
          >
            Go to Cart (
            {FormatCurrency(
              cartItems.reduce((total, item) => {
                return (total += Number(item.qty * item.price));
              }, 0)
            )}
            )
          </Button>
        ) : (
          <Button
            variant='primary'
            size='block'
            onClick={() => {
              navigate('/');
              handleClose();
            }}
          >
            Go to Shop
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default CartModal;
