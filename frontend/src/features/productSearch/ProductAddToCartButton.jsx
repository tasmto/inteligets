import React, { useState, useEffect } from 'react';
import { Card, Row, Col } from 'react-bootstrap';

import { motion, AnimatePresence } from 'framer-motion';

import { addToCart, removeFromCart } from '../../actions/cartActions';
import { RiShoppingBag2Fill, RiShoppingBag3Fill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';

const ProductAddToCartButton = ({ product }) => {
  const dispatch = useDispatch();
  const [productsInCart, setProductsInCart] = useState(false);
  const animations = {
    hoverIn: {
      y: -2,
      scale: 0.95,
    },
    hoverOut: {
      y: 2,
      scale: 0.95,
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
          style={{ originX: 0 }}
        >
          <RiShoppingBag2Fill
            className='icon-xl text-warning pointer'
            onClick={removeFromCartHandler}
            title='Add to cart'
          />
        </motion.div>
      ) : (
        <motion.div
          whileHover={animations.hoverIn}
          initial={animations.initialIn}
          animate={animations.animateIn}
          exit={animations.exitIn}
          style={{ originX: 0 }}
        >
          <RiShoppingBag3Fill
            className='icon-xl text-muted pointer'
            onClick={addToCartHandler}
            title='Remove from cart'
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductAddToCartButton;
