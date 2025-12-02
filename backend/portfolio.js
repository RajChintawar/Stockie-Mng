const { calculateStock } = require("./stock");

function calculatePortfolio(stocks) {
    let totalWeightage = 0;

stocks.forEach(s => totalWeightage += s.weightage);

if (totalWeightage !== 100) {
    throw new Error("Weightages must sum to 100%");
}
const roles = stocks.map(s => s.role);

if (roles.filter(r => r === "captain").length !== 1) {
    throw new Error("one captain required");
}

if (roles.filter(r => r === "vice").length !== 1) {
    throw new Error("one vice-captain required");
}
stocks.forEach(s => {
    if (s.initialPrice <= 0 || s.currentPrice <= 0) {
        throw new Error("Prices must be positive");
    }
});


const stockResults = stocks.map(s => calculateStock(s));

let totalReturn = 0;

stockResults.forEach(r => {
    totalReturn += r.finalReturn;
});


const initialAmount = 100000;
const totalValue = initialAmount + totalReturn;
const portfolioReturnPercent = ((totalValue -initialAmount)/initialAmount)*100;

return{
    stockResults,
    totalValue,
    portfolioReturnPercent
};

}

module.exports = { calculatePortfolio };
