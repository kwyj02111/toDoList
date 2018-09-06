import React from 'react';
import PropTypes from 'prop-types';

const Login = ({ loginState, loginClick }) => {

    let inputId = '';
    let inputPwd = '';

    return (
        <div>
            <form
                onSubmit={ e => {
                    e.preventDefault()

                    if(!inputId.value.trim() || !inputPwd.value.trim()){
                        return
                    }

                    loginClick(inputId.value, inputPwd.value);
                }}
            >
                <input
                    className="login-id-input"
                    type="text"
                    placeholder="id"
                    ref = {node => inputId = node}
                />

                <input
                    className="login-pwd-input"
                    type="password"
                    placeholder="password"
                    ref = {node => inputPwd = node}
                />
                <button
                    className="login-btn"
                    onClick={loginClick}
                    type="submit"
                >
                    Login!!!!!!!!!!!
                </button>
            </form>
        </div>

    );
};


export default Login;