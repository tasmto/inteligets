import React, { useState, useEffect } from 'react';
import { Card, Row, Col } from 'react-bootstrap';

import { motion, AnimatePresence } from 'framer-motion';

import { addToCart, removeFromCart } from '../../actions/cartActions';
import { IoBasket, IoBasketOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';

const ProductAddToCartButton = ({ product }) => {
  const dispatch = useDispatch();
  const [productsInCart, setProductsInCart] = useState(false);
  const animations = {
    hoverIn: {
      y: -2,
      scale: 0.98,
    },
    hoverOut: {
      y: 2,
      scale: 0.98,
    },
    initialIn: { rotateX: [40], opacity: 0 },
    animateIn: { rotateX: [40, -10, 0], opacity: 1 },
    exitIn: { rotateX: [0, 40], opacity: [1, 0] },

    initialOut: { rotateX: [-40], opacity: 0 },
    animateOut: { rotateX: [-40, 10, 0], opacity: 1 },
    exitOut: { rotateX: [0, -40], opacity: [1, 0] },
  };

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    setProductsInCart(cartItems.find((item) => item.product === product._id));
  }, [dispatch, cartItems]);

  const addToCartHandler = () => dispatch(addToCart(product._id, 1));
  const removeFromCartHandler = () => dispatch(removeFromCart(product._id));
  return (
    <AnimatePresence initial={false} exitBeforeEnter={false}>
      {productsInCart ? (
        <motion.div
          whileHover={animations.hoverOut}
          initial={animations.initialOut}
          animate={animations.animateOut}
          exit={animations.exitOut}
          style={{
            originX: 0,
            backgroundColor: 'rgba(255,255,255, 0.9)',
            borderRadius: '5rem',
          }}
          onClick={removeFromCartHandler}
          className='px-3 d-flex border-0 justify-content-center align-items-center'
        >
          <span className='fs-5 me-2 fw-bold ' style={{ originX: 0 }}>
            Remove from cart
          </span>
          <IoBasket className='icon-lg text-warning pointer' />
        </motion.div>
      ) : (
        <motion.div
          whileHover={animations.hoverIn}
          initial={animations.initialIn}
          animate={animations.animateIn}
          exit={animations.exitIn}
          onClick={addToCartHandler}
          style={{
            originX: 0,
            backgroundColor: 'rgba(255,255,255, 0.9)',
            borderRadius: '5rem',
          }}
          className='px-3 d-flex border-0 justify-content-center align-items-center'
        >
          <span className='fs-5 me-2 fw-bold '>Add to cart</span>
          <IoBasketOutline className='icon-lg text-muted pointer' />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductAddToCartButton;
