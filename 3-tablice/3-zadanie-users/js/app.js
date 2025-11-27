// ==========================
// ## Zadanie 1
// ==========================
users.forEach(user => {
    console.log(`${user.name} -> ${user.email}`);
});

// ==========================
// ## Zadanie 2
// ==========================
const adultUsers = users.filter(user => user.age >= 18);
console.log(adultUsers);

// ==========================
// ## Zadanie 3
// ==========================
const femaleUsers = users.filter(user => user.gender === "female");
console.log(femaleUsers);

// ==========================
// ## Zadanie 4
// ==========================
const dolorTagUsers = users.filter(user => user.tags.includes("dolor"));
console.log(dolorTagUsers);

// ==========================
// ## Zadanie 5
// ==========================
const allAdult = users.every(user => user.age >= 18);
console.log(allAdult);

// ==========================
// ## Zadanie 6
// ==========================
const atLeastOneAdult = users.some(user => user.age >= 18);
console.log(atLeastOneAdult);

// ==========================
// ## Zadanie 7
// ==========================
const uppercaseNames = users.map(user => user.name.toUpperCase());
console.log(uppercaseNames);

// ==========================
// ## Zadanie 8
// ==========================
const genderCounts = users.reduce((acc, user) => {
    if (user.gender === "female") {
        acc.female++;
    } else if (user.gender === "male") {
        acc.male++;
    }
    return acc;
}, { female: 0, male: 0 });

console.log(`Liczba kobiet: ${genderCounts.female}`);
console.log(`Liczba mężczyzn: ${genderCounts.male}`);

let winner = '';
if (genderCounts.female > genderCounts.male) {
    winner = "kobiety wygrywają";
} else if (genderCounts.male > genderCounts.female) {
    winner = "mężczyźni wygrywają";
} else {
    winner = "remis";
}
console.log(winner);