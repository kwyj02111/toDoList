import * as types from './ActionTypes';

export const loginSuccess = (id) => ({
    type: types.LOGIN_SUCCESS,
    id
});