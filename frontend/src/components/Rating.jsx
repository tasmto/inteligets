import React from 'react';
import PropTypes from 'prop-types';

const Rating = ({ text, rating, color }) => {
  const starMarkUp = [];
  for (let i = 0; i < 5; i++) {
    starMarkUp.push(
      <span key={i} className={i < 4 ? 'me-1' : ''} style={{ color }}>
        <i
          className={
            +rating - i >= 1
              ? 'fas fa-star'
              : +rating - i < 1 && +rating - i > 0
              ? 'fas fa-star-half'
              : 'fa fa-regular fa-star'
          }
        ></i>
      </span>
    );
  }
  return (
    <div className='my-3 rating'>
      {[...starMarkUp]} {text && text}
    </div>
  );
};

Rating.defaultProps = {
  color: '#ffcd3c',
};
Rating.propTypes = {
  text: PropTypes.string.isRequired,
  rating: PropTypes.number,
  color: PropTypes.string,
};
export default Rating;
