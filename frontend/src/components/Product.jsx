import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

import { Link, useNavigate } from 'react-router-dom';

import { RiStarFill } from 'react-icons/ri';

import ProductAddToCartButton from '../features/productSearch/ProductAddToCartButton';
import { trimString } from '../utilities/FormatString';

export default function Product({ product }) {
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (!e.target.closest('.addToCard')) navigate(`/product/${product._id}`);
  };
  return (
    <Card className='my-3 p-3 rounded border border-light'>
      <a
        onClick={handleClick}
        className='position-relative'
        style={{ cursor: 'pointer' }}
      >
        <p className='badge bg-light  rounded-pill p-2 px-3  m-2 position-absolute top-0'>
          {product.rating} <RiStarFill className='ms-2 text-warning' />
        </p>
        <div
          className='position-absolute addToCard bottom-0 end-0'
          style={{
            transform: 'translateY(-20px) translateX(-20px)',
            zIndex: '5',
          }}
        >
          <ProductAddToCartButton product={product} />
        </div>

        <Card.Img
          loading='lazy'
          src={product.image}
          variant='top'
          className='rounded-3 '
          bg='dark'
          style={{ minHeight: '250px' }}
        />
      </a>
      <Card.Body className='mt-1'>
        <Link to={`/product/${product._id}`} className='text-decoration-none'>
          <Row className='justify-content-between'>
            <Col>
              <Card.Title as='div' className=' mb-2'>
                {trimString(product.name)}
              </Card.Title>
            </Col>
            <Col>
              <Card.Text as='h3'>${product.price}</Card.Text>
            </Col>
          </Row>
        </Link>
      </Card.Body>
    </Card>
  );
}
