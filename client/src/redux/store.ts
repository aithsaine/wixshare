import { legacy_createStore } from "redux"
import mainReducer from "./reducers/mainReducer"


const store = legacy_createStore(mainReducer)

export default store