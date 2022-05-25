import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { Form, Button, Row, Col, Placeholder } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { listProductDetails } from '../../actions/productActions';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_UPDATE_RESET,
} from '../../constants/productConstants';
import { updateProduct } from '../../actions/productActions';
import Meta from '../../components/Meta';

const ProductEditPage = () => {
  const [productData, setProductData] = useState({
    name: '',
    price: 0,
    brand: '',
    countInStock: 0,
    image: '',
    category: '',
    description: '',
  });
  const [uploading, setUploading] = useState(false);

  const params = useParams();
  const productId = params.productId;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  //* In case some sneaks are trying to see this page when they shouldn't and reset the product create store so that there are no conflicts
  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (!userInfo.isAdmin) {
      toast.warning('You must be an admin to see this page');
      navigate('/login');
    }
  }, [userInfo]);

  //*   Setting the form fields if the product details are recieved else fetching the product details first
  useEffect(() => {
    if (product?._id !== productId) dispatch(listProductDetails(productId));
    else
      setProductData({
        name: product.name,
        price: product.price,
        brand: product.brand,
        countInStock: product.countInStock,
        image: product.image,
        category: product.category,
        description: product.description,
      });
  }, [dispatch, product, productId]);

  //*   When the product is updated
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      toast.success('Product successfully edited');
      navigate(`/admin/product/${productId}`);
    }
  }, [successUpdate]);

  //*   When a field is edited
  const handleMutate = (e) => {
    setProductData((currentData) => {
      return {
        ...currentData,
        [e.target.id]: e.target.value,
      };
    });
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const { data } = await axios.post('/api/upload', formData, config);
      setProductData((currentData) => {
        return {
          ...currentData,
          image: data,
        };
      });
      setUploading(false);
    } catch (error) {
      toast.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateProduct({ ...productData, _id: productId }));
  };

  return (
    <>
      <Meta title='Inteli|gets | Admin' />
      <Link to='/admin/products' className='btn btn-light my-3'>
        Go Back
      </Link>

      <FormContainer>
        <h1>Edit product</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {loading || loadingUpdate ? (
          <Loader />
        ) : (
          <>
            {errorUpdate && <Message>{errorUpdate}</Message>}
            <Form onSubmit={submitHandler} className='gy-3'>
              <Form.Group controlId='name' className='mb-4'>
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter product name...'
                  value={productData.name}
                  onChange={handleMutate}
                ></Form.Control>
              </Form.Group>
              <Row className='mb-3'>
                <Form.Group controlId='price' className='mb-4' as={Col}>
                  <Form.Label>Product Price</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Enter price...'
                    value={productData.price}
                    onChange={handleMutate}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId='countInStock' className='mb-4' as={Col}>
                  <Form.Label>Inventory</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='How much do you have in stock?'
                    value={productData.countInStock}
                    onChange={handleMutate}
                  ></Form.Control>
                </Form.Group>
              </Row>
              <Row className='mb-3'>
                <Form.Group controlId='brand' className='mb-4' as={Col}>
                  <Form.Label>Brand</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Brand name...'
                    value={productData.brand}
                    onChange={handleMutate}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId='category' className='mb-4' as={Col}>
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Category name...'
                    value={productData.category}
                    onChange={handleMutate}
                  ></Form.Control>
                </Form.Group>
              </Row>
              <Form.Group controlId='description' className='mb-4'>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as='textarea'
                  rows={3}
                  placeholder='Explain what the product is'
                  value={productData.description}
                  onChange={handleMutate}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='image' className='mb-4'>
                <Form.Label>image</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='url of the image'
                  value={productData.image}
                  onChange={handleMutate}
                  disabled={true}
                ></Form.Control>
                <Form.Control
                  //   id='image-file'
                  type='file'
                  label='Choose a file'
                  onChange={uploadFileHandler}
                ></Form.Control>
                {uploading && <Loader />}
              </Form.Group>

              <Button type='submit' variant='primary'>
                Update Product
              </Button>
              {/* <Link
                to={`/admin/product/${productId}`}
                className='btn btn-secondary my-3'
              >
                Product Stats
              </Link> */}
              <Link
                to={`/product/${productId}`}
                className='btn btn-secondary my-3'
              >
                Live Product
              </Link>
            </Form>
          </>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditPage;
