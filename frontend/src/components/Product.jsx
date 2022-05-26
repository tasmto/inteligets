import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

import { Link } from 'react-router-dom';

import { RiStarFill } from 'react-icons/ri';

import ProductAddToCartButton from '../features/productSearch/ProductAddToCartButton';
import { trimString } from '../utilities/FormatString';

export default function Product({ product }) {
  return (
    <Card className='my-3 p-3 rounded border border-light'>
      <Link to={`/product/${product._id}`} className='position-relative'>
        <p className='badge bg-light  rounded-pill p-2 px-3  m-2 position-absolute top-0'>
          {product.rating} <RiStarFill className='ms-2 text-warning' />
        </p>

        <Card.Img src={product.image} variant='top' className='rounded-3 ' />
      </Link>
      <Card.Body className='mt-3'>
        <Row>
          <Col>
            <Link
              to={`/product/${product._id}`}
              className='text-decoration-none'
            >
              <Card.Title as='div' className=' mb-2'>
                {trimString(product.name)}
              </Card.Title>

              <Card.Text as='h3'>${product.price}</Card.Text>
            </Link>
          </Col>
          <Col sm={2}>
            <ProductAddToCartButton product={product} />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
