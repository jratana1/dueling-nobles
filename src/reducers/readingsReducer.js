const initialState = {
    counter: 0,
    readings: [],
    flag: false,
    current: ''
}

const readingsReducer = (state= initialState, action) => {

    switch(action.type){
        case "INCREMENT": 
        return {...state, counter: state.counter + 1}

        case "ADD_READING":
        return {...state, readings: action.payload.data, flag: true }

        case "SET_FLAG":
        return {...state, flag: !state.flag}

        case "SET_FLAG_FALSE":
        return {...state, flag: false}

        case "CLICK_FLAG":
        return {...state, current: action.payload}

        case "ADD_READINGS":
        return {...state, readings: action.payload.data, flag: true }

        default:
            return {...state}
    }
}

export default readingsReducer

