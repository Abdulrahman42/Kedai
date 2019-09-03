import { createStore, applyMiddleware, combineReducers } from 'redux'

import { logger, promise } from '../middleware/middleware'
import transactions from '../_reducers/transaction'
import categories from '../_reducers/categories'
import menus from '../_reducers/menus'

const reducers = combineReducers({
    transactions,
    categories,
    menus,
})

const store = createStore(
    reducers,
    applyMiddleware(logger, promise)
)

export default store