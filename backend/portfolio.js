// function calculatePortfolio(stocks, totalAmount) {
//   const stockResults = [];
//   let totalCurrent = 0;

function calculatePortfolio(stocks, totalAmount) {
  if (!totalAmount || totalAmount <= 0) {
    totalAmount = 100000; // fallback
  }



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
