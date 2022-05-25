import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PayPalButtonWrapper from './PayPalButtonWrapper';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../../../components/Loader';
import axios from 'axios';
import { payOrder } from '../../../actions/orderActions';

export default function PayPalButton({ order, currency = 'USD' }) {
  const [id, setClientId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const addButtonScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal');
      setClientId(clientId);
    };
    addButtonScript();
  }, []);

  const HandlerPaymentSuccess = (data) => {
    const paymentData = {
      id: data.orderID,
      status: 'paid',
      update_time: `${Date.now()}`,
      payer: { email_address: data.payerID },
    };

    dispatch(payOrder(order._id, paymentData));
  };

  return (
    <div>
      {id ? (
        <PayPalScriptProvider
          options={{
            'client-id': id,
            components: 'buttons',
            currency,
          }}
        >
          <PayPalButtonWrapper
            currency={currency}
            amount={order.totalPrice}
            showSpinner={false}
            handleOnApproveOrder={HandlerPaymentSuccess}
          />
        </PayPalScriptProvider>
      ) : (
        <Loader />
      )}
    </div>
  );
}

PayPalButton.propTypes = {
  order: PropTypes.object.isRequired,
  currency: PropTypes.string,
};
