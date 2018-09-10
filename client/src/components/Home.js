import React from 'react';
import PropTypes from 'prop-types';
import Login from './Login';
import '../assets/css/home.css';

const Home = ({loginState, loginClick}) => {

    return (
        <div className="home-container">
            <Login
                loginState = {loginState}
                loginClick = {loginClick}
            />
        </div>
    );
};

Home.propTypes = {
    loginClick: PropTypes.func,
};

Home.defaultProps = {
    loginState: {},
    loginClick: () => console.warn('loginClick not defined'),
};

export default Home;