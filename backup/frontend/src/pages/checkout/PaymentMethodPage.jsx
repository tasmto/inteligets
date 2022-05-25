import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Form, Button, Placeholder, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import FormContainer from '../../components/FormContainer';
import { savePaymentMethod } from '../../actions/cartActions';
import CheckoutSteps from '../../components/CheckoutSteps';
import Meta from '../../components/Meta';

const PaymentMethodPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, preferredPaymentMethod } = cart;

  useEffect(() => {
    //   If there is no shipping address go back to shipping
    if (!shippingAddress) navigate('/shipping');
  }, [shippingAddress]);

  const [paymentMethod, setPaymentMethod] = useState(preferredPaymentMethod);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/order');
  };
  return (
    <>
      <Meta title='Inteli|gets | Choose payment method' />
      <CheckoutSteps />
      <FormContainer>
        <h1>Payment Methods:</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-5'>
            <Form.Label as='legend'>Select Method</Form.Label>
            <Col>
              <Form.Check
                type='radio'
                label='Paypal or Credit Card'
                id='PayPal'
                name='paymentMethod'
                value='PayPal'
                checked={paymentMethod === 'PayPal'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
              {/* <Form.Check
                type='radio'
                label='Stripe'
                id='Stripe'
                name='paymentMethod'
                checked={paymentMethod === 'Stripe'}
                value='Stripe'
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check> */}
            </Col>
          </Form.Group>

          <Button type='submit' variant='primary'>
            Continue
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default PaymentMethodPage;
