// export const timeSecond = () => {
//     return {
//         type : 'TIME_SECOND',
//         payload : {
//             second : 0
//         }
//     }
// }
export const setTimer = (setTimer) => {
    return {
        type: 'SET_TIMER',
        payload: setTimer
    }
}

export const timerOn = (time) => {
    return {
        type: 'TIMER_ON',
        payload: time + 1
    }
}

export const timerOff = () => {
    return {
        type: 'TIMER_OFF'
    }
}
// export const setIntervalNya = (timeEvent) => {
//     return {
//       type: 'SET_INTERVAL_EVENT',
//       payload: timeEvent
//     }
//   }
//   export const counterNya = (second) => {
//     return {
//       type: 'SET_INTERVAL_COUNTER',
//       payload: second + 1
//     }
//   }
//   export const hapusInterval = () => {
//     return {
//       type: 'REMOVE_INTERVAL'
//     }
//   }