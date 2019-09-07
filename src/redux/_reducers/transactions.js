const initialState = {
  isLoading: true,
  dataItem: '',
  message: '',
  dataOri: '',
};

export default function transactions(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TRANSACTION_PENDING':
      return {
        ...state,
        isLoading: true,
      };
    case 'ADD_TRANSACTION_FULFILLED':
      return {
        ...state,
        dataItem: action.payload.data,
        message: action.payload.data.message,
        isLoading: false,
      };
    case 'ADD_TRANSACTION_REJECTED':
      return {
        ...state,
        message: action.payload.data.message,
        isLoading: false,
      };
    case 'GET_TRANSACTION_PENDING':
      return {
        ...state,
        isLoading: true,
      };
    case 'GET_TRANSACTION_FULFILLED':
      return {
        ...state,
        dataItem: action.payload.data,
        message: action.payload.data.message,
        isLoading: false,
      };
    case 'GET_TRANSACTION_REJECTED':
      return {
        ...state,
        message: action.payload.data.message,
        isLoading: false,
      };
    case 'EDIT_TRANSACTION_PENDING':
      return {
        ...state,
        isLoading: true,
      };

    case 'EDIT_TRANSACTION_FULFILLED':
      return {
        ...state,
        dataItem: action.payload.data,
        message: action.payload.data.message,
        isLoading: false,
      };

    case 'EDIT_TRANSACTION_REJECTED':
      return {
        ...state,
        message: action.payload.data.message,
        isLoading: false,
      };

    //SET DATA TRANSAKSI UNTUK DIINPUT
    case 'SET_TRANSACTION_INPUT':
      return {
        ...state,
        dataOri: action.payload,
      };

    default:
      return state;
  }
}
//
