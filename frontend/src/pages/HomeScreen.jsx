import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Product from '../components/Product';
import axios from 'axios';

const HomeScreen = () => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/api/products');
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

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