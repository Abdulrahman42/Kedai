// const initialState = {
//     second : 0
// }

// export default Time = (state = initialState, action) => {
//     switch (action.type) {
//         case 'TIME_SECOND':
//             return {
//                 ...state,
//                 second : action.payload.second + 1
//             }
    
//         default:
//             return state;
//     }
// }
const initialState = {
    count: 0,
    setTimer: null
}

const timer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_TIMER':
            return {
                setTimer: action.payload
            }

        case 'TIMER_ON':
            return {
                count: action.payload,
                setTimer: state.setTimer
            }
        case 'TIMER_OFF':
            return {
                count: 0
            }
        default:
            return state;
    }
}


export default timer