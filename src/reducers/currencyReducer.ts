import {
    GET_CURRENCY_FETCH,
    GET_CURRENCY_SUCCESS,
    GET_CURRENCY_ERROR,
    GetCurrencyAction
} from "../actions/getCurrency";
import CurrencyType from "../types/CurrencyType";

const initialState = {
    currency: {} as CurrencyType
};

export default function currencyReducer(state = initialState, action: GetCurrencyAction) {
    switch (action.type) {
        case GET_CURRENCY_FETCH:
            return {...state};
        case GET_CURRENCY_SUCCESS:
            return {...state, currency: action.payload};
        case  GET_CURRENCY_ERROR:
            return {
                ...state,
                success: false,
                error: action.errorMessage
            };
        default:
            return state;
    }
}