import React, {ChangeEvent, useEffect, useState} from "react";
import {FormControl, InputLabel, MenuItem, Select, TextField, Typography} from "@material-ui/core";
import CurrencyType, {CurrencyRateType} from "../../types/CurrencyType";
import "./CurrencyRate.css";

export interface CurrencyRateProps {
    currencyItems: CurrencyType;
}

export const CurrencyRate = ({
                                 currencyItems
                             }: CurrencyRateProps) => {
    const [currencyList,setCurrencyList] = useState((currencyItems.rates ?? []) as CurrencyRateType[]);

    const [currency, setCurrency] = useState(currencyList[0]?.currency ?? '');

    const findCur = () => {
        return ((currencyList?.find(el => el.currency === currency) ?? {value: 1}).value) as number;
    }

    const [rub, setRub] = useState('');
    const [convertedCur, setConvertedCur] = useState('');

    const handleRubValueChange = (event: any) => {
        setRub(event.target.value as string);
    };

    const handleCurrencyTypeChange = (event: ChangeEvent<{ value: unknown }>) => {
        setCurrency(event.target.value as string);
    };

    const handleCurrencyValueChange = (event: any) => {
        setRub(((event.target.value) as number / +findCur()) as unknown as string);
    }
    useEffect(() => {
        setConvertedCur((+rub * +findCur()) as unknown as string);
    }, [rub,currency])

    useEffect(()=>{
        setCurrencyList((currencyItems.rates ?? [])as CurrencyRateType[]);
    },[currencyItems])
    return (
        <form className="Converter-form">
            <TextField variant="outlined" label="Сумма в рублях" type="number" value={rub}
                       onChange={(e: any) => handleRubValueChange(e)}/>
            <FormControl className="Converter-form__select">
                <InputLabel id="currency-label">Валюта</InputLabel>
                <Select
                    labelId="currency-label"
                    value={currency}
                    onChange={handleCurrencyTypeChange}
                >
                    {currencyList?.length > 0 && currencyList.map((curr: CurrencyRateType) =>
                        (
                            <MenuItem key={curr.currency} value={curr.currency}>{curr.currency}</MenuItem>
                        )
                    )}
                </Select>
            </FormControl>
            <TextField variant="outlined" label="Сумма в выбранной валюте" type="number" value={convertedCur}
                       onChange={handleCurrencyValueChange}/>

            <Typography variant="h5" gutterBottom>
                 Сконвертированная сумма: {convertedCur}
            </Typography>
        </form>
    )
}