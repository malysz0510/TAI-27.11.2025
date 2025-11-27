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
        const date = new Intl.DateTimeFormat('pl-PL', { dateStyle: 'full', timeStyle: 'long' }).format(new Date());
        this.loginDates.push(date);
    }

    showLoginDates() {
        this.loginDates.forEach((date, index) => {
            console.log(`Logowanie ${index + 1}: ${date}`);
        });
    }

    showDetails() {
        for (const key in this) {
            if (this.hasOwnProperty(key)) {
                if (typeof this[key] === 'function') continue;
                if (key === 'loginDates') {
                    console.log(`loginDates: [${this[key].join(', ')}]`);
                } else {
                    console.log(`${key}: ${this[key]}`);
                }
            }
        }
    }

    toggleActive() {
        this.active = !this.active;
    }
}

const users = [];
users.push(new User("Marcin01", "Marcin", "Nowak", "m.nowak@example.com", "admin"));
users.push(new User("AniaR", "Anna", "Rybak", "a.rybak@example.com", "editor"));
users.push(new User("PiotrK", "Piotr", "Kowal", "p.kowal@example.com", "reader"));

users[0].logIn();
users[0].logIn();
users[1].logIn();

users[0].showDetails();
users[0].showLoginDates();
users[2].toggleActive();
users[2].showDetails();

class Warrior {
    constructor(name, life = 20) {
        this.name = name;
        this.life = life;
        this.startLife = life;
    }

    attack(enemy) {
        const damage = Math.floor(Math.random() * 5) + 1; // 1-5
        enemy.life -= damage;
        console.log(`${this.name} atakuje ${enemy.name}, zadaje ${damage} obrażeń.`);
        if (enemy.life <= 0) {
            enemy.life = 0;
            console.log(`${enemy.name} zostaje pokonany!`);
        }
    }

    isAlive() {
        return this.life > 0;
    }

    resetLife() {
        this.life = this.startLife;
    }
}

const fighters = [
    new Warrior("Ares"),
    new Warrior("Herakles"),
    new Warrior("Achilles"),
    new Warrior("Perseusz"),
];

function fight(fighter1, fighter2) {
    if (!fighter1 || !fighter2) return false;

    fighter1.attack(fighter2);
    if (!fighter2.isAlive()) {
        fighter2 = null;
        fighter1.resetLife();
        return { winner: fighter1, loser: null };
    }

    fighter2.attack(fighter1);
    if (!fighter1.isAlive()) {
        fighter1 = null;
        fighter2.resetLife();
        return { winner: fighter2, loser: null };
    }

    return { winner: fighter1, loser: fighter2 };
}

function startTournament(warriors) {
    let currentFighters = [...warriors];

    while (currentFighters.length > 1) {
        console.clear();
        const fighterA = currentFighters.shift();
        const fighterB = currentFighters.shift();

        console.log(`--- Nowa Walka: ${fighterA.name} vs ${fighterB.name} ---`);
        let round = 1;

        let a = fighterA;
        let b = fighterB;

        while (a && b && a.isAlive() && b.isAlive()) {
            console.log(`Runda ${round}: ${a.name} [${a.life}] vs ${b.name} [${b.life}]`);
            const result = fight(a, b);
            
            a = result.winner;
            b = result.loser;

            if (!a || !b || !a.isAlive() || !b.isAlive()) {
                
                if (a && a.isAlive()) {
                    console.log(`Zwycięzca: ${a.name}`);
                    a.resetLife();
                    currentFighters.push(a);
                    b = null;
                } else if (b && b.isAlive()) {
                    console.log(`Zwycięzca: ${b.name}`);
                    b.resetLife();
                    currentFighters.push(b);
                    a = null;
                }
                
                if (currentFighters.length === 1) {
                    console.log(`Koniec Turnieju! Ostateczny Zwycięzca: ${currentFighters[0].name}`);
                    return false;
                }
            }
            round++;
        }
    }

    if (currentFighters.length === 1) {
        console.log(`Koniec Turnieju! Ostateczny Zwycięzca: ${currentFighters[0].name}`);
        return true;
    }
    return false;
}

startTournament(fighters);

String.prototype.sortText = function(char) {
    const words = this.split(char);
    words.sort();
    return words.join(char);
};

console.log("Marcin-Ania-Piotrek-Beata".sortText('-'));

String.prototype.mirror = function() {
    return this.split('').reverse().join('');
};

console.log("Ala ma kota".mirror());

Array.prototype.sum = function() {
    return this.reduce((acc, curr) => acc + curr, 0);
};

Array.prototype.getMin = function() {
    if (this.length === 0) return undefined;
    return Math.min(...this);
};

const numbers = [10, 5, 20, 3];
console.log(numbers.sum());
console.log(numbers.getMin());