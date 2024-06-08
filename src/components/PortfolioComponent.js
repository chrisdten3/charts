import { useEffect, useState } from "react";

const PortfolioComponent = ({ stocks }) => {
    const [maxSharpeAllocation, setMaxSharpeAllocation] = useState(null);
    const [maxSharpeAnnualisedReturn, setMaxSharpeAnnualisedReturn] = useState(null);
    const [maxSharpeAnnualisedVolatility, setMaxSharpeAnnualisedVolatility] = useState(null);
    const [minVolAllocation, setMinVolAllocation] = useState(null);
    const [minVolAnnualisedReturn, setMinVolAnnualisedReturn] = useState(null);
    const [minVolAnnualisedVolatility, setMinVolAnnualisedVolatility] = useState(null);

    useEffect(() => {
        const symbols = stocks.map(stock => stock.symbol);
        const createPortfolio = async () => {
            const response = await fetch(`https://separate-rycca-charts-app-1ee2e16a.koyeb.app/api/portfolio?tickers=${symbols.join(',')}`);
            const data = await response.json();

            const maxSharpePortfolio = data.max_sharpe_portfolio;
            const minVolPortfolio = data.min_vol_portfolio;

            setMaxSharpeAllocation(maxSharpePortfolio.Allocation);
            setMaxSharpeAnnualisedReturn(maxSharpePortfolio["Annualised Return"]);
            setMaxSharpeAnnualisedVolatility(maxSharpePortfolio["Annualised Volatility"]);

            setMinVolAllocation(minVolPortfolio.Allocation);
            setMinVolAnnualisedReturn(minVolPortfolio["Annualised Return"]);
            setMinVolAnnualisedVolatility(minVolPortfolio["Annualised Volatility"]);
        };

        createPortfolio();
    }, [stocks]);

    const renderAllocation = (allocation) => {
        return Object.entries(allocation).map(([symbol, weight]) => (
            <div key={symbol} className="text-2xl text-green-700 mb-2">
                {symbol}: <span className="text-black">{weight}%</span>
            </div>
        ));
    };

    return (
        <div>
        <div className="flex gap-16 p-10 bg-gray-100 rounded-lg shadow-2xl">
            <div>
                <h1 className="text-4xl font-semibold text-gray-700 mb-6">Max Sharpe Portfolio:</h1>
                {maxSharpeAllocation ? (
                    <div>
                        <p className="text-3xl font-medium text-gray-600 mb-4">Allocation:</p>
                        {renderAllocation(maxSharpeAllocation)}
                        <p className="text-lg text-gray-500 mt-6">Annualised Return: {maxSharpeAnnualisedReturn * 100}%</p>
                        <p className="text-lg text-gray-500">Annualised Volatility: {maxSharpeAnnualisedVolatility * 100}%</p>
                    </div>
                ) : (
                    <p className="text-lg text-gray-500">Loading...Max Sharpe Portfolio</p>
                )}
            </div>

            <div>
                <h1 className="text-4xl font-semibold text-gray-700 mb-6">Min Volatility Portfolio:</h1>
                {minVolAllocation ? (
                    <div>
                        <p className="text-3xl font-medium text-gray-600 mb-4">Allocation:</p>
                        {renderAllocation(minVolAllocation)}
                        <p className="text-lg text-gray-500 mt-6">Annualised Return: {minVolAnnualisedReturn * 100}%</p>
                        <p className="text-lg text-gray-500">Annualised Volatility: {minVolAnnualisedVolatility * 100}%</p>
                    </div>
                ) : (
                    <p className="text-lg text-gray-500">Loading...Min Volatility Portfolio</p>
                )}
            </div>
        </div>
        </div>
    );
}

export default PortfolioComponent;