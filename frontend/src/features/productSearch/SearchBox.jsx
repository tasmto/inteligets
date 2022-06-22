import React, { useState } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';

const SearchBox = ({ history }) => {
  const [searchTerm, SetSearchTerm] = useState('');
  const navigate = useNavigate();

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return navigate('/');
    return navigate(`/search/${searchTerm}`);
  };
  return (
    <Form
      onSubmit={searchSubmitHandler}
      className='d-flex d-sm:flex d-md-none d-lg-flex'
    >
      <Form.Control
        type='search'
        name='query'
        onChange={(e) => SetSearchTerm(e.target.value)}
        placeholder='Search Products...'
        className='me-2 border border-muted'
      ></Form.Control>

      <Button
        onClick={searchSubmitHandler}
        type='submit'
        variant='outline-success'
      >
        <FiSearch className='icon' />
      </Button>
    </Form>
  );
};

export default SearchBox;
