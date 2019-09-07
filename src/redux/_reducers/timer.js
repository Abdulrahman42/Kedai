const initialState = {
  counter: 0
}

const timer = (state = initialState, action) => {
  switch (action.type) {
      case 'SET_TIME':
          return {
              counter: action.payload
          }
      case 'SET_TIME_RESET':
          return {
              counter: 0
          }
      default:
          return state;
  }
}


export default timer