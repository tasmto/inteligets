import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, ButtonToolbar, ButtonGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { AiFillEye, AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { listUsers } from '../actions/userActions';

const UserListScreen = () => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const { users, loading, error } = userList;

  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch]);
  return (
    <>
      <h1>Users</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : users?.length === 0 ? (
        <Message variant='info'>Seems like there are no users yet</Message>
      ) : (
        <Table striped bordered hover responsive className=' align-middle'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th colSpan='100%'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>{user.isAdmin ? 'Admin' : 'Customer'}</td>
                <td>
                  <ButtonToolbar aria-label='Actions'>
                    <ButtonGroup>
                      <LinkContainer to={`/user/${user._id}`}>
                        <Button
                          size='sm'
                          variant='info'
                          title='view user details'
                        >
                          <AiFillEye className='icon' />
                        </Button>
                      </LinkContainer>

                      <LinkContainer to={`/user/${user._id}/edit`}>
                        <Button
                          size='sm'
                          variant='primary'
                          title='Edit user details'
                        >
                          <AiFillEdit className='icon' />
                        </Button>
                      </LinkContainer>

                      <LinkContainer to={`/user/${user._id}/delete`}>
                        <Button size='sm' variant='danger' title='delete user'>
                          <AiFillDelete className='icon' />
                        </Button>
                      </LinkContainer>
                    </ButtonGroup>
                  </ButtonToolbar>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListScreen;
