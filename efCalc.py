import yfinance as yf
import pandas as pd  
import numpy as np
import json
import matplotlib.pyplot as plt
import seaborn as sns
import scipy.optimize as sco

np.random.seed(777)

def get_stock_data(symbol):
    stock = yf.Ticker(symbol)
    today_open = stock.history(period="1d")['Open'][0]

    news = stock.news
    top_3_news = sorted(news, key=lambda x: x['providerPublishTime'], reverse=True)[:3]

    output = {
        "symbol": symbol,
        "today_open": today_open,
        "news": top_3_news
    }

    return json.dumps(output)

def get_history(symbol):
    name = yf.Ticker(symbol)
    ticker = name.history(period="1y")

    ticker.index = pd.to_datetime(ticker.index)

    ticker['Date'] = ticker.index

    if not {'Date', 'Open', 'High', 'Low', 'Close'}.issubset(ticker.columns):
        raise ValueError("DataFrame must contain 'Date', 'Open', 'High', 'Low', 'Close' columns")
    

    series_data = []

    for index,row in ticker.iterrows():
        timestamp = int(row['Date'].timestamp() * 1000)
        open_price = row['Open']
        high_price = row['High']
        low_price = row['Low']
        close_price = row['Close']
        
        series_data.append([timestamp, open_price, high_price, low_price, close_price])
    
    output = {
        "series": [{
            "data": series_data
        }]
    }
    
    return json.dumps(output)

def get_portfolio_allocations(tickers, period="1y", num_portfolios=25000, risk_free_rate=0.0515):
    # Grab data for multiple tickers
    data = yf.download(tickers, period=period)
    # Arrange the df so that the tickers are the columns and we have the closing prices
    data = data["Close"]
    print("passed data download")
    print(data.head())
    
    returns = data.pct_change()
    mean_returns = returns.mean()
    cov_matrix = returns.cov()

    # Function to calculate the returns and the volatility of the portfolio
    def portfolio_annualised_performance(weights, mean_returns, cov_matrix):
        returns = np.sum(mean_returns * weights) * 252
        std = np.sqrt(np.dot(weights.T, np.dot(cov_matrix, weights))) * np.sqrt(252)
        return std, returns

    # Function to generate portfolios with random weights assigned to each stock in the portfolio
    def random_portfolios(num_portfolios, mean_returns, cov_matrix, risk_free_rate):
        results = np.zeros((3, num_portfolios))
        weights_record = []
        for i in range(num_portfolios):
            weights = np.random.random(len(tickers))
            weights /= np.sum(weights)
            weights_record.append(weights)
            portfolio_std_dev, portfolio_return = portfolio_annualised_performance(weights, mean_returns, cov_matrix)
            results[0, i] = portfolio_std_dev
            results[1, i] = portfolio_return
            results[2, i] = (portfolio_return - risk_free_rate) / portfolio_std_dev  # Sharpe Ratio
        return results, weights_record

    def calculate_portfolio_allocations(mean_returns, cov_matrix, num_portfolios, risk_free_rate):
        results, weights = random_portfolios(num_portfolios, mean_returns, cov_matrix, risk_free_rate)

        # Maximum Sharpe Ratio Portfolio
        max_sharpe_idx = np.argmax(results[2])
        max_sharpe_allocation = {data.columns[i]: round(weight * 100, 2) for i, weight in enumerate(weights[max_sharpe_idx])}

        # Minimum Volatility Portfolio
        min_vol_idx = np.argmin(results[0])
        min_vol_allocation = {data.columns[i]: round(weight * 100, 2) for i, weight in enumerate(weights[min_vol_idx])}

        max_sharpe_portfolio = {
            "Annualised Return": round(results[1, max_sharpe_idx], 2),
            "Annualised Volatility": round(results[0, max_sharpe_idx], 2),
            "Allocation": max_sharpe_allocation
        }

        min_vol_portfolio = {
            "Annualised Return": round(results[1, min_vol_idx], 2),
            "Annualised Volatility": round(results[0, min_vol_idx], 2),
            "Allocation": min_vol_allocation
        }

        return max_sharpe_portfolio, min_vol_portfolio

    max_sharpe_portfolio, min_vol_portfolio = calculate_portfolio_allocations(mean_returns, cov_matrix, num_portfolios, risk_free_rate)
    return max_sharpe_portfolio, min_vol_portfolio
