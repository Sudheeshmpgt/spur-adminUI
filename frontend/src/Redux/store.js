import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../Redux/Features/userData'
import postReducer from '../Redux/Features/postData'
import adminReducer from '../Redux/Features/adminData'
import notificationReducer from '../Redux/Features/notificationData'
import storage from 'redux-persist/lib/storage'
import {persistReducer} from 'redux-persist'
import {combineReducers} from 'redux'

const persistConfig = {
  key: 'root',
  storage,
}

const reducer = combineReducers({
  userData: userReducer,
  postData: postReducer,
  notificationData : notificationReducer,
  adminData: adminReducer
})

const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
  reducer: persistedReducer,
})

export default store;