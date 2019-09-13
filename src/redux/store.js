import { createStore, applyMiddleware, combineReducers } from 'redux'

import { logger, promise } from './middleware/middleware'
import transaction from './_reducers/transaction'
import menus from './_reducers/menus'
import orders from './_reducers/orders'
import categories from './_reducers/categories'
import timer from './_reducers/timer'

const reducers = combineReducers({
    categories,
    menus,
    orders,
    transaction,
    timer
})

const store = createStore(
    reducers,
    applyMiddleware(logger, promise)
)

export default store