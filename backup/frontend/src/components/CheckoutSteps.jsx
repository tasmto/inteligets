import React, { useState, useEffect } from 'react';
import { Nav, Row, Col, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useLocation } from 'react-router-dom';

const CheckoutSteps = () => {
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState('');
  useEffect(() => {
    setCurrentStep(steps.indexOf(location.pathname.slice(1)));
  }, [location.pathname]);

  const steps = ['cart', 'login', 'shipping', 'payment', 'order'];
  return (
    <Nav className='justify-content-center mb-4'>
      {steps.map((step, stage) => (
        <LinkContainer key={stage} to={`/${step}`}>
          <Nav.Link
            className={`text-capitalize ${
              currentStep === stage && 'font-weight-bold text-light bg-dark'
            }`}
            disabled={stage > currentStep}
          >
            {stage + 1}: {step}
          </Nav.Link>
        </LinkContainer>
      ))}
    </Nav>
  );
};

export default CheckoutSteps;
