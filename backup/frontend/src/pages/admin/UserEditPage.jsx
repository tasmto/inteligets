import React, { useState, useEffect } from 'react';
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { Form, Button, Row, Col, Placeholder } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { getUserDetails, updateUser } from '../../actions/userActions';
import FormContainer from '../../components/FormContainer';
import { USER_UPDATE_RESET } from '../../constants/userConstants';
import { toast } from 'react-toastify';
import Meta from '../../components/Meta';

const UserEditPage = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const params = useParams();
  const userId = params.userId;
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      toast(`Updated this user's details`);
      navigate(`/admin/user/${userId}`);
    } else if (!user.name || user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [dispatch, user, userId, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, email, name, isAdmin }));
  };

  if (!loading && user._id === userInfo._id)
    return (
      <>
        <Meta title='Inteli|gets | Wait a minute...' />
        <FormContainer>
          <h1>Ummmmm...</h1>
          <p>You can't edit your own profile using this page...</p>
          <Link to='/admin/users' className='btn btn-primary my-3'>
            Back user List
          </Link>{' '}
          <Link to='/profile' className='btn btn-light my-3'>
            Go to my profile page instead
          </Link>
        </FormContainer>
      </>
    );
  return (
    <>
      <Meta title='Inteli|gets | Admin' />
      <Link to='/admin/users' className='btn btn-light my-3'>
        Go Back
      </Link>

      <FormContainer>
        <h1>Edit user details</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {loading ? (
          <Loader />
        ) : (
          <>
            <Form onSubmit={submitHandler} className='gy-3'>
              <Form.Group controlId='name' className='mb-4'>
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type='name'
                  placeholder='Enter your full name...'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='email' className='mb-4'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter your email...'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='isAdmin' className='mb-4'>
                <Form.Check
                  className='user-select-none'
                  type='checkbox'
                  label={`Make them an admin (${isAdmin ? 'yes' : 'no'}).`}
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin((prevState) => !prevState)}
                ></Form.Check>
              </Form.Group>

              <Button
                type='submit'
                variant='primary'
                disabled={email === user.email && name === user.name}
              >
                Update
              </Button>
              <Link to={`/admin/user/${userId}`} className='btn btn-light my-3'>
                View Profile Details
              </Link>
            </Form>
          </>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditPage;
