const totalCities = cities.length;
console.log(totalCities);

const totalPeople = cities.reduce((sum, city) => sum + city.people, 0);
console.log(totalPeople);

const firstCityOver10k = cities.find(city => city.people > 10000);
console.log(firstCityOver10k);

const averagePeople = totalPeople / totalCities;
const citiesAboveAverage = cities.filter(city => city.people > averagePeople);
console.log(citiesAboveAverage);

const namesOver10k = cities
    .filter(city => city.people > 10000)
    .map(city => city.name);
console.log(namesOver10k);

const countOver10k = cities.filter(city => city.people > 10000).length;
const countUnder10k = totalCities - countOver10k;

let comparisonResult = '';
if (countOver10k > countUnder10k) {
    comparisonResult = "więcej jest miast z > 10000 ludzi";
} else if (countUnder10k > countOver10k) {
    comparisonResult = "więcej jest miast z <= 10000 ludzi";
} else {
    comparisonResult = "jest remis";
}
console.log(comparisonResult);