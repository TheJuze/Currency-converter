import {applyMiddleware, createStore, Middleware, Store} from 'redux';
import thunkMiddleware, {ThunkMiddleware} from 'redux-thunk';

import rootReducer from "../reducers/rootReducer";
import {createLogger} from "redux-logger";

const logger = createLogger({
    collapsed: true,
});

const middlewares: Array<Middleware | ThunkMiddleware> = [thunkMiddleware];
middlewares.push(logger);

const store = (initialState?: any): Store => {

    return createStore(rootReducer, initialState, applyMiddleware(...middlewares));

};
export default store();