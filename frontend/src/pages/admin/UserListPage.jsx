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

const UserListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deleteStaged, setDeleteStaged] = useState(null);
  const userList = useSelector((state) => state.userList);
  const { users, loading, error } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete, error: errorDelete } = userDelete;

  const deleteHandler = (userId) => {
    if (deleteStaged?.id) dispatch(deleteUser(deleteStaged?.id));
  };

  useEffect(() => {
    if (!userInfo?.isAdmin) navigate('/login');
  }, [userInfo]);

  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch, successDelete, errorDelete]);

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
                      <LinkContainer to={`/admin/user/${user._id}`}>
                        <Button
                          size='sm'
                          variant='info'
                          title='view user details'
                        >
                          <AiFillEye className='icon' />
                        </Button>
                      </LinkContainer>

                      <LinkContainer to={`/admin/user/${user._id}/edit`}>
                        <Button
                          size='sm'
                          variant='primary'
                          title='Edit user details'
                        >
                          <AiFillEdit className='icon' />
                        </Button>
                      </LinkContainer>

                      <Button
                        disabled={
                          user.isAdmin || user.email.includes('customer')
                        }
                        size='sm'
                        variant='danger'
                        title={
                          user.isAdmin
                            ? "Unfortunately I can't let you delete an admin"
                            : 'delete user'
                        }
                        onClick={() =>
                          setDeleteStaged({ id: user._id, name: user.name })
                        }
                      >
                        <AiFillDelete className='icon' />
                      </Button>
                    </ButtonGroup>
                  </ButtonToolbar>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {deleteStaged && (
        <CustomModal
          type='confirm'
          title='Delete profile?'
          onConfirm={() => deleteHandler()}
          onCancel={() => setDeleteStaged(null)}
        >
          Are you sure you want to delete{' '}
          <strong>{deleteStaged?.name}'s</strong> profile?
        </CustomModal>
      )}
    </>
  );
};

export default UserListPage;
