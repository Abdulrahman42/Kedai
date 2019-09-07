import axios from 'axios'

import env from '../../env/env'

export const getTransactions = (transactionId) => {
    return {
        type: "GET_TRANSACTIONS",
        payload:axios.get(env.host + 'transaction/' + transactionId)
    }
}

export const addTransaction = (data) => {
    return {
        type: "ADD_TRANSACTION",    
        payload:axios.post(env.host + 'transaction' , data )
    }
}

export const editTransaction = (transactionId, data) =>{
    return {
        type: "EDIT_TRANSACTION",
        payload: axios.patch(env.host +'transaction/'+ transactionId, data)
    }
}

export const setTransactionInput = (data) => {
    return {
      type: 'SET_TRANSACTION_INPUT',
      payload: data
    }
  }

