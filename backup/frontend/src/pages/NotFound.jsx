import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import { Button } from 'react-bootstrap';
import Meta from '../components/Meta';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <FormContainer>
      <Meta title='Proshop | Eish...' />
      <h1 style={{ fontSize: '5rem' }}>Woah there...</h1>
      <p>You seem to have stumbled on a page I haven't made yet...</p>
      <Button
        onClick={() => navigate('/')}
        title='Sorry about that...'
        className='btn btn-block'
      >
        <span>Go back to homepage</span>
      </Button>
    </FormContainer>
  );
};

export default NotFound;
