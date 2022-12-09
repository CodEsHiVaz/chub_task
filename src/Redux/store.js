import { legacy_createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { productsreducer } from "./Reducer/reducer";
const rootreducer = combineReducers({
  prod: productsreducer,
});
export const store = legacy_createStore(rootreducer, applyMiddleware(thunk));
