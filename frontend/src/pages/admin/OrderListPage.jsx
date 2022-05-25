import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, ButtonToolbar, ButtonGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { AiFillEye, AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { deleteUser, listUsers } from '../../actions/userActions';
import CustomModal from '../../features/modals/Modal';
import { listOrders } from '../../actions/orderActions';
import { FormatCurrency, FormatDate } from '../../utilities/FormatNumber';
import Meta from '../../components/Meta';

const OrderListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderList = useSelector((state) => state.orderList);
  const { orders, loading, error } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo?.isAdmin) {
      toast.error('you need to be logged in to see this page');
      navigate('/login');
    } else dispatch(listOrders());
  }, [userInfo, dispatch]);

  return (
    <>
      <Meta title='Inteli|gets | Admin' />
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : orders?.length === 0 ? (
        <Message variant='info'>Seems like there are no orders yet</Message>
      ) : (
        <Table
          striped
          bordered
          hover
          responsive
          className=' align-middle table-sm'
        >
          <thead>
            <tr>
              <th>User</th>
              <th>Date</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Delivered</th>
              <th>City</th>
              <th colSpan='100%'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.user.name}</td>
                <td>{FormatDate(order.createdAt)}</td>
                <td>{FormatCurrency(order.totalPrice)}</td>
                <td>{order.isPaid ? 'Paid' : 'Not Paid'}</td>
                <td>{order.isDelivered ? 'Delivered' : 'Not Delivered'}</td>
                <td>{order.shippingAddress.city}</td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button
                      size='sm'
                      variant='light'
                      title='view order details'
                    >
                      <AiFillEye className='icon' /> View
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListPage;
