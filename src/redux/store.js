import { createStore, applyMiddleware, combineReducers } from 'redux'

import { logger, promise } from './middleware/middleware'
import transactions from './_reducers/transactions'
import menus from './_reducers/menus'
import orders from './_reducers/orders'
import timer from './_reducers/timer'

const reducers = combineReducers({
    transactions,
    menus,
    orders,
    timer
})

const store = createStore(
    reducers,
    applyMiddleware(logger, promise)
)

export default store