import {
  createContext,
  useState,
  useEffect,
  useContext,
} from "react";

import { AuthContext } from "./AuthContext";

export const PortfolioContext =
  createContext();

export function PortfolioProvider({
  children,
}) {

  /* ---------------- USER ---------------- */

  const { user } =
    useContext(AuthContext);

  const userId =
    user?.uid || "guest";

  /* ---------------- TOTAL AMOUNT ---------------- */

  const [totalAmount, setTotalAmount] =
    useState(() => {

      return Number(
        localStorage.getItem(
          `totalAmount_${userId}`
        )
      ) || 0;

    });

  /* ---------------- PORTFOLIO STOCKS ---------------- */

  const [
    portfolioStocks,
    setPortfolioStocks,
  ] = useState(() => {

    const saved =
      localStorage.getItem(
        `portfolioStocks_${userId}`
      );

    return saved
      ? JSON.parse(saved)
      : [];

  });

  /* ---------------- PORTFOLIO RESULT ---------------- */

  const [
    portfolioResult,
    setPortfolioResult,
  ] = useState(() => {

    const saved =
      localStorage.getItem(
        `portfolioResult_${userId}`
      );

    return saved
      ? JSON.parse(saved)
      : null;

  });

  /* ---------------- SAVE TOTAL AMOUNT ---------------- */

  useEffect(() => {

    localStorage.setItem(
      `totalAmount_${userId}`,
      Number(totalAmount)
    );

  }, [totalAmount, userId]);

  /* ---------------- SAVE STOCKS ---------------- */

  useEffect(() => {

    localStorage.setItem(
      `portfolioStocks_${userId}`,
      JSON.stringify(portfolioStocks)
    );

  }, [portfolioStocks, userId]);

  /* ---------------- SAVE RESULT ---------------- */

  useEffect(() => {

    localStorage.setItem(
      `portfolioResult_${userId}`,
      JSON.stringify(portfolioResult)
    );

  }, [portfolioResult, userId]);

  /* ---------------- PROVIDER ---------------- */

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