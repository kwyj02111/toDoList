import * as types from '../actions/ActionTypes';

const initialState = {
    login: false,
    id: '',
};

const loginState = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                login: true,
                id: action.id
            };
        default:
            return state
    }
}

export default loginState