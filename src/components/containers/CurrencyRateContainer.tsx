import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
// import {CurrencyRate} from "../CurrencyRate/CurrencyRate";
import {Container, Grid} from "@material-ui/core";
import './CurrencyRateContainer.css';
import {ListOfCurrency} from "../ListOfCurrency/ListOfCurrency";
import {AppStateType} from "../../reducers/rootReducer";
import CurrencyType from "../../types/CurrencyType";
import {getCurrencyRequest} from "../../actions/getCurrency";
import {CurrencyRate} from "../CurrencyRate/CurrencyRate";

export const CurrencyRateContainer = () => {
    const dispatch = useDispatch();

    const getCurrencyFromReducer = (state: AppStateType) => state.currencyReducer.currency;
    const currencyFromReducer: CurrencyType = useSelector(getCurrencyFromReducer);

    const request = useCallback(() => {
        dispatch(getCurrencyRequest());
    }, [dispatch]);

    useEffect(() => {
        const interval = setInterval(() => request(), 10000);
        return () => clearInterval(interval);
    }, [])

    useEffect(() => {

        dispatch(getCurrencyRequest());

    }, [dispatch]);

    return (
        <Container component="main" className="CurrencyRate-container">
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <CurrencyRate currencyItems={currencyFromReducer}/>
                </Grid>
                <Grid item xs={6}>
                    <ListOfCurrency currencyItems={currencyFromReducer}/>
                </Grid>
            </Grid>
        </Container>
    )

}