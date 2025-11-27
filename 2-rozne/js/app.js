function countWord(txt) {
    if (!txt) {
        return 0;
    }
    const words = txt.trim().split(/\s+/);
    if (words.length === 1 && words[0] === "") {
        return 0;
    }
    return words.length;
}

const exampleText = prompt("Zadanie 1: Podaj dowolny tekst:");

if (!exampleText || exampleText.trim() === "") {
    console.log("Zadanie 1: nie mam co liczyć");
} else {
    const wordCount = countWord(exampleText);
    console.log(`Zadanie 1: Tekst "${exampleText}" składa się z ${wordCount} wyrazów`);
}

function fixName(name) {
    if (!name || name.trim() === "") {
        return "";
    }
    const lowerName = name.toLowerCase();
    const firstLetter = lowerName.charAt(0).toUpperCase();
    const restOfName = lowerName.slice(1);
    return firstLetter + restOfName;
}

const userName = prompt("Zadanie 2: Podaj swoje imię:");

if (!userName || userName.trim() === "") {
    console.log("Zadanie 2: nic nie wpisano");
} else {
    const fixed = fixName(userName);
    const firstChar = fixed.charAt(0);
    console.log(`Zadanie 2: Imię ${fixed} rozpoczyna się od litery ${firstChar}`);
}

function fileInfo(file) {
    const dotIndex = file.lastIndexOf('.');
    if (dotIndex <= 0 || dotIndex === file.length - 1) {
        return false;
    }
    const name = file.slice(0, dotIndex);
    const extension = file.slice(dotIndex + 1);
    return {
        name: name,
        extension: extension
    };
}

console.log("Zadanie 3 (test 'dokument.pdf'):", fileInfo("dokument.pdf"));
console.log("Zadanie 3 (test '.htaccess'):", fileInfo(".htaccess"));

function generateID() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
    const idLength = 20;
    let result = '';
    for (let i = 0; i < idLength; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        result += chars.charAt(randomIndex);
    }
    return result;
}

console.log("Zadanie 4 (ID 1):", generateID());

function printNumbers(nr) {
    if (typeof nr !== 'number' || nr < 1) {
        return "";
    }
    let result = "";
    for (let i = 1; i <= nr; i++) {
        result += i.toString();
    }
    return result;
}

const numberInput = 12;
console.log(`Zadanie 5 (input: ${numberInput}): "${printNumbers(numberInput)}"`);

function checkActivity(imie, miesiac) {
    const correctedImie = fixName(imie);
    const lowerMonth = miesiac ? miesiac.toLowerCase() : "";

    switch (lowerMonth) {
        case "grudzien":
        case "styczen":
        case "luty":
            return `${correctedImie} jezdzi na sankach`;
        case "marzec":
        case "kwiecien":
        case "maj":
            return `${correctedImie} chodzi po kaluzach`;
        case "czerwiec":
        case "lipiec":
        case "sierpien":
            return `${correctedImie} sie opala`;
        case "wrzesien":
        case "pazdzietnik":
        case "listopad":
            return `${correctedImie} zbiera liscie`;
        default:
            return `${correctedImie} uczy się JS`;
    }
}

const myName = "Paweł";
const currentMonth = "Luty";
console.log(`Zadanie 6 (Input: ${myName}, ${currentMonth}): ${checkActivity(myName, currentMonth)}`);

function generateRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const minRange = 1;
const maxRange = 20;
const count = 10;
let aboveTenCount = 0;

console.log(`\nZadanie 7: Generowanie ${count} liczb z przedziału ${minRange}-${maxRange}`);

for (let i = 0; i < count; i++) {
    const randomNumber = generateRandom(minRange, maxRange);
    if (randomNumber > 10) {
        aboveTenCount++;
    }
}

if (aboveTenCount >= count / 2) {
    console.log(`Zadanie 7: Udało się! Liczb większych od 10: ${aboveTenCount}`);
} else {
    console.log(`Zadanie 7: Niestety nie. Liczb większych od 10: ${aboveTenCount}`);
}

function generateRandomTable(min, max, count) {
    const newArray = [];
    for (let i = 0; i < count; i++) {
        newArray.push(generateRandom(min, max));
    }
    return newArray;
}

const randomArray = generateRandomTable(10, 100000, 10);
const paddingLength = 10;

console.log("\nZadanie 8: Wygenerowana tablica:");

for (let i = 0; i < randomArray.length; i++) {
    const numberStr = randomArray[i].toString();
    const paddedLine = numberStr.padStart(paddingLength, '_');
    console.log(paddedLine);
}

function processNames(tekst, znakRozdzialu) {
    const namesArray = tekst.split(znakRozdzialu);
    namesArray.sort();
    const newText = namesArray.join(znakRozdzialu);
    return newText;
}

const str = "Ania|Marcin|Bartek|Piotr|Kuba|Beata|Agnieszka";
const separator = "|";
const result9 = processNames(str, separator);
console.log(`\nZadanie 9: Input: "${str}"`);
console.log(`Zadanie 9: Wynik: "${result9}"`);

function printBorderText(txt, max) {
    let content = txt;
    if (content.length > max) {
        content = content.slice(0, max - 3) + '...';
    }

    const framedContent = " " + content + " ";
    const textLength = framedContent.length;
    const topBottomLine = '═'.repeat(textLength);

    console.log(`\nZadanie 10: Ramka dla tekstu: "${txt}" (max ${max})`);
    console.log(`╔${topBottomLine}╗`);
    console.log(`║${framedContent}║`);
    console.log(`╚${topBottomLine}╝`);
}

const longText = "To jest jakiś bardzo długi, przykładowy tekst";
printBorderText(longText, 20);

const MIN_VAL = 1;
const MAX_VAL = 1000;
const userNumberInput = prompt(`Zadanie 11: Podaj liczbę z przedziału ${MIN_VAL}-${MAX_VAL}:`);
const userNumber = parseInt(userNumberInput);

if (isNaN(userNumber) || userNumber < MIN_VAL || userNumber > MAX_VAL) {
    console.log(`Zadanie 11: Podana wartość "${userNumberInput}" jest błędna`);
} else {
    let iterations = 0;
    let randomNumber;

    while (true) {
        randomNumber = generateRandom(MIN_VAL, MAX_VAL);
        iterations++;
        if (randomNumber === userNumber) {
            break;
        }
    }
    console.log(`\nZadanie 11: Wylosowana liczba ${userNumber} została znaleziona po ${iterations} iteracjach.`);
}

function checkFemale(name) {
    if (!name) {
        return false;
    }
    const lowerName = name.toLowerCase();
    return lowerName.endsWith('a');
}

const users = [
    "Ania Nowak",
    "Piotr Kowalski",
    "Bartek Kosecki",
    "Natalia Nowak",
    "Weronika Piotrowska",
    "Agata Karolak",
    "Tomasz Nowak",
    "Mateusz Kowalski",
    "Marcin Kotecki",
    "Beata Lecka",
    "Katarzyna Małecka"
];

function countWomanInTable(arr) {
    let womanCount = 0;
    for (const fullName of arr) {
        const namePart = fullName.split(' ');
        const name = namePart[0];
        if (checkFemale(name)) {
            womanCount++;
        }
    }
    return womanCount;
}

const numberOfWoman = countWomanInTable(users);
console.log(`\nZadanie 12: W tablicy użytkowników jest ${numberOfWoman} kobiet.`);

const months = [
    "styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec",
    "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"
];

function monthName(nr) {
    if (typeof nr !== 'number' || isNaN(nr)) {
        return false;
    }
    if (nr < 1 || nr > 12) {
        return false;
    }
    return months[nr - 1];
}

console.log("\nZadanie 13:");
console.log(`  monthName(10): ${monthName(10)}`);
console.log(`  monthName("ala"): ${monthName("ala")}`);

function checkPalindrom(txt) {
    if (!txt) {
        return true;
    }
    const cleanedTxt = txt.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    const reversedTxt = cleanedTxt.split('').reverse().join('');
    return cleanedTxt === reversedTxt;
}

console.log("\nZadanie 14 (Palindrom):");
console.log(`  "kajak": ${checkPalindrom("kajak")}`);
console.log(`  "pies": ${checkPalindrom("pies")}`);

function mix(txt) {
    let result = '';
    let charIndex = 0;
    for (let i = 0; i < txt.length; i++) {
        const char = txt[i];
        if (char === ' ') {
            result += char;
            continue;
        }
        if (charIndex % 2 === 0) {
            result += char.toUpperCase();
        } else {
            result += char.toLowerCase();
        }
        charIndex++;
    }
    return result;
}

const namesArr = ["Ania", "Marcin", "Bartek", "Piotr"];

function smallNames(arr) {
    return arr.map(name => name.toLowerCase());
}

function bigNames(arr) {
    return arr.map(name => name.toUpperCase());
}

function mixNames(arr) {
    return arr.map(name => mix(name));
}

console.log("\nZadanie 15 (mix):");
console.log(`  Input: Ala ma kota`);
console.log(`  Output: ${mix("Ala ma kota")}`);
console.log(`Zadanie 15 (tablica: ${namesArr}):`);
console.log(`  mixNames: ${mixNames(namesArr)}`);

const tab = [1, 3, 5, 7, 3, 5, 5, 1, 7, 8, 4, 3, 4, 2, 2, 1];

function arraySummary(arr) {
    let sum = 0;
    const resultObject = {};

    for (const number of arr) {
        sum += number;
        if (resultObject[number]) {
            resultObject[number]++;
        } else {
            resultObject[number] = 1;
        }
    }
    resultObject.sum = sum;
    return resultObject;
}

const summary = arraySummary(tab);
console.log("\nZadanie 16 (podsumowanie tablicy):");
console.log(summary);

function createLogger() {
    let counter = 0;

    function log(txt) {
        counter++;
        console.log(`Zadanie 17: ${counter}. ${txt}`);
    }
    return log;
}

const log = createLogger();

console.log("\nZadanie 17 (Logowanie z licznikiem):");
log("Pierwszy komunikat");
log("Drugi komunikat");
log("Trzeci, ostatni tekst");