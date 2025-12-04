function calculatePortfolio(stocks, totalAmount) {
  // prevent dumb crashes
  if (!Array.isArray(stocks) || stocks.length === 0) {
    throw new Error("No stocks provided");
  }

  if (!totalAmount || totalAmount <= 0) {
    throw new Error("Invalid total investment amount");
  }

  let stockResults = [];
  let totalCurrent = 0;

  stocks.forEach((s) => {
    const investmentAmount = (s.weightage / 100) * totalAmount;
    const sharesBought = investmentAmount / s.initialPrice;
    const currentValue = sharesBought * s.currentPrice;

    const finalReturn = currentValue - investmentAmount;

    totalCurrent += currentValue;

    stockResults.push({
      investmentAmount,
      sharesBought,
      currentValue,
      finalReturn,
      priceChangePercent:
        ((s.currentPrice - s.initialPrice) / s.initialPrice) * 100,
    });
  });

  return {
    totalInvested: totalAmount,
    totalValue: totalCurrent,
    netGrowth: totalCurrent - totalAmount,
    stockResults,
  };
}


module.exports = { calculatePortfolio };
