import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer, cssTransition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer';
import Header from './components/Header';
import { Container } from 'react-bootstrap';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';
import SingleProduct from './pages/product/SingleProduct';
import Cart from './pages/CartPage';
import LoginPage from './pages/account/LoginPage';
import RegisterPage from './pages/account/RegisterPage';
import ProfilePage from './pages/account/ProfilePage';
import ShippingPage from './pages/checkout/ShippingPage';
import PaymentMethodPage from './pages/checkout/PaymentMethodPage';
import PlaceOrderPage from './pages/checkout/PlaceOrderPage';
import SingleOrderPage from './pages/order/SingleOrderPage';
import UserListPage from './pages/admin/UserListPage';
import UserDetailsPage from './pages/admin/UserDetailsPage';
import ProductListPage from './pages/admin/ProductListPage';
import UserEditPage from './pages/admin/UserEditPage';
import ProductEditPage from './pages/admin/ProductEditPage';

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='*' exact element={<NotFound />} />
            <Route path='/' exact element={<HomePage />} />
            <Route path='/login' exact element={<LoginPage />} />
            <Route path='/profile' exact element={<ProfilePage />} />
            <Route path='/register' exact element={<RegisterPage />} />
            <Route path='/cart/' element={<Cart />} />
            <Route path='/cart/:productId' element={<Cart />} />
            <Route path='/shipping' element={<ShippingPage />} />
            <Route path='/payment' element={<PaymentMethodPage />} />
            <Route path='/order' element={<PlaceOrderPage />} />
            <Route path='/order/:orderId' exact element={<SingleOrderPage />} />
            <Route
              path='/product/:productId'
              exact
              element={<SingleProduct />}
            />

            {/* Admin Pages */}
            <Route path='/admin'>
              <Route path='/admin/products' element={<ProductListPage />} />
              <Route
                path='/admin/product/:productId/edit'
                element={<ProductEditPage />}
              />
              <Route path='/admin/users' element={<UserListPage />} />
              <Route path='/admin/user/:userId' element={<UserDetailsPage />} />

              <Route
                path='/admin/user/:userId/edit'
                element={<UserEditPage />}
              />
            </Route>
          </Routes>
        </Container>

        <ToastContainer
          position='bottom-left'
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </main>
      <Footer />
    </Router>
  );
}

export default App;
