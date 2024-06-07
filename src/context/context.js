import React, { createContext, useState } from 'react';

export const StockContext = createContext();

export const StockContextProvider = ({ children }) => {
    const [stocks, setStocks] = useState([
        {
            exch: "NMS",
            exchDisp: "NASDAQ",
            name: "Apple Inc.",
            symbol: "AAPL",
            type: "S",
            typeDisp: "Equity"
        },
        {
            exch: "NYQ",
            exchDisp: "NYSE",
            name: "Microsoft Corporation",
            symbol: "MSFT",
            type: "S",
            typeDisp: "Equity"
        },
        {
            exch: "NMS",
            exchDisp: "NASDAQ",
            name: "Amazon.com Inc.",
            symbol: "AMZN",
            type: "S",
            typeDisp: "Equity"
        },
        {
            exch: "NMS",
            exchDisp: "NASDAQ",
            name: "Alphabet Inc. (Google)",
            symbol: "GOOGL",
            type: "S",
            typeDisp: "Equity"
        },
        {
            exch: "NYQ",
            exchDisp: "NYSE",
            name: "Tesla, Inc.",
            symbol: "TSLA",
            type: "S",
            typeDisp: "Equity"
        }
    ])

    return (
        <StockContext.Provider value={{ stocks, setStocks }}>
            {children}
        </StockContext.Provider>
    );
}