import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { addToCart, removeFromCart } from '../../actions/cartActions';
import {
  RiShoppingCartFill,
  RiUser6Fill,
  RiLogoutBoxRLine,
  RiLogoutBoxLine,
  RiUserSettingsFill,
  RiStore2Fill,
  RiBarChartFill,
} from 'react-icons/ri';
import { Button } from 'react-bootstrap';
import CartModal from '../modals/CartModal';

const CartHeaderIndicator = () => {
  const dispatch = useDispatch();
  const [itemsInCart, setItemsInCart] = useState(false);
  const [showPopUp, setShowPopup] = useState(false);

  const animations = {
    indicatorInitial: { opacity: 0 },
    indicatorAnimate: { opacity: 1 },
    indicatorExit: { opacity: 0 },
  };

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    setItemsInCart(cartItems.length);
  }, [dispatch, cartItems]);

  return (
    <>
      <Button
        size='sm'
        className='btn btn-link ms-md-3 position-relative'
        onClick={() => setShowPopup((curState) => !curState)}
      >
        <AnimatePresence>
          {itemsInCart > 0 && (
            <motion.span
              animate={animations.indicatorAnimate}
              exit={animations.indicatorExit}
              className='position-absolute  translate-middle badge rounded-pill bg-success'
              style={{ top: '12px', right: '10px', padding: '6px' }}
            >
              <span className='visually-hidden'>{itemsInCart} items</span>
            </motion.span>
          )}
        </AnimatePresence>
        <RiShoppingCartFill
          className={`icon me-1  ${
            itemsInCart > 0 ? 'text-light' : 'text-muted'
          }`}
        />
      </Button>
      <CartModal
        showPopUp={showPopUp}
        toggle={(state) => setShowPopup(state || !showPopUp)}
      />
    </>
  );
};

export default CartHeaderIndicator;
