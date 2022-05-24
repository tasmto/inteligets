import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Form, Button, Placeholder } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import FormContainer from '../../components/FormContainer';
import { saveShippingAddress } from '../../actions/cartActions';
import CheckoutSteps from '../../components/CheckoutSteps';
import Meta from '../../components/Meta';

const ShippingPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [address, setAddress] = useState({
    street: shippingAddress?.street || '',
    city: shippingAddress?.city || '',
    postalCode: shippingAddress?.postalCode || '',
    country: shippingAddress?.country || '',
    notes: shippingAddress?.notes || '',
  });
  const handleMutate = (e) => {
    setAddress((curData) => {
      return { ...curData, [e.target.id]: e.target.value };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress(address));
    navigate('/payment');
  };
  return (
    <>
      <Meta title='Proshop | Checkout' />
      <CheckoutSteps />
      <FormContainer>
        <h1>Shipping</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId='street' className='mb-4'>
            <Form.Label>Street Name and Number</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter your street number and name...'
              required
              value={address.street}
              onChange={handleMutate}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='city' className='mb-4'>
            <Form.Label>City</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter your city name...'
              required
              value={address.city}
              onChange={handleMutate}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='postalCode' className='mb-4'>
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              type='number'
              placeholder='Enter your postal code name...'
              required
              value={address.postalCode}
              onChange={handleMutate}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='country' className='mb-4'>
            <Form.Label>Country</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter your country name...'
              required
              value={address.country}
              onChange={handleMutate}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='notes' className='mb-4'>
            <Form.Label>Any special delivery notices?</Form.Label>
            <Form.Control
              type='textarea'
              placeholder='i.e. call before delivering...'
              required
              value={address.notes}
              onChange={handleMutate}
            ></Form.Control>
          </Form.Group>
          <Button type='submit' variant='primary'>
            Continue
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ShippingPage;
