import React from 'react';
import './App.css';
import {Provider} from "react-redux";
import {CurrencyRateContainer} from "../components/containers/CurrencyRateContainer";
import store from "../store/store";

function App() {
  return (
      <Provider store={store}>
        <CurrencyRateContainer/>
      </Provider>
  );
}

export default App;
