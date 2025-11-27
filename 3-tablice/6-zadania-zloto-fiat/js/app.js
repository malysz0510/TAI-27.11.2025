let totalSavings = 0;
let totalGoldCoins = 0;

for (const monthData of gold) {
    const startYear = monthData.startDateTime.substring(0, 4);
    const salary = payments[startYear];
    
    if (salary) {
        const monthlySavings = salary / 3;
        totalSavings += monthlySavings;

        const coinPrice = monthData.close;
        const coinsBought = Math.floor(monthlySavings / coinPrice);
        totalGoldCoins += coinsBought;
    }
}

const currentGoldPrice = gold[gold.length - 1].close;
const finalGoldValue = totalGoldCoins * currentGoldPrice;

console.log(totalSavings);
console.log(finalGoldValue);