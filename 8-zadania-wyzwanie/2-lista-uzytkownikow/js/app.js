const API_URL = 'http://localhost:3000/users';
const usersList = document.querySelector('.users');

function renderUser(user) {
    const li = document.createElement('li');
    li.classList.add('user-card');
    li.setAttribute('data-id', user.id);
    li.innerHTML = `
        <div class="user-details">
            <div class="user-name-cnt">
                <span class="first-name">${user.first_name}</span>
                <span class="last-name">${user.last_name}</span>
            </div>
            <div class="user-email">${user.email}</div>
        </div>
        <div class="user-actions">
            <button class="action-btn edit-btn" data-id="${user.id}">
                <img src="images/edit.svg" alt="Edytuj">
            </button>
            <button class="action-btn delete-btn" data-id="${user.id}">
                <img src="images/delete.svg" alt="Usuń">
            </button>
        </div>
    `;
    usersList.appendChild(li);
}

async function fetchUsers() {
    try {
        const response = await fetch(API_URL);
        const users = await response.json();
        usersList.innerHTML = '';
        users.forEach(renderUser);
    } catch (error) {
        console.error('Błąd pobierania użytkowników:', error);
    }
}

async function deleteUser(id) {
    if (!confirm('Czy na pewno chcesz usunąć tego użytkownika?')) return;
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            const liToRemove = document.querySelector(`[data-id="${id}"]`);
            if (liToRemove) liToRemove.remove();
        } else {
            console.error('Błąd usuwania:', response.status);
        }
    } catch (error) {
        console.error('Błąd połączenia:', error);
    }
}

async function updateUser(id, firstName, lastName, email) {
    const updatedUser = {
        first_name: firstName,
        last_name: lastName,
        email: email
    };

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
        });

        if (response.ok) {
            const liToUpdate = document.querySelector(`[data-id="${id}"]`);
            if (liToUpdate) {
                liToUpdate.querySelector('.first-name').textContent = firstName;
                liToUpdate.querySelector('.last-name').textContent = lastName;
                liToUpdate.querySelector('.user-email').textContent = email;
            }
        } else {
            console.error('Błąd aktualizacji:', response.status);
        }
    } catch (error) {
        console.error('Błąd połączenia:', error);
    }
}

async function createUser(firstName, lastName, email) {
    const newUser = {
        first_name: firstName,
        last_name: lastName,
        email: email
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        });

        if (response.ok) {
            const addedUser = await response.json();
            renderUser(addedUser);
        } else {
            console.error('Błąd dodawania:', response.status);
        }
    } catch (error) {
        console.error('Błąd połączenia:', error);
    }
}

function handleAction(event) {
    const target = event.target.closest('.action-btn');
    if (!target) return;

    const id = target.getAttribute('data-id');

    if (target.classList.contains('delete-btn')) {
        deleteUser(id);
    } else if (target.classList.contains('edit-btn')) {
        const li = target.closest('.user-card');
        const firstNameEl = li.querySelector('.first-name');
        const lastNameEl = li.querySelector('.last-name');
        const emailEl = li.querySelector('.user-email');

        const newFirstName = prompt('Nowe imię:', firstNameEl.textContent);
        if (newFirstName === null) return;
        
        const newLastName = prompt('Nowe nazwisko:', lastNameEl.textContent);
        if (newLastName === null) return;
        
        const newEmail = prompt('Nowy email:', emailEl.textContent);
        if (newEmail === null) return;
        
        updateUser(id, newFirstName, newLastName, newEmail);
    }
}

function handleAddUser() {
    const firstName = prompt('Imię:');
    if (firstName === null) return;
    
    const lastName = prompt('Nazwisko:');
    if (lastName === null) return;
    
    const email = prompt('Email:');
    if (email === null) return;
    
    createUser(firstName, lastName, email);
}

const addUserBtn = document.createElement('button');
addUserBtn.textContent = 'Dodaj nowego użytkownika';
addUserBtn.classList.add('add-user-btn');
document.body.prepend(addUserBtn);

addUserBtn.addEventListener('click', handleAddUser);
usersList.addEventListener('click', handleAction);

fetchUsers();