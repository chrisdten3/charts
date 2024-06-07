import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home';
import Dashboard from './pages/dashboard';
import { StockContextProvider } from './context/context';
import How from './pages/how';

function App() {
  return (
    <StockContextProvider>
      <div className="App">
        <div className='bg-white'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/how" element={<How />} />
          </Routes>
        </div>
      </div>
    </StockContextProvider>
  );
}

export default App;
