import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Pagination, Row, Spinner } from 'react-bootstrap';
import { listProducts } from '../actions/productActions';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import PaginationComponent from '../features/pagination/PaginationComponent';
import ProductCarousel from '../features/sliders/ProductCarousel';
import Meta from '../components/Meta';
import HomePageHero from '../features/heros/HomePageHero';

const HomePage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const searchTerm = params.keyword;
  const pageNumber = params.pageNumber || 1;

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  // * Find products
  useEffect(() => {
    dispatch(listProducts(searchTerm, pageNumber));
  }, [dispatch, searchTerm, pageNumber]);

  return (
    <>
      <Meta />

      {searchTerm ? (
        <Link className='btn btn-light' to='/'>
          Go Back
        </Link>
      ) : (
        <HomePageHero />
      )}
      <h1 className='mt-3 mt-md-5 mb-1'>
        {searchTerm ? (
          <span>
            Searching for: <i className='text-secondary'>"{searchTerm}"</i>
          </span>
        ) : (
          'Latest Products:'
        )}
      </h1>
      {loading ? (
        <h2>
          <Loader />
        </h2>
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((item) => (
              <Col key={item._id} sm={12} md={6} lg={4}>
                {loading ? <Spinner /> : <Product product={item} />}
              </Col>
            ))}
          </Row>
          <PaginationComponent pages={pages} page={page} keyword={searchTerm} />
        </>
      )}
      {!searchTerm && <ProductCarousel />}
    </>
  );
};

export default HomePage;
