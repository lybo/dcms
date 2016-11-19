import * as types from '../constants/ActionTypes'

const initialState = {
    login: {
        counter: 0,
        status: false,
        error: ''
    },
    logout: {
        counter: 0,
        status: false,
        error: ''
    },
    user: {
        counter: 0,
        status: false,
        error: ''
    },
    page: {
        counter: 0,
        status: false,
        error: ''
    },
    template: {
        counter: 0,
        status: false,
        error: ''
    },
    file: {
        counter: 0,
        status: false,
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
                error: action.payload
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
        default: 
            return state;
    }  
};

