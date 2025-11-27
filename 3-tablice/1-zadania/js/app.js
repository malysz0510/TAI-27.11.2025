// ==========================
// ## Zadanie 1
// ==========================

const animals = ["Lew", "Tygrys", "Słoń", "Panda", "Żyrafa", "Krokodyl"];

function showArray(arr) {
    let totalLength = 0;
    
    console.log("--- Sposób 1: Pętla for ---");
    for (let i = 0; i < arr.length; i++) {
        const word = arr[i];
        const length = word.length;
        console.log(`${word}: Długość: ${length}`);
        totalLength += length;
    }

    console.log("--- Sposób 2: Pętla for...of ---");
    for (const word of arr) {
        console.log(word);
    }

    console.log("--- Sposób 3: Metoda forEach ---");
    arr.forEach((word) => {
        console.log(word);
    });
    
    console.log(`Suma wszystkich liter: ${totalLength}`);
}

showArray(animals);


// ==========================
// ## Zadanie 2
// ==========================

function checkPalindrom(txt) {
    if (!txt) {
        return true;
    }
    const cleanedTxt = txt.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    const reversedTxt = cleanedTxt.split('').reverse().join('');
    return cleanedTxt === reversedTxt;
}

console.log(`"kajak" jest palindromem: ${checkPalindrom("kajak")}`);
console.log(`"Kobyła ma mały bok" jest palindromem: ${checkPalindrom("Kobyła ma mały bok")}`);
console.log(`"pies" jest palindromem: ${checkPalindrom("pies")}`);


// ==========================
// ## Zadanie 3
// ==========================

const names = [
    "Marcin",
    "Ania",
    "Monika",
    "Piotr",
    "Beata",
    "ania",
    "marcin",
    "piotr",
    "PIOTR",
    "ANIA",
    "MONIKA"
];

function unifyNames(arr) {
    return arr.map(name => {
        if (!name) return "";
        const lowerName = name.toLowerCase();
        return lowerName.charAt(0).toUpperCase() + lowerName.slice(1);
    });
}

const unifiedNames = unifyNames(names);

function countDifferentNames(arr) {
    const counts = {};
    for (const name of arr) {
        if (counts[name]) {
            counts[name]++;
        } else {
            counts[name] = 1;
        }
    }
    return counts;
}

const nameCounts = countDifferentNames(unifiedNames);
console.log(nameCounts);


// ==========================
// ## Zadanie 4
// ==========================

function random(max) {
    return Math.floor(Math.random() * (max + 1));
}

const arrayLength4 = 20;
const randomArray4 = [];

for (let i = 0; i < arrayLength4; i++) {
    randomArray4.push(random(100));
}

randomArray4.sort((a, b) => a - b);

const sum4 = randomArray4.reduce((acc, curr) => acc + curr, 0);
const average4 = sum4 / randomArray4.length;

console.log(sum4);
console.log(average4);


// ==========================
// ## Zadanie 5
// ==========================

const tab5 = [
    "xloremipsumdolor",
    "kloremipsum",
    "aloremipsumdol",
    "blor",
    "cloremipsu",
    "gloremip",
];

tab5.sort((a, b) => a.length - b.length);

console.log(tab5);

const totalLength5 = tab5.reduce((sum, text) => sum + text.length, 0);

console.log(totalLength5);


// ==========================
// ## Zadanie 6
// ==========================

const tabUsers = [
    {name : "Marcin", age: 14},
    {name : "Piotr", age: 18},
    {name : "Weronika", age: 20},
    {name : "Ania", age: 19},
    {name : "Agnieszka", age: 13},
    {name : "Magda", age: 30},
];

const adultUsers = tabUsers.filter(user => user.age >= 18);

if (adultUsers.length === 0) {
    console.log("same małolaty");
} else {
    adultUsers.sort((a, b) => a.age - b.age);
    console.log(adultUsers);
}


// ==========================
// ## Zadanie 7
// ==========================

function generateArray() {
    const alphabet = [];
    for (let i = 65; i <= 90; i++) {
        alphabet.push(String.fromCharCode(i));
    }
    return alphabet;
}

const alphabetArray = generateArray();

function splitArray(tab, nr) {
    const result = [];
    for (let i = 0; i < tab.length; i += nr) {
        const chunk = tab.slice(i, i + nr);
        result.push(chunk);
    }
    return result;
}

const splitResult = splitArray(alphabetArray, 6);
console.log(splitResult);


// ==========================
// ## Zadanie 8
// ==========================

const arr8 = [
	[ 66,  97, 114, 100,   4,   2, 110,  11,   1,   6,  20, ],
	[ 99,   3,  10, 122,  76, 101, 111,   3,  32, 100,   0, ],
	[  6,  22,   1, 111,  32,  10, 110,   7,  97,  97,  67, ],
	[ 60,  97, 116,  32, 100,  23,  97, 114, 100,  32,  34, ],
	[  2, 106,  15,   6, 111,  56,  80,  20,  10,  86,  10, ],
	[ 20, 110,  121, 32, 107,  55,  50,  99, 110, 105,   8, ],
	[ 12,   9,  22, 102,  66, 100,  12, 105,  50,  76, 110, ],
	[ 42,  81, 123,  92,  26,  98,  20,   1,  20,  11,  10, ],
];

const str8 = "rrrdddllddrrruuuurrddrruurddddlld";

let row = 0;
let col = 0;
let secretMessage = "";

let startCode = arr8[row][col];
secretMessage += String.fromCharCode(startCode);

for (const direction of str8) {
    switch (direction) {
        case 'r':
            col++;
            break;
        case 'l':
            col--;
            break;
        case 'd':
            row++;
            break;
        case 'u':
            row--;
            break;
    }
    const code = arr8[row][col];
    secretMessage += String.fromCharCode(code);
}

console.log(secretMessage);