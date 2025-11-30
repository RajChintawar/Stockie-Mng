## Stock Portfolio Management System ##
A Node.js project that calculates portfolio performance based on stock weightages, prices, and multipliers, and ranks users by portfolio value.

** Features **
Calculate per-stock metrics
Captain (2x), Vice-Captain (1.5x), Regular (1x) multiplier system
Portfolio validation rules
Total portfolio value calculation
User ranking system with tie support
3 test scenarios included

** Project Structure **
index.js        → main entry point
stock.js        → calculates one stock
portfolio.js    → calculates complete portfolio
ranking.js      → ranks multiple users
test.js         → contains test scenarios

** How Calculations Work **
1. Per Stock

Investment = (100000 × weightage) / 100
Shares = investment / initialPrice
Current Value = shares × currentPrice
Price Change % = ((currentPrice – initialPrice) / initialPrice) × 100
Return = (currentValue – investment) × multiplier

2. Portfolio

TotalValue = 100000 + sum of all finalReturns
Return % = ((TotalValue – 100000) / 100000) × 100

3. Ranking

Sorted by TotalValue (descending)
Handles ties (same value → same rank)

** Testing **

Run tests: node test.js
 Includes:
 -Single user
 -5+ users
 -Tie scenario

Running project : index.js
 
