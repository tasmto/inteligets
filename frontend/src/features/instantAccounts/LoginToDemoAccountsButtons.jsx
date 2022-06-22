import React from 'react';
import { Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { login } from '../../actions/userActions';
import accounts from '../../utilities/LoginDemoAccounts';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const LoginToDemoAccountsButtons = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <ButtonToolbar className='mt-3 d-md-flex w-100'>
      <ButtonGroup className='mt-1 w-100' size='sm'>
        <Button
          className='btn btn-primary shadow  square'
          type='button'
          onClick={() => {
            toast.success(
              "🎶You've got the power! You are now logged in as an Admin"
            );
            dispatch(
              login(accounts['admin'].email, accounts['admin'].password)
            );
          }}
        >
          Login as an Admin
        </Button>
        <Button
          className='btn btn-info shadow square'
          type='button'
          onClick={() => {
            toast.success(
              'You are now logged in as an Customer (🕸 with moderate power comes moderate...)'
            );
            dispatch(
              login(accounts['customer'].email, accounts['customer'].password)
            );
          }}
        >
          Login as a regular user
        </Button>

        <Button
          className='btn btn-warning shadow-lg square'
          type='button'
          onClick={() => {
            navigate('/register');
          }}
        >
          Create my own account
        </Button>
      </ButtonGroup>
    </ButtonToolbar>
  );
};

export default LoginToDemoAccountsButtons;
