import React from 'react';
import { Link } from 'react-router-dom';
import ef from '../ef.png';

const How = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <h1 className="text-green-400 font-extrabold text-4xl mt-2 mb-8">how this works</h1>
      <p className="text-slate-400 text-2xl mb-8">
        This is a simple app that allows you to find the most efficient distribution of stocks based on a portfolio of your choice. It calculates the optimal weights of each stock in your portfolio based on the efficient frontier. The efficient frontier is a set of optimal portfolios that offer the highest expected return for a defined level of risk or the lowest risk for a given level of expected return. Portfolios that lie below the efficient frontier are sub-optimal because they do not provide enough return for the level of risk. Portfolios that cluster to the right of the efficient frontier are also sub-optimal because they have a higher level of risk for the defined rate of return.
      </p>
      <img src={ef} alt="efficient frontier" className="w-1/2" />
      <p className="text-slate-400 text-2xl mt-2 mb-8">
        The app uses the mean and standard deviation of the stocks in your portfolio to calculate the optimal weights. The mean is the average return of the stock over a certain period, and the standard deviation is a measure of the stock's volatility. In order to make an estimation of what the most optimal portfolio would look like, the app runs a Monte Carlo simulation on 25,000 possible stock distributions. The simulation generates random weights for each stock in your portfolio, and then calculates the expected return and standard deviation of each distribution. 
        The app then returns two portfolios: the portfolio with the highest sharpe ration and the portfolio with the lowest standard deviation. The sharpe ratio is a measure of the risk-adjusted return of a financial portfolio. It is calculated by subtracting the risk-free rate of return from the expected return of the portfolio and dividing the result by the standard deviation of the portfolio's return. The higher the sharpe ratio, the better the risk-adjusted return of the portfolio.
        The risk free rate used here is the 52 week treasury bill rate, currently at 5.15%
      </p>
      <div className="flex flex-row text-lg pt-2">
        <button className="bg-green-400 text-white flex-grow px-4 py-2 rounded-md hover:bg-slate-400"><Link to="/">back to home</Link></button>
        </div>
    </div>
  );
};

export default How;

