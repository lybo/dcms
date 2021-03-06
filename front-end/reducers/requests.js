import * as types from '../constants/ActionTypes'

const initialState = {
    auth: {
        counter: 0,
        status: false,
        response: null,
        error: ''
    },
    user: {
        counter: 0,
        status: false,
        response: null,
        error: ''
    },
    page: {
        counter: 0,
        status: false,
        response: null,
        error: ''
    },
    template: {
        counter: 0,
        status: false,
        response: null,
        error: ''
    },
    file: {
        counter: 0,
        status: false,
        response: null,
        error: ''
    }
};

const request = (state = {}, action = { type: ''}) => {
    switch (action.type) {
        case types.SET_STATUS_REQUEST:
            state = {
                ...state,
                status: action.payload || false,
                counter: action.payload === true ? state.counter + 1 : state.counter
            }
            return {
                ...state
            }
        case types.SET_ERROR_REQUEST:
            state = {
                ...state,
                response: null,
                error: action.payload,
            }
            return {
                ...state
            }
        case types.SET_REQUEST_RESPONSE:
            state = {
                ...state,
                response: action.payload,
                error: '',
                status: false,
            }
            return {
                ...state
            }
        default:
            return state;
    }
};

export default function requests(state = initialState, action = { type: '', namespace: '' }) {
    const key = action.namespace
    let newState = {...state}
    switch (action.type) {
        case types.SET_STATUS_REQUEST:
            newState[key] = {
                ...request(state[key], action)
            }
            return {
                ...newState
            }
        case types.SET_ERROR_REQUEST:
            newState[key] = {
                ...request(state[key], action)
            }
            return {
                ...newState
            }
        case types.SET_REQUEST_RESPONSE:
            newState[key] = {
                ...request(state[key], action)
            }
            return {
                ...newState
            }
        default:
            return state;
    }
};

