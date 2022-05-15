import React, { useEffect } from 'react';
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import {
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Image,
  Form,
  Button,
  Card,
} from 'react-bootstrap';
import { addToCart } from '../actions/cartActions';
import { calcLength } from 'framer-motion';

const Cart = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const qty = Number(searchParams.get('qty')) || 1;

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (params.productId) dispatch(addToCart(params.productId, qty));
  }, [params.productId, dispatch]);

  const removeFromCartHandler = (id) => {
    console.log('remove');
  };
  return (
    <Row>
      <Col md={12}>
        <h1>Shopping Cart:</h1>
        {/* @todo have a gif in the cart empty */}
        {cartItems.length === 0 ? (
          <Message>
            Your Cart is empty
            <Button variant='link' onclick={() => navigate(-1)}>
              Go back
            </Button>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={3}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>R {item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as='select'
                      value={item.qty}
                      onChange={(e) => {
                        console.log(e.target.value);
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        );
                      }}
                    >
                      {[...Array(item.countInStock).keys()].map((count) => (
                        <option key={count + 1} value={count + 1}>
                          {count + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
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
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={2}></Col>
      <Col md={2}></Col>
    </Row>
  );
};

export default Cart;