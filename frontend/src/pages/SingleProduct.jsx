import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import Rating from '../components/Rating';
import axios from 'axios';

const SingleProduct = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`/api/products/${params.productId}`);
        setProduct(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [params.productId]);

  const constraintsRef = useRef(null);

  return (
    <>
      <Link to='/' className='btn btn-light my-3'>
        Go Back
      </Link>
      <Row>
        <Col
          md={6}
          className={`overflow-hidden rounded ${loading && 'placeholder-glow'}`}
        >
          <motion.div
            whileHover={{
              x: 0,
              y: 10,
              scale: 1.25,
            }}
            ref={constraintsRef}
            className='product-canvas-image--outer'
          >
            <motion.div
              whileHover={{
                x: 0,
                y: 10,
                scale: 1.25,
              }}
              drag
              dragConstraints={constraintsRef}
            >
              <Image
                style={{ pointerEvents: 'none' }}
                src={product?.image}
                alt={product?.name}
                fluid
                className={`product-canvas-image img-fluid ${
                  loading && 'placeholder'
                } `}
              />
            </motion.div>
          </motion.div>
        </Col>
        <Col md={6}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              {loading ? (
                <p className='placeholder-glow my-3'>
                  <span className='mb-2 placeholder placeholder-lg col-9 bg-primary'></span>
                  <span className='my-2 placeholder placeholder-lg col-11 bg-primary '></span>
                  <span className='my-2 placeholder placeholder-lg col-6 bg-primary '></span>
                </p>
              ) : (
                <h3>{product.name}</h3>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              {loading ? (
                <p className='placeholder-glow my-3'>
                  <span className='placeholder placeholder-lg col-7 bg-primary me-4'></span>
                  <span className='placeholder placeholder-lg col-4 bg-primary '></span>
                </p>
              ) : (
                <Rating
                  rating={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              )}
              {/* Write reviews */}
            </ListGroup.Item>
            <ListGroup.Item>
              <Row className='my-3'>
                {loading ? (
                  <p className='placeholder-glow mb-0'>
                    <span className='placeholder placeholder-lg  col-4 bg-primary me-4'></span>
                    <span className='placeholder  placeholder-lg col-6 bg-primary'></span>
                  </p>
                ) : (
                  <>
                    <h4>Price: ${product.price}</h4>
                    <p className='pb-0'>
                      Status:
                      {product.countInStock > 0 ? ' In stock' : ' Out of Stock'}
                    </p>
                  </>
                )}
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              {loading ? (
                <div className='placeholder-wave'>
                  <Button
                    tabIndex={-1}
                    className='btn btn-primary disabled placeholder col-12 bg-primary'
                  ></Button>
                </div>
              ) : (
                <button
                  disabled={product.countInStock === 0}
                  className='btn btn-primary btn-block my-3 rounded-pill'
                  type='button'
                >
                  Add to cart
                </button>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              {loading ? (
                <p className='mt-3 placeholder-glow'>
                  <span className='placeholder col-12'></span>
                  <span className='placeholder col-10'></span>
                  <span className='placeholder col-11'></span>
                  <span className='placeholder col-8'></span>
                </p>
              ) : (
                <p className='mt-3'>Description: {product.description}</p>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        {/* Add to cart */}
      </Row>
    </>
  );
};

export default SingleProduct;
