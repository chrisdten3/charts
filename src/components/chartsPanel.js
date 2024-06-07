import { StockContext } from "../context/context";
import { useContext, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import StockComponent from "../components/stockComponent";
import PortfolioComponent from "../components/PortfolioComponent";

const ChartsPanel = () => {
    const { stocks, setStocks } = useContext(StockContext);
    const [activeIndex, setActiveIndex] = useState(stocks.length ? 0 : null); // Initialize with a valid index if stocks exist

    const handleClick = (index) => {
        setActiveIndex(index); // Set the clicked component as active
    };
    
    const handleDelete = (index) => {
        setStocks(stocks.filter((_, i) => i !== index));
    };

    return (
        <div className="bg-slate-100 w-[90%] h-[90%] rounded-lg flex flex-col justify-between">
            {/* Other chart content goes here */}
            <div className="flex-grow flex items-center justify-center">
                {activeIndex === stocks.length ? (
                        <PortfolioComponent stocks={stocks} />
                    ) : (
                        <StockComponent stock={stocks[activeIndex]} />
                    )}
            </div> 
            <div className="flex justify-center">
                <div className="flex flex-row gap-4 mb-3 overflow-x-auto" style={{ maxWidth: "1000px" }}>
                    {stocks.map((stock, index) => (
                            <div
                                key={index}
                                className={`bg-slate-200 p-4 rounded-lg hover:bg-green-500 hover:text-white ${activeIndex === index ? 'border-2 border-green-500' : ''}`}
                                onClick={() => handleClick(index)}
                            >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h1>{stock.name}</h1>
                                        <h2>{stock.symbol}</h2>
                                    </div>
                                    <IoIosClose
                                        className="cursor-pointer text-xl ml-2"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDelete(index);
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    <div 
                        className={`bg-slate-200 p-4 rounded-lg flex items-center justify-center hover:bg-green-500 hover:text-white ${activeIndex === stocks.length ? 'border-2 border-green-500' : ''}`}
                        onClick={() => handleClick(stocks.length)}
                    >
                        <h1>Portfolio</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChartsPanel;


