import {AnyAction} from 'redux';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import CurrencyType, {CurrencyRateType} from "../types/CurrencyType";

export const GET_CURRENCY_FETCH = 'GET_CURRENCY_FETCH';
export const GET_CURRENCY_SUCCESS = 'GET_CURRENCY_SUCCESS';
export const GET_CURRENCY_ERROR = 'GET_CURRENCY_ERROR';

export interface GetCurrencyAction {
    type: string;
    payload?: any; //TODO: change any
    errorMessage?: any;
}

const getCurrencyFetching = (): GetCurrencyAction => ({
    type: GET_CURRENCY_FETCH,
});

const getCurrencySuccess = (currency: CurrencyType): GetCurrencyAction => ({
    type: GET_CURRENCY_SUCCESS,
    payload: currency,
});

const getCurrencyError = (message: any): GetCurrencyAction => ({
    type: GET_CURRENCY_ERROR,
    errorMessage: message,
});


export const getCurrencyRequest = (): ThunkAction<Promise<void>, {}, {}, AnyAction> => {

    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {

        dispatch(getCurrencyFetching());

        try {
            const response = await fetch('https://www.cbr-xml-daily.ru/latest.js', {
                method: 'GET'
            });
            const responseData = await response.json();

            if (response.status === 200) {
                const rateKeys = Object.keys(responseData.rates);
                const rateValues = Object.values(responseData.rates);
                const sorting = (a: CurrencyRateType, b: CurrencyRateType) => {
                    if (a.value > b.value) {
                        return 1;
                    }
                    if (a.value < b.value) {
                        return -1;
                    }
                    // a должно быть равным b
                    return 0;
                };
                const dispatchRates: Array<CurrencyRateType> = (rateKeys.map((key: string, index) => {
                    return {currency: key, value: rateValues[index]} as CurrencyRateType;
                }).sort(sorting));
                dispatch(getCurrencySuccess({...responseData, rates: dispatchRates} as CurrencyType));
            } else {
                dispatch(getCurrencyError(responseData.message))
            }
        } catch (error) {
            dispatch(getCurrencyError(error));
        }
    }
}