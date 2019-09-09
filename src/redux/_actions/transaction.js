import axios from 'axios'

import env from '../../env/env'

export const getTransactions = (transactionId) => {
    return {
        type: 'GET_TRANSACTIONS',
        payload: axios.get(env.host + 'transactions/' + transactionId)
    }
}

export const addTransaction = (data) => {
    return {
        type: 'ADD_TRANSACTION',
        payload: axios.post(env.host + 'transaction', data)
    }
}
