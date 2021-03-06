import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Table,
  Button,
  ButtonToolbar,
  ButtonGroup,
  Row,
  Col,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {
  AiFillEye,
  AiFillEdit,
  AiFillDelete,
  AiOutlinePlusCircle,
  AiOutlineAreaChart,
} from 'react-icons/ai';
import {
  createProduct,
  deleteProduct,
  listProducts,
} from '../../actions/productActions';
import CustomModal from '../../features/modals/Modal';
import { FormatCurrency } from '../../utilities/FormatNumber';
import { PRODUCT_CREATE_RESET } from '../../constants/productConstants';
import PaginationComponent from '../../features/pagination/PaginationComponent';
import Meta from '../../components/Meta';

const ProductListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const pageNumber = params.pageNumber || 1;
  const [deleteStaged, setDeleteStaged] = useState(null);
  const productList = useSelector((state) => state.productList);
  const { products, loading, error, page, pages } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const deleteHandler = () => {
    if (deleteStaged?.id) dispatch(deleteProduct(deleteStaged.id));
    toast(`Product (${deleteStaged.name}) successfully deleted.`);
    setDeleteStaged(null);
  };

  // * Guard for sneaks trying to see a page when they dont have admin access
  useEffect(() => {
    if (!userInfo?.isAdmin) navigate('/login');
  }, [userInfo]);

  // * Fetch products when any is deleted,when new page is triggered, created, when new page is selected or on load
  useEffect(() => {
    dispatch(listProducts('', pageNumber));
  }, [dispatch, successDelete, successCreate, createdProduct, pageNumber]);

  useEffect(() => {
    if (successCreate) navigate(`/admin/product/${createdProduct._id}/edit`);
  }, [successCreate]);
  const createProductHandler = () => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    dispatch(createProduct());
  };

  return (
    <>
      <Meta title='Inteli|gets | Admin' />
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
      {loadingDelete && <Loader />}
      {errorDelete && toast.error(`Couldn't delete the ${deleteStaged.name}`)}

      {loadingCreate && <Loader />}
      {errorCreate &&
        toast.error(`Couldn't create a new product, try logging in again.`)}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : products?.length === 0 ? (
        <Message variant='info'>Seems like there are no products yet</Message>
      ) : (
        <>
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
                        <LinkContainer to={`/product/${product._id}`}>
                          <Button
                            size='sm'
                            variant='light'
                            title='view live product'
                          >
                            <AiFillEye className='icon' />
                          </Button>
                        </LinkContainer>
                        {/* @todo products stats page */}
                        {/* <LinkContainer to={`/admin/product/${product._id}}`}>
                          <Button
                            size='sm'
                            variant='info'
                            title='view product details'
                          >
                            <AiOutlineAreaChart className='icon' />
                          </Button>
                        </LinkContainer> */}

                        <LinkContainer
                          to={`/admin/product/${product._id}/edit`}
                        >
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
          <PaginationComponent page={page} pages={pages} isAdmin={true} />
        </>
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
