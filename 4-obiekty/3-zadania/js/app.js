class User {
    constructor(nick, name, surname, email, role) {
        this.nick = nick;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.role = role;
        this.loginDates = [];
        this.active = true;
    }

    logIn() {
        const date = new Intl.DateTimeFormat('pl-PL', {
            dateStyle: 'full',
            timeStyle: 'long'
        }).format(new Date());
        this.loginDates.push(date);
    }

    showLoginDates() {
        this.loginDates.forEach((d, i) => {
            console.log(`${i + 1}. ${d}`);
        });
    }

    showDetails() {
        for (let key in this) {
            console.log(`${key}:`, this[key]);
        }
    }

    toggleActive() {
        this.active = !this.active;
    }
}

const users = [
    new User("adi", "Adam", "Nowak", "adam@example.com", "reader"),
    new User("kasia89", "Kasia", "Kowal", "kasia@example.com", "editor"),
    new User("root", "Admin", "Super", "admin@example.com", "admin")
];

users[0].logIn();
users[0].logIn();

class Fighter {
    constructor(name, live, power) {
        this.name = name;
        this.live = live;
        this.power = power;
    }

    attack(who) {
        if (Math.random() < 0.5) {
            who.live -= this.power;
            log.push(`${this.name} trafia ${who.name}. ${who.name} ma ${who.live} HP.`);
        } else {
            log.push(`${this.name} pudłuje!`);
        }
    }
}

const names = [
    "Michal", "Kacper", "Mikolaj", "Adam", "Lukasz", "Oskar",
    "Kuba", "Maciek", "Bartosz", "Hubert", "Janek", "Piotrek"
];

const fighters = names.map(name => new Fighter(name, 20, 3));
const log = [];

function getFighter() {
    return fighters.length > 0 ? fighters.shift() : null;
}

let leftFighter = null;
let rightFighter = null;

function loop() {
    console.clear();

    if (!leftFighter) leftFighter = getFighter();
    if (!rightFighter) rightFighter = getFighter();

    if (!leftFighter || !rightFighter) {
        log.push("TURNIEJ ZAKOŃCZONY! Zwycięzca: " +
                 (leftFighter?.name || rightFighter?.name));
        console.log(log.join("\n"));
        return false;
    }

    if (Math.random() < 0.5) {
        leftFighter.attack(rightFighter);
    } else {
        rightFighter.attack(leftFighter);
    }

    if (leftFighter.live <= 0) {
        log.push(`${leftFighter.name} odpada z turnieju!`);
        leftFighter = null;
        rightFighter.live = 20;
    }

    if (rightFighter.live <= 0) {
        log.push(`${rightFighter.name} odpada z turnieju!`);
        rightFighter = null;
        leftFighter.live = 20;
    }

    console.log(log.join("\n"));

    setTimeout(() => loop(), 150);
}
loop();

String.prototype.sortText = function (char) {
    return this.split(char)
        .sort((a, b) => a.localeCompare(b))
        .join(char);
};

String.prototype.reverse = function () {
    return this.split("").reverse().join("");
};

Array.prototype.sum = function () {
    return this.reduce((a, b) => a + b, 0);
};

Array.prototype.sortNr = function () {
    return this.sort((a, b) => a - b);
};