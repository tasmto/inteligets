import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import { listProducts } from '../actions/productActions';
import Product from '../components/Product';

const HomeScreen = () => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(listProducts());
  // }, [dispatch]);

  const products = [];

  if (!products) return <>Loading</>;
  return (
    <>
      <h1>Latest Products:</h1>
      <Row>
        {products.map((item) => (
          <Col key={item._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={item} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
