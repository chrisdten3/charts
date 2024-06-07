import React, { useState, useEffect, useContext } from 'react';
import { IoIosAddCircle } from "react-icons/io";
import { StockContext } from '../context/context';



const DashboardPanel = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [stockObjects, setStockObjects] = useState([]);
    const { stocks, setStocks } = useContext(StockContext);


    useEffect(() => {
        if (searchTerm) {
            const fetchStocks = async () => {
                try {
                    const response = await fetch(`https://yfapi.net/v6/finance/autocomplete?query=${searchTerm}&lang=en`, {
                        headers: {
                            'x-api-key': 'rychythJPY8baAHQxwgVH7VZRBp0MJ8252MjrBjq' // You need to get an API key from Yahoo Finance API
                        }
                    });
                    const data = await response.json();
                    setStockObjects(data.ResultSet.Result.slice(0, 10)); // Get the first 10 results
                } catch (error) {
                    console.error("Error fetching stock names:", error);
                }
            };
            fetchStocks();
        } else {
            setStockObjects([]);
        }
    }, [searchTerm]);

    const addStock = (stock) => {
        setStocks([...stocks, stock]);
    };

    return (
        <div className="h-dvh rounded-tl-lg rounded-bl-lg bg-green-600">
            <div className='pt-11'>
                <h1 className='text-3xl text-white'>Find Securities</h1>
                <input
                    type="text"
                    placeholder="Add New Stocks"
                    className="w-3/4 mt-5 p-2 rounded-lg"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <ul className="mt-5">
                    {stockObjects.map((stock, index) => (
                        <li key={index} className="text-white mb-5">
                            <div onClick={() => addStock(stock)}>
                                {stock.name} 
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default DashboardPanel;

