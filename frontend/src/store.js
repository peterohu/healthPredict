import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { danhsachbenhnhanReducers, taoHosoReducer, capnhatHosoReducer, danhsachchitietReducers } from './reducers/benhnhanReducer'

import { userLoginReducer } from './reducers/userReducer'

const reducer = combineReducers({
    danhsachbenhnhan: danhsachbenhnhanReducers,
    userLogin: userLoginReducer,
    taoHoso: taoHosoReducer,
    capnhatHoso: capnhatHosoReducer,
    danhsachchitiet: danhsachchitietReducers
})


const initialState = {
    userLogin:{
        userInfo: localStorage.getItem('userInfo') 
        ? JSON.parse(localStorage.getItem('userInfo')) : null
    }
}

const middleware = [thunk]

const store = createStore(reducer, initialState, 
    composeWithDevTools(applyMiddleware(...middleware)))

export default store