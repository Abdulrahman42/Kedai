import axios from 'axios';

import env from '../../env/env';

export const getTransactions = (data, id) => {
  // return {
  //     type: 'GET_TRANSACTIONS',
  //     payload: axios.get(env.host + 'transactions/' + `${transactionId}`)
  // }
  dataBefore = {
    id: id,
    tableNumber: data,
    finishedTime: null,
    subtotal: null,
    discount: 0,
    serviceCharge: 10,
    tax: 5.5,
    isPaid: true,
  };
  return {
    type: 'GET_TRANSACTIONS',
    payload: dataBefore,
  };
};

export const addTransaction = data => {
  return {
    type: 'ADD_TRANSACTION',
    payload: axios.post(env.host + 'transaction', data),
    // payload: axios({
    //     url: env.host + 'transaction',
    //     method: 'post',
    //     data: data,
    //     responseType: 'json'
    // })
  };
};

export const updateTransaction = data => {
  return {
    type: 'UPDATE_TRANSACTION',
    payload: data,
  };
};

export const pushTransaction = (data, id) => {
  return {
    type: 'PUSH_TRANSACTION',
    payload: axios.patch(env.host + 'transaction/' + `${id}`, data),
    // payload: axios({
    //     url: env.host + 'transaction/' + `${id}`,
    //     method: 'patch',
    //     data: data,
    //     responseType: 'json'
    // })
  };
};
