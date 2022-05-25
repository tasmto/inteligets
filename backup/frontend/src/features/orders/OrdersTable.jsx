import React from 'react';
import { AiFillEye } from 'react-icons/ai';
import { Form, Button, Row, Col, Placeholder, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FormatCurrency, FormatDate } from '../../utilities/FormatNumber';

const OrdersTable = ({ orders }) => {
  return (
    <Table striped bordered hover responsive className='table-sm align-middle'>
      <thead>
        <tr>
          <th>Items</th>
          <th>Date</th>
          <th>Total</th>
          <th>Paid</th>
          <th>Delivered</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {orders &&
          orders.map((order) => (
            <tr key={order._id}>
              <td>{order.orderItems.length}</td>
              {/* ! Format these correctly */}
              <td>{FormatDate(order.createdAt, { weekday: 'long' })}</td>
              <td>{FormatCurrency(order.totalPrice)}</td>
              {/* Display icon instead */}
              <td>{order.isPaid ? 'Paid' : 'Not Paid'}</td>
              <td>{order.isDelivered ? 'Delivered' : 'Not delivered'}</td>
              <td>
                <LinkContainer to={`/order/${order._id}`}>
                  <Button variant='light' size='sm' title='View order'>
                    <AiFillEye className='icon' /> Details
                  </Button>
                </LinkContainer>
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

export default OrdersTable;
