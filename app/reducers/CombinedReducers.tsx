import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import address from './address'
import view from './view'
import zillowInfo from './zillowInfo'

export default combineReducers({
  form: formReducer,
  address,
  zillowInfo,
  view
})
