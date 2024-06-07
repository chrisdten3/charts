import React, { useContext, useEffect, useState } from 'react';
import { StockContext } from "../context/context";

const Test = () => {
    const { stocks, fetchStockPrices } = useContext(StockContext);
    const [localStocks, setLocalStocks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            await fetchStockPrices(['AAPL', 'TSLA', 'GOOG']); // Example symbols
            setLocalStocks(stocks);
        };
        fetchData();
    }, [fetchStockPrices, stocks]);

    return (
        <div className="bg-slate-100 flex items-center justify-center w-[90%] h-[90%] rounded-lg">
            <div className="grid grid-cols-2 gap-4">
                {localStocks.map((stock, index) => (
                    <div key={index} className="bg-slate-200 p-4 rounded-lg">
                        <h1>{stock.symbol}</h1>
                        <h2>{stock.price}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Test;
