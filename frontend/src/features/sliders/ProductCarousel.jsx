import React, { useEffect } from 'react';
import { Carousel, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { listTopProducts } from '../../actions/productActions';
import { FormatCurrency } from '../../utilities/FormatNumber';
import { trimString } from '../../utilities/FormatString';

const ProductCarousel = () => {
  const dispatch = useDispatch();
  const productTopRated = useSelector((state) => state.productTopRated);
  const { products, error, loading } = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts(4));
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? null : (
    <Carousel pause='hover' className='bg-dark'>
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>
                {trimString(product.name, 30)} ({FormatCurrency(product.price)})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
