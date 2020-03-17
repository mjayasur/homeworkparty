import getUser from './getUser'
import isLogged from './isLogged'
import getSchool from './getSchool'

import {combineReducers} from 'redux'

const all_reducers = combineReducers({
    getUser, isLogged, getSchool
})

export default all_reducers;