import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/Header';
import { Container } from 'react-bootstrap';
import HomePage from './pages/HomePage';
import SingleProduct from './pages/SingleProduct';
import NotFound from './pages/NotFound';
import Cart from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';

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
            <Route
              path='/product/:productId'
              exact
              element={<SingleProduct />}
            />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;

/*
   <Route path="/about-us">
    <Route path="contact">     <AboutContact/> </Route>
    <Route path="our-logo">    <AboutLogo/>    </Route>
    <Route path="the-mission"> <AboutMission/> </Route>
    <Route path="the-team">    <AboutTeam/>    </Route>
    <Route path="our-work">    <AboutWork/>    </Route>
  </Route>

  <Route path="/user">
    <Route path="sign-in"> <UserSignIn/> </Route>
    <Route path="sign-up"> <UserSignUp/> </Route>
  </Route>
*/
