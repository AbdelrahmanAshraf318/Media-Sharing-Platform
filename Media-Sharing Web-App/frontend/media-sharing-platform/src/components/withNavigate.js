import React from 'react';
import { useNavigate } from 'react-router-dom';

// HOC to inject navigate into class components
const withNavigate = (Component) => {
  return function WrappedComponent(props) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
};

export default withNavigate;