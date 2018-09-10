import React from 'react';
import PropTypes from 'prop-types';
import '../assets/css/login.css';

const Login = ({ loginState, loginClick }) => {

    let inputId = '';
    let inputPwd = '';

    return (
        <div className="login-container">
            <form
                className="login-input-area"
                onSubmit={ e => {
                    e.preventDefault()

                    if(!inputId.value.trim() || !inputPwd.value.trim()){
                        return
                    }

                    loginClick(inputId.value, inputPwd.value);
                }}
            >
                <div className="login-input-box">
                    <i className="login-input-icon material-icons">&#xE853;</i>
                    <input
                        className="login-id-input"
                        type="text"
                        placeholder="id"
                        ref = {node => inputId = node}
                    />
                </div>

                <div className="login-input-box">
                    <i className="login-input-icon material-icons">&#xE0DA;</i>
                    <input
                        className="login-pwd-input"
                        type="password"
                        placeholder="password"
                        ref = {node => inputPwd = node}
                    />
                </div>

                <button
                    className="login-btn"
                    onClick={loginClick}
                    type="submit"
                >
                    Login!
                </button>
            </form>
        </div>

    );
};

Login.propTypes = {
    loginClick: PropTypes.func.isRequired,
}

export default Login;