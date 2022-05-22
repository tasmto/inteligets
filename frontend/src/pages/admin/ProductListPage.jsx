import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Table,
  Button,
  ButtonToolbar,
  ButtonGroup,
  Row,
  Col,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {
  AiFillEye,
  AiFillEdit,
  AiFillDelete,
  AiOutlinePlusCircle,
} from 'react-icons/ai';
import { listProducts } from '../../actions/productActions';
import CustomModal from '../../features/modals/Modal';
import { FormatCurrency } from '../../utilities/FormatNumber';

const ProductListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deleteStaged, setDeleteStaged] = useState(null);
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const deleteHandler = () => {
    // if (deleteStaged?.id) dispatch();
    console.log(deleteStaged);
    setDeleteStaged(null);
  };

  useEffect(() => {
    if (!userInfo?.isAdmin) navigate('/login');
  }, [userInfo]);

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const createProductHandler = () => {};

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right' style={{ textAlign: 'right' }}>
          <Button className='my-3  btn-sm' onClick={createProductHandler}>
            <AiOutlinePlusCircle className='icon me-2' />{' '}
            <span>New Product</span>
          </Button>
        </Col>
      </Row>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : products?.length === 0 ? (
        <Message variant='info'>Seems like there are no products yet</Message>
      ) : (
        <Table
          striped
          bordered
          hover
          responsive
          className='table-sm align-middle'
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th colSpan='100%'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{FormatCurrency(product.price)}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <ButtonToolbar aria-label='Actions'>
                    <ButtonGroup>
                      <LinkContainer to={`/admin/product/${product._id}`}>
                        <Button
                          size='sm'
                          variant='info'
                          title='view product details'
                        >
                          <AiFillEye className='icon' />
                        </Button>
                      </LinkContainer>

                      <LinkContainer to={`/admin/product/${product._id}/edit`}>
                        <Button
                          size='sm'
                          variant='primary'
                          title='Edit product'
                        >
                          <AiFillEdit className='icon' />
                        </Button>
                      </LinkContainer>

                      <Button
                        size='sm'
                        variant='danger'
                        title='delete product'
                        onClick={() =>
                          setDeleteStaged({
                            id: product._id,
                            name: product.name,
                          })
                        }
                      >
                        <AiFillDelete className='icon' />
                      </Button>
                    </ButtonGroup>
                  </ButtonToolbar>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {deleteStaged && (
        <CustomModal
          type='confirm'
          title='Delete product?'
          onConfirm={() => deleteHandler()}
          onCancel={() => setDeleteStaged(null)}
        >
          Are you sure you want to delete the
          <strong>{deleteStaged?.name}</strong>?
        </CustomModal>
      )}
    </>
  );
};

export default ProductListPage;
