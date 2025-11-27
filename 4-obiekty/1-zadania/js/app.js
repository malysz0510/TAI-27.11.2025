const rectangle = {
    height: 10,
    width: 5,
    showArea() {
        return this.height * this.width;
    }
};

const circle = {
    radius: 7,
    showArea() {
        return Math.PI * this.radius * this.radius;
    }
};

console.log(rectangle);
console.log(circle);
console.log(`Kwadrat ma szerokość ${rectangle.width} i wysokość ${rectangle.height}`);
console.log(`Jego pole to ${rectangle.showArea()}`);
console.log(`Koło ma promień ${circle.radius}`);
console.log(`Jego pole to ${circle.showArea()}`);


const currentUser = {
    name: "Jan",
    surname: "Kowalski",
    email: "jan.kowalski@example.com",
    www: "http://jankowalski.pl",
    userType: "admin",
    isActive: true,
    show() {
        console.log(`Name: ${this.name}`);
        console.log(`Surname: ${this.surname}`);
        console.log(`Email: ${this.email}`);
        console.log(`WWW: ${this.www}`);
        console.log(`UserType: ${this.userType}`);
        console.log(`IsActive: ${this.isActive}`);
    },
    setActive(active) {
        this.isActive = active;
    }
};

currentUser.show();
currentUser.setActive(false);
currentUser.show();


const book = {
    title: "Władca Pierścieni",
    author: "J.R.R. Tolkien",
    pageCount: 1200,
    publisher: "Houghton Mifflin",
    showDetails() {
        console.log("--- for in ---");
        for (const key in this) {
            if (this.hasOwnProperty(key) && typeof this[key] !== 'function') {
                console.log(`${key}: ${this[key]}`);
            }
        }

        console.log("--- Object.keys() ---");
        Object.keys(this).filter(key => typeof this[key] !== 'function').forEach(key => {
            console.log(`${key}: ${this[key]}`);
        });

        console.log("--- Object.values() ---");
        Object.values(this).filter(value => typeof value !== 'function').forEach(value => {
            console.log(value);
        });

        console.log("--- Object.entries() ---");
        Object.entries(this).filter(([, value]) => typeof value !== 'function').forEach(([key, value]) => {
            console.log(`${key}: ${value}`);
        });
    }
};

book.showDetails();


const calculator = {
    result: 0,
    sum(a, b) {
        return a + b;
    },
    minus(a, b) {
        return a - b;
    },
    multi(a, b) {
        return a * b;
    },
    div(a, b) {
        return a / b;
    },
    set(a) {
        this.result = a;
        return this;
    },
    add(b) {
        this.result += b;
        return this;
    },
    sub(b) {
        this.result -= b;
        return this;
    },
    multiBy(b) {
        this.result *= b;
        return this;
    },
    divBy(b) {
        this.result /= b;
        return this;
    }
};

console.log(calculator.sum(5, 3));
console.log(calculator.set(10).add(5).multiBy(2).result);


const array = {
    getSum(arr) {
        return arr.reduce((acc, current) => acc + current, 0);
    },
    getMaxFromTable(arr) {
        return Math.max(...arr);
    },
    getMinFromTable(arr) {
        return Math.min(...arr);
    },
    delete(arr, index) {
        const newArr = [...arr];
        newArr.splice(index, 1);
        return newArr;
    }
};

const testArr = [1, 5, 2, 8, 3];
console.log(array.getSum(testArr));
console.log(array.getMaxFromTable(testArr));
console.log(array.getMinFromTable(testArr));
console.log(array.delete(testArr, 2));


const string = {
    capitalize(txt) {
        if (!txt) return "";
        return txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase();
    },
    mix(txt) {
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
};

console.log(string.capitalize("ania"));
console.log(string.mix("Ala ma kota"));


const text = {
    check(txt, word) {
        return txt.includes(word);
    },
    getCount(txt) {
        return txt.length;
    },
    getWordsCount(txt) {
        if (!txt) return 0;
        const words = txt.trim().split(/\s+/);
        if (words.length === 1 && words[0] === "") return 0;
        return words.length;
    },
    setCapitalize(txt) {
        if (!txt) return "";
        return txt.toLowerCase().split(' ').map(word => {
            if (word.length === 0) return word;
            return word.charAt(0).toUpperCase() + word.slice(1);
        }).join(' ');
    },
    setMix(txt) {
        return string.mix(txt);
    }
};

console.log(text.check("ala ma kota", "kota"));
console.log(text.getCount("ala ma kota"));
console.log(text.getWordsCount("Ala ma kota"));
console.log(text.setCapitalize("ala ma kota"));
console.log(text.setMix("Ala ma kota"));