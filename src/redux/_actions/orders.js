import axios from 'axios'

import env from '../../env/env'

export const addOrder = (data) => {
    return {
        type:"ADD_ORDER",
        payload: axios.post(env.host + "order" , data)
    }
}

export const editOrder = (orderId, data) => {
    return {
        type:"EDIT_ORDER",
        payload: axios.patch(env.host + "order/"+ orderId, data)
    }
}

export const deleteOrder = (orderId) => {
    return {
        type: "DELETE_ORDER",
        payload: axios.delete(env.host + "order/" + orderId)
    }
}

export const setOrderStatus = (transactionId, data) => {
    return {
        type: "SET_ORDER_STATUS",
        payload: axios.patch(env.host + "orderStatus/" + transactionId, data)
    }
}
