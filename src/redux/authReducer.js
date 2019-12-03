import axios from 'axios';

const initialState = {
    username: '',
    password: '',
    loading: false,
    loggedIn: false,
    user: {}
}

const UPDATE_STATE = 'UPDATE_STATE';
const RESET_FIELDS = 'RESET_FIELDS';
const REGISTER_USER = 'REGISTER_USER';
const LOGIN_USER = 'LOGIN_USER';
const LOGOUT_USER = 'LOGOUT_USER';

export const updateState = e => {
    return {
        type: UPDATE_STATE,
        payload: e
    }
}

export const resetFields = () => {
    return {
        type: RESET_FIELDS
    }
}

export const registerUser = (username, password, image) => {
    return {
        type: REGISTER_USER,
        payload: axios.post('/auth/user/register', {
            username: username,
            password: password,
            image: `https://robohash.org/${username}`
        })
    };
};

export const loginUser = (username, password) => {
    return {
        type: LOGIN_USER,
        payload: axios.post('/auth/user/login', {
            username: username,
            password: password
        })
    };
};

export const logoutUser = () => {
    return {
        type: LOGOUT_USER,
        payload: axios.post('/auth/user/logout')
    };
};

export default function authReducer(state = initialState, action) {
    const{type, payload} = action;
    switch(type) {
        case UPDATE_STATE:
            return {
                ...state,
                ...payload
            };
        case RESET_FIELDS:
            return {
                ...state
            };
        case `${REGISTER_USER}_PENDING`:
            return {
                ...state,
                loading: true
            };
        case `${REGISTER_USER}_FULFILLED`:
            return {
                ...state,
                loading: false,
                loggedIn: true,
                payload: payload.data
            };
        case `${LOGIN_USER}_PENDING`:
            return {
                ...state,
                loading: true
            };
        case `${LOGIN_USER}_FULFILLED`:
            return {
                ...state,
                loading: false,
                loggedIn: true,
                user: payload.data
            };
        case `${LOGOUT_USER}_PENDING`:
            return {
                ...state,
                loading: true
            };
        case `${LOGOUT_USER}_FULFILLED`:
            return {
                ...state,
                loading: false,
                user: {}
            };
        default:
            return state;
    }
}