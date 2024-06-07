import React, { useEffect, useState } from 'react';
import Candlestick from './candleStick';

const StockComponent = ({ stock }) => {
    const [showCandlestick, setShowCandlestick] = useState(false);
    const [stockData, setStockData] = useState(null);
    const [sampleStock, setSampleStock] = useState(null);

    useEffect(() => {
        const fetchStockData = async () => {
            try {
                const response = await fetch(`https://charts-o3jf.onrender.com/api/history?ticker=${stock.symbol}`);
                const data = await response.json();
                setStockData(data);
                const sampleResponse = await fetch(`https://charts-o3jf.onrender.com/api/stock?ticker=${stock.symbol}`);
                const sampleData = await sampleResponse.json();
                setSampleStock(sampleData);
            } catch (error) {
                console.error("Error fetching stock data:", error);
            }
        };
        fetchStockData();
    }, [stock.symbol]);


    return (
        <div className="flex gap-16 p-10 w-[90%] bg-gray-100 rounded-lg shadow-2xl">
            {stock ? (
                <div className='w-full'>
                    <div className="relative items-center">
                        <button
                            onClick={() => setShowCandlestick(!showCandlestick)}
                            className="bg-white border-solid border-2 rounded-lg px-2 border-black"
                        >
                            {showCandlestick ? 'Show Info' : 'Show Chart'}
                        </button>
                    </div>
                    <div>
                        {showCandlestick ? (
                            <Candlestick data={stockData} stock={stock} />
                        ) : (
                            <div>
                                <h1 className="text-4xl font-semibold text-gray-700 mb-6">{stock.name}</h1>
                                <p className="text-2xl text-gray-600 mb-4">{stock.symbol}</p>
                                {sampleStock ? (
                                <div>
                                    <p className="text-lg text-gray-500 mt-6">Today's Opening: ${sampleStock.today_open}</p>
                                    <p className="text-lg text-black font-bold">Related News </p>
                                    <div>
                                        {sampleStock.news.map((item, index) => (
                                            <div key={index} className="mt-4 border border-gray-300 rounded p-4">
                                                <a
                                                    href={item.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-500 hover:underline"
                                                >
                                                    {item.title}
                                                </a>
                                                <p className="text-gray-600">{item.publisher}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                ) : <p>Loading...</p>
                                }
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <p className="text-lg text-gray-500">No data available for this stock</p>
            )}
        </div>
    );
}

export default StockComponent;
