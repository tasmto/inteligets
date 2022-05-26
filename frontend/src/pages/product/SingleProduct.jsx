import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
  Form,
  FormControl,
} from 'react-bootstrap';
import Rating from '../../components/Rating';
import axios from 'axios';
import LoginToDemoAccountsButtons from '../../features/instantAccounts/LoginToDemoAccountsButtons';
import { useDispatch, useSelector } from 'react-redux';
import {
  listProductDetails,
  createProductReview,
} from '../../actions/productActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../../constants/productConstants';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { FormatDate, FormatCurrency } from '../../utilities/FormatNumber';
import Meta from '../../components/Meta';

const SingleProduct = () => {
  const [qty, setQty] = useState(1);

  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [productReview, setProductReview] = useState({
    rating: 5,
    comment: '',
  });

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, product, error } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const { success: successCreateReview, error: errorCreateReview } =
    productReviewCreate;

  // *Reset review on page load and get product details
  useEffect(() => {
    dispatch(listProductDetails(params.productId));
    dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
  }, [params.productId, successCreateReview]);

  const cartImageContainerRef = useRef(null);

  const addToCartHandler = () => {
    navigate(`/cart/${params.productId}?qty=${qty}`);
  };
  const onMutateWriteReviewForm = (e) => {
    setProductReview((currentData) => {
      return { ...currentData, [e.target.id]: e.target.value };
    });
  };
  const submitReviewHandler = (e) => {
    e.preventDefault();
    dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    dispatch(createProductReview(params.productId, productReview));
  };

  return (
    <>
      {!loading && <Meta title={`Proshop | ${product.name}`} />}
      <Link to='/' className='btn btn-light my-3'>
        Go Back
      </Link>
      {error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            <Col
              md={6}
              className={`overflow-hidden rounded ${
                loading && 'placeholder-glow'
              }`}
            >
              <motion.div
                whileHover={{
                  x: 0,
                  y: 10,
                  scale: 1.25,
                }}
                ref={cartImageContainerRef}
                className='product-canvas-image--outer'
              >
                <motion.div
                  whileHover={{
                    x: 0,
                    y: 10,
                    scale: 1.25,
                  }}
                  drag
                  dragConstraints={cartImageContainerRef}
                >
                  <Image
                    style={{ pointerEvents: 'none' }}
                    src={product?.image}
                    alt={product?.name}
                    fluid
                    className={`product-canvas-image img-fluid   ${
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
                        <h4>Price: {FormatCurrency(product.price)}</h4>
                        <p className='pb-0'>
                          Status:
                          {product.countInStock > 0
                            ? ' In stock'
                            : ' Out of Stock'}
                        </p>
                      </>
                    )}
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row className='py-3'>
                      <Col>
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
                            className='btn btn-primary btn-block '
                            type='button'
                            onClick={addToCartHandler}
                          >
                            {product.countInStock === 0
                              ? 'Out of Stock'
                              : 'Add to cart'}
                          </button>
                        )}
                      </Col>

                      <Col xs='4'>
                        {loading ? (
                          <p className='placeholder-glow mb-0'>
                            <span className='placeholder placeholder-lg  col-2 bg-primary me-4'></span>
                            <span className='placeholder  placeholder-lg col-4 bg-primary'></span>
                          </p>
                        ) : (
                          <Form.Select
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (count) => (
                                <option key={count + 1} value={count + 1}>
                                  {count + 1}
                                </option>
                              )
                            )}
                          </Form.Select>
                        )}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                {userInfo && userInfo.isAdmin && (
                  <ListGroup.Item>
                    <button
                      className='btn btn-outline-primary btn-block '
                      onClick={() =>
                        navigate(`/admin/product/${product._id}/edit`)
                      }
                    >
                      Edit Product
                    </button>
                  </ListGroup.Item>
                )}
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
          </Row>
          <Row className='mt-5 d-flex-md align-items-start'>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 ? (
                <Message>No reviews yet</Message>
              ) : (
                <ListGroup variant='flush'>
                  {product.reviews.map((review) => (
                    <ListGroup.Item key={review._id}>
                      <div className='d-flex align-items-center justify-content-between'>
                        <h5 className='my-2 me-3'>
                          <strong>{review.name}</strong>
                        </h5>
                        <div className='d-flex align-items-center justify-content-between '>
                          <p className='my-3 me-3 text-muted fs-6'>
                            {FormatDate(review.createdAt, {
                              month: 'short',
                              year: 'numeric',
                              weekday: 'long',
                            })}
                          </p>{' '}
                          <Rating rating={review.rating} />
                        </div>
                      </div>

                      <p className='text-secondary'>
                        <strong className='text-primary'>Comment: </strong>
                        {review.comment}
                      </p>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </Col>
            <Col md={6} className='position-sticky'>
              <ListGroup>
                <ListGroup.Item>
                  <h2>Write a Review</h2>

                  {userInfo ? (
                    <Form onSubmit={submitReviewHandler}>
                      <Form.Group controlId='rating' as={Row} className='mb-3'>
                        <Form.Label sm='2'>Rating</Form.Label>
                        <Col>
                          <Form.Control
                            as='select'
                            value={productReview.rating}
                            onChange={onMutateWriteReviewForm}
                          >
                            {[...Array(5)].map((_, count) => (
                              <option key={count + 1} value={count + 1}>
                                {count + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          required
                          onChange={onMutateWriteReviewForm}
                          as='textarea'
                          rows={3}
                          maxLength={300}
                        />
                      </Form.Group>
                      {errorCreateReview && (
                        <Message variant='warning'>{errorCreateReview}</Message>
                      )}
                      <Button
                        type='submit'
                        variant='primary'
                        className='btn-block mt-5'
                      >
                        Submit Review
                      </Button>
                    </Form>
                  ) : (
                    <Message variant='warning'>
                      <p>You need to have an account write a review.</p>
                      <Link to='/login'>Login.</Link>
                      {'  '}
                      <Link to='/register'>Create an account instead.</Link>
                      <LoginToDemoAccountsButtons />
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default SingleProduct;
