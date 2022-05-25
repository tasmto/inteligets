import React, { useState } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SearchBox = ({ history }) => {
  const [searchTerm, SetSearchTerm] = useState('');
  const navigate = useNavigate();

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return navigate('/');
    return navigate(`/search/${searchTerm}`);
  };
  return (
    <Form onSubmit={searchSubmitHandler} as={Row}>
      <Col>
        <Form.Control
          type='text'
          name='query'
          onChange={(e) => SetSearchTerm(e.target.value)}
          placeholder='Search Products...'
          className='me-sm-0 ms-sm-0'
        ></Form.Control>
      </Col>
      <Col>
        <Button
          onClick={searchSubmitHandler}
          type='submit'
          variant='outline-success'
          className='p-2'
        >
          Search
        </Button>
      </Col>
    </Form>
  );
};

export default SearchBox;
