initialState = {
    dataItem: '',
    isLoading: true,
    subTotalOrder: 0
  }
  
  export default orders = (state = initialState, action) => {
    switch (action.type) {
      //Untuk Order Master ADD
      case 'ADD_ORDER_PENDING':
        return {
          ...state,
          isLoading: true
        }
  
      case 'ADD_ORDER_FULFILLED':
        return {
          ...state,
          dataItem: action.payload.data,
          isLoading: false
        }
   
      case 'ADD_ORDER_REJECTED':
        return {
          ...state,
          dataItem: null,
          isLoading: false
        }

  
      //Untuk Order Master GET
      case 'GET_ORDER_PENDING':
        return {
          ...state,
          isLoading: false
        }

      case 'GET_ORDER_FULFILLED':
        return {
          ...state,
          dataItem: action.payload.data,
          isLoading: false
        }
    
      case 'GET_ORDER_REJECTED':
        return {
          ...state,
          isLoading: false
        }

  
      //Untuk Order Master Edit
      case 'EDIT_ORDER_PENDING':
        return {
          ...state,
          isLoading: true
        }

      case 'EDIT_ORDER_FULFILLED':
        return {
          ...state,
          dataItem: action.payload.data,
          isLoading: false
        }
 
      case 'EDIT_ORDER_REJECTED':
        return {
          ...state,
          dataItem: null,
          isLoading: false
        }

  
      //Untuk Order Master Remove
      case 'REMOVE_ORDER_PENDING':
        return {
          ...state,
          isLoading: true
        }
   
      case 'REMOVE_ORDER_FULFILLED':
        return {
          ...state,
          isLoading: false
        }
     
      case 'REMOVE_ORDER_REJECTED':
        return {
          ...state,
          isLoading: false
        }
        
        
      //Get Sub total
      case 'GET_SUBTOTAL':
        return {
          ...state,
          subTotalOrder : action.payload.subTotal
        }

  
      //Edit 
      case 'SET_ORDER_STATUS':
        return {
          ...state,
          dataItem: null,
          isLoading: false
        }
      
  
      default:
        return state
   
    }
  }
