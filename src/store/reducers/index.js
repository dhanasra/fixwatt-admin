import { combineReducers } from "@reduxjs/toolkit";

import menu from './menu'
import cart from "./cart";

const reducers = combineReducers({ menu, cart })

export default reducers;