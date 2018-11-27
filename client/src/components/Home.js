import React from 'react';
import PropTypes from 'prop-types';
import Login from './Login';
import ToDoList from './ToDoList';
import '../assets/css/home.css';
import * as userInfoService from '../services/userInfo/userInfo';

const Home = ({loginState, loginClick }) => {

    let token = userInfoService.getLocalStorage('aslover-token');

    return (
        <div className="home-container">
            {token === undefined  ?
                <Login
                    loginState = {loginState}
                    loginClick = {loginClick}
                />
                : <ToDoList />
            }

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