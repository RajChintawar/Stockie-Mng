function calculateStock(stock){
const PORTFOLIO_AMOUNT = 100000;

const investmentAmount = (PORTFOLIO_AMOUNT * stock.weightage) / 100;
const sharesBought = investmentAmount / stock.initialPrice;
const currentValue = sharesBought * stock.currentPrice;
const priceChangePercent = ((stock.currentPrice - stock.initialPrice) / stock.initialPrice) * 100;

let multiplier = 1;

if (stock.role === "captain") multiplier = 2;
else if (stock.role === "vice") multiplier = 1.5;

const rawReturn = currentValue - investmentAmount;
const finalReturn = rawReturn * multiplier;

    return {
        investmentAmount,
         sharesBought,
         currentValue,
         priceChangePercent,
         finalReturn
    };
}
module.exports = { calculateStock };