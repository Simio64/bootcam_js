import { createStore, combineReducers, applyMiddleware } from "redux"
import { thunk } from "redux-thunk"

import { notes } from './reducers/notesReducer.js'
import { user } from './reducers/userReducer.js'

const reducer = combineReducers({ notes, user })
const middleware = applyMiddleware(thunk)

const store = createStore(reducer, middleware)

export default store