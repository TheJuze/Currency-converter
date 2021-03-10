import React, {useEffect, useState} from "react";
import List from "@material-ui/core/List";
import {Divider, ListItem, ListItemText} from "@material-ui/core";
import CurrencyType, {CurrencyRateType} from "../../types/CurrencyType";

export interface ListOfCurrencyProps {
    currencyItems: CurrencyType;
}

export const ListOfCurrency = ({currencyItems}: ListOfCurrencyProps) => {

    const [currencyList,setCurrencyList] = useState(([])as CurrencyRateType[]) ;
    useEffect(()=>{
        setCurrencyList((currencyItems.rates ?? [])as CurrencyRateType[]);
    },[currencyItems])

    return (
        <List>
            {currencyList?.length > 0 && currencyList.map((currencyItem: CurrencyRateType) => (
                <React.Fragment  key={`${currencyItem.currency}`}>
                    <ListItem>
                        <ListItemText primary={currencyItem.currency} secondary={`1 ${currencyItem.currency}=${(1/currencyItem.value).toFixed(5)} RUB`}/>
                    </ListItem>
                    <Divider component="li"/>
                </React.Fragment>))}
        </List>
    );
}