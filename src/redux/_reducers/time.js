const initialState = {
    second : 0
}

export default Time = (state = initialState, action) => {
    switch (action.type) {
        case 'TIME_SECOND':
            return {
                ...state,
                second : action.payload.second + 1
            }
    
        default:
            return state;
    }
}