import { createContext, useState, useEffect } from "react";

export const PortfolioContext = createContext();

export function PortfolioProvider({ children }) {
  const [portfolioResult, setPortfolioResult] = useState(() => {
    const saved = localStorage.getItem("portfolioResult");
    return saved ? JSON.parse(saved) : null;
  });

  const [portfolioStocks, setPortfolioStocks] = useState(() => {
    const saved = localStorage.getItem("portfolioStocks");
    return saved ? JSON.parse(saved) : [];
  });

  // Sync stocks to LocalStorage
  useEffect(() => {
    localStorage.setItem("portfolioStocks", JSON.stringify(portfolioStocks));
  }, [portfolioStocks]);

  // Sync results to LocalStorage
  useEffect(() => {
    if (portfolioResult)
      localStorage.setItem("portfolioResult", JSON.stringify(portfolioResult));
  }, [portfolioResult]);

  return (
    <PortfolioContext.Provider
      value={{
        portfolioResult,
        setPortfolioResult,
        portfolioStocks,
        setPortfolioStocks,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}
