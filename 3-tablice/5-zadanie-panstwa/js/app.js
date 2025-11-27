const countryNames = countries.map(country => country.name);
console.log(countryNames);

const totalPopulation = countries.reduce((sum, country) => sum + country.population, 0);
console.log(totalPopulation);

const averagePopulation = totalPopulation / countries.length;
console.log(averagePopulation);

const positiveGrowthCountries = countries.filter(country => country.grow > 0).length;
console.log(positiveGrowthCountries);

const negativeGrowthCountries = countries.filter(country => country.grow < 0).length;
console.log(negativeGrowthCountries);

const totalWorldAreaPercent = countries.reduce((sum, country) => sum + country.world_area_in_percent, 0);
console.log(totalWorldAreaPercent);

const countriesWithFertility = countries.filter(country => country.fertility_rate !== null);
const sumFertilityRate = countriesWithFertility.reduce((sum, country) => sum + country.fertility_rate, 0);
const averageFertilityRate = sumFertilityRate / countriesWithFertility.length;
console.log(averageFertilityRate);

const countriesWithAge = countries.filter(country => country.medium_age !== null);
const sumMediumAge = countriesWithAge.reduce((sum, country) => sum + country.medium_age, 0);
const averageMediumAge = sumMediumAge / countriesWithAge.length;
console.log(averageMediumAge);

const polandData = countries.find(country => country.name === "Poland");
console.log(polandData);

const polandMediumAge = polandData ? polandData.medium_age : null;
const isPolandOlder = polandMediumAge && polandMediumAge > averageMediumAge;
console.log(isPolandOlder);