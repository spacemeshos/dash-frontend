// @flow
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const NotFound = () => (
  <div className="App">
    <Helmet>
      <title>Spacemesh | Page Not Found</title>
      <meta name="description" content="" />
    </Helmet>
    <div className="d-flex align-content-center justify-content-center">
      <span>Page not found</span>
    </div>
    <Link to="/">Back Home</Link>
  </div>
);

export default NotFound;
