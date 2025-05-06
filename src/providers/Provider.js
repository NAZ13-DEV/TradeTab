// src/providers/ReduxProvider.jsx

// import React from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store'; // ✅ Adjust path if needed
import PropTypes from 'prop-types';

const ReduxProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
ReduxProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ReduxProvider;
