import axios from 'axios'

import env from '../env/env'

export const getTransactions = (tId) => {
    return {
        type: "GET_TRANSACTIONS",
        payload:axios.get(env.host + 'transaction/' + tId)
    }
}

export const addTransaction = (data) => {
    return {
        type: "ADD_TRANSACTION",    
        payload:axios.post(env.host + 'transaction' , data )
    }
}