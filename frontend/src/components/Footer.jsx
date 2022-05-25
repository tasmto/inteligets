import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer>
      <Container>
        <hr />
        <Row className='row align-items-md-stretch my-3'>
          <Col className='col-md-6'>
            <div className='h-100 p-5 text-white bg-dark rounded-3'>
              <h2 className='text-light'>About this project</h2>
              <p className='text-muted'>
                This store was built with React.js with Redux and Bootstrap on
                the frontend, Node.js, Express.js for the server and MongoDB
                with Mongoose for the Database.
                <br />
                <br />
                For this version I've enabled the PayPal SDK in Sandbox mode sor
                feel free to test out the entire checkout process!
              </p>
              <a
                className='btn btn-outline-light'
                href='https://github.com/tasmto/inteligets'
                type='button'
              >
                View the Code
              </a>
            </div>
          </Col>
          <Col className='col-md-6'>
            <div className='h-100 p-5 bg-light border rounded-3'>
              <h2>About the Author</h2>
              <p>
                Hi there, I'm a fullstack JavaScript developer from Zimbabwe.
                Currently (At the time of development) looking for my next
                opportunity to make cool stuff.
                <br />
                <br />
                Thank you so much for your time. If you'd like to learn more
                about me or see some more of my work click the button below 😊.
              </p>
              <a
                className='btn btn-outline-secondary'
                href='https://tasmto.netlify.app/'
                type='button'
              >
                Learn more about me
              </a>
            </div>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col className='text-center py-3'>
            Copyright © Inteli<span className='text-muted'>|gets</span>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
