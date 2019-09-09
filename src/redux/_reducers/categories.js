const initialState = {
    isLoading: true,
    data: [],
    error: null
}

export default function categories(state = initialState, action) {
    switch (action.type) {
        case 'GET_CATEGORIES':
            return {
                ...state,
                isLoading: true
            }

        case 'GET_CATEGORIES_FULFILLED':
            return {
                ...state,
                isLoading: false,
                data: action.payload.data
            }
        case 'GET_CATEGORIES_REJECTED':
            return {
                ...state,
                isLoading: false,
                error: action.payload.message
            }

        default:
            return state
    }
}