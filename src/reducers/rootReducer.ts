import {combineReducers} from 'redux';

import currencyReducer from './currencyReducer';

const rootReducer = combineReducers({
    currencyReducer
});

type RootReducerType=typeof rootReducer;

export type AppStateType = ReturnType<RootReducerType>;
export default rootReducer;