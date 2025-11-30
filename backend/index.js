const { calculateStock } = require("./stock");
const sampleStock = {
    weightage: 30,           
    initialPrice: 3500,
    currentPrice: 3800,
    role: "captain"
};

console.log(calculateStock(sampleStock));


const { calculatePortfolio} = require("../portfolio");
const userstock =[
    {
        name:"TCS",weightage:30,initialPrice:3000,currentPrice:3800,role:"captain"
    },
    {
        name:"Infosys",weightage:25,initialPrice:1500,currentPrice:1600,role:"vice"
    },
    {
        name:"HDFC",weightage:25,initialPrice:1600,currentPrice:1550,role:"regular"
    },
    {
        name:"Reliance",weightage:20,initialPrice:2400,currentPrice:2500,role:"regular"
    },

];

console.log(calculatePortfolio(userstock));




const{rankingUsers} = require("./ranking");
const result = [
    { name: "User1", totalValue: 120000 },
    { name: "User2", totalValue: 118000 },
    { name : "User3", totalValue : 120000},
];

console.log(rankingUsers(result));