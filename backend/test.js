const { calculatePortfolio } = require("./portfolio");

const user1 = [
    { name: "TCS", weightage: 30, initialPrice: 3500, currentPrice: 3800, role: "captain" },
    { name: "Infosys", weightage: 25, initialPrice: 1500, currentPrice: 1600, role: "vice" },
    { name: "HDFC", weightage: 25, initialPrice: 1600, currentPrice: 1550, role: "regular" },
    { name: "Reliance", weightage: 20, initialPrice: 2400, currentPrice: 2500, role: "regular" }
];

console.log("Single User Test:");
console.log(calculatePortfolio(user1));


const { rankingUsers } = require("./ranking");

const users = [
    { name: "User1", totalValue: 120000 },
    { name: "User2", totalValue: 118000 },
    { name: "User3", totalValue: 125000 },
    { name: "User4", totalValue: 110000 },
    { name: "User5", totalValue: 125000 }, 
    { name: "User6", totalValue: 117000 }
];

console.log("5+ Users Ranking:");
console.log(rankingUsers(users));


const tieUsers = [
    { name: "A", totalValue: 115000 },
    { name: "B", totalValue: 115000 },
    { name: "C", totalValue: 110000 }
];

console.log("Tie Test:");
console.log(rankingUsers(tieUsers));
