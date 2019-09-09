  
import axios from 'axios'

import env from '../../env/env'

export const getCategories = () => ({
    type: "GET_CATEGORIES",
    payload: axios.get(env.host + "categories")
})