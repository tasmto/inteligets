import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      {description && <meta name='description' content={description} />}
      {keywords && <meta name='keywords' content={keywords} />}
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'Proshop',
  keywords: 'Electronics, gadgets, cheap devices',
  description: 'We se;; the best products for cheap',
};

export default Meta;
