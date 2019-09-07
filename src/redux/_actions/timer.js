export const setTimer = (number) => {
  return {
      type: 'SET_TIME',
      payload: number
  }
}

export const setTimerReset = () => {
  return {
      type: 'SET_TIME_RESET',
      
  }
}