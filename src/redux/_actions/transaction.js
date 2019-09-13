import axios from 'axios'

import env from '../../env/env'

export const getTransactions = (transactionId) => {
    return {
        type: 'GET_TRANSACTIONS',
        payload: axios.get(env.host + 'transactions/' + `${transactionId}`)
    }
}

export const addTransaction = (data) => {
    return {
        type: 'ADD_TRANSACTION',
        payload: axios.post(env.host + 'transaction', data)
    }
}

export const updateTransaction = (data, id) => {
    return {
        type: 'UPDATE_TRANSACTION',
        payload: axios.patch(env.host + 'transaction/' + `${id}`, data)
    }
}

export const updateOrder = (item, data, datafix) => {
    return {
        type: 'UPDATE_ORDER',
        payload: item,
        data: data,
        datafix: datafix
       
    }
}


export const changeStatusOrder  = (id) => {
    return {
        type: 'UPDATE_TRANSACTION_ORDER',
        payload: axios.patch(env.host + 'Orders/transaction/' + id)
       
    }
}


export const resetbill  = () => {
    return {
        type: 'RESET_BILL',
    }
}


export const changeStatusTrx  = (id, time, detailtransaction) => {
    const data = {
        finishedTime: time,
        subtotal: detailtransaction.subtotal,
        total: detailtransaction.total,
        discount: detailtransaction.discount,
        serviceCharge: detailtransaction.service,
        tax: detailtransaction.tax,
        isPaid:0,
    }
    return {
        type: 'UPDATE_TRANSACTION_ORDER',
        payload: axios.patch(API_URL + 'transactions/update/' + id, data)
       
    }
}