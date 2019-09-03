const initialState = {
    isLoading: true,
    data:[],
    error:null
}

export default function menus(state = initialState, action) {
    switch(action.type){
        case 'GET_MENUS_CATEGORIES':
            return {
                ...state,
                isLoading: true
            }
        case 'GET_MENUS_CATEGORIES_FULFILLED':
            return{
                ...state,
                isLoading: false,
                data: action.payload.data
            }
        case 'GET_MENUS_CATEGORIES_REJECTED':
            return {
                ...state,
                isLoading: false,
                error: action.payload.message
            }
        default:
            return state
    }
}