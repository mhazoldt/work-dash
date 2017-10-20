import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {apiMiddleware, authReducer} from './lib/auth'

// import your reducers here
import searchResults from './reduxReducers/searchResults'
import searchResultsJson from './reduxReducers/searchResultsJson'
import taskListJson from './reduxReducers/taskListJson'



const createStoreWithMiddleware = applyMiddleware(thunkMiddleware, apiMiddleware)(createStore)

const rootReducer = combineReducers({
  auth: authReducer,
  searchResults: searchResults,
  searchResultsJson: searchResultsJson,
  taskListJson: taskListJson
})

const store = createStoreWithMiddleware(rootReducer)

export default store