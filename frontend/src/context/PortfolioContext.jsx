import { createContext, useState, useEffect } from "react";

export const PortfolioContext = createContext();

export function PortfolioProvider({ children }) {

  // Load saved amount (important)
  const savedAmount = localStorage.getItem("totalAmount");
const [totalAmount, setTotalAmount] = useState(
  Number(localStorage.getItem("totalAmount")) || 0
);
  const [portfolioStocks, setPortfolioStocks] = useState(() => {
    const saved = localStorage.getItem("portfolioStocks");
    return saved ? JSON.parse(saved) : [];
  });

  const [portfolioResult, setPortfolioResult] = useState(() => {
    const saved = localStorage.getItem("portfolioResult");
    return saved ? JSON.parse(saved) : null;
  });

  // Save amount
  useEffect(() => {
    localStorage.setItem("totalAmount", Number(totalAmount));
  }, [totalAmount]);

  // Save stocks
  useEffect(() => {
    localStorage.setItem("portfolioStocks", JSON.stringify(portfolioStocks));
  }, [portfolioStocks]);

  // Save result
  useEffect(() => {
    if (portfolioResult)
      localStorage.setItem("portfolioResult", JSON.stringify(portfolioResult));
  }, [portfolioResult]);

  return (
    <PortfolioContext.Provider
      value={{
        totalAmount,
        setTotalAmount,
        portfolioStocks,
        setPortfolioStocks,
        portfolioResult,
        setPortfolioResult,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}
