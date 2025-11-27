const tableBody = document.querySelector('#dataBody');
const tableHeaders = document.querySelectorAll('th[data-id]');
const filterForm = document.querySelector('.form');
const API_URL = 'http://localhost:3000/users';

let usersData = [];
let currentSortColumn = null;
let currentSortDirection = 'asc';

async function fetchData() {
    try {
        const response = await fetch(API_URL);
        usersData = await response.json();
        renderTable(usersData);
    } catch (error) {
        console.error('Błąd pobierania danych:', error);
    }
}

function renderTable(data) {
    tableBody.innerHTML = '';
    
    data.forEach(user => {
        const row = tableBody.insertRow();
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.first_name}</td>
            <td>${user.last_name}</td>
            <td>${user.email}</td>
            <td>${user.gender}</td>
            <td>${user.ip_address}</td>
        `;
    });
}

function getCellValue(user, columnId) {
    if (columnId === 'ip_address') {
        return user.ip_address.split('.').map(Number);
    }
    return user[columnId];
}

function handleSort(columnId) {
    if (currentSortColumn === columnId) {
        currentSortDirection = currentSortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        currentSortColumn = columnId;
        currentSortDirection = 'asc';
    }

    const directionMultiplier = currentSortDirection === 'asc' ? 1 : -1;

    usersData.sort((a, b) => {
        const valA = getCellValue(a, columnId);
        const valB = getCellValue(b, columnId);

        if (columnId === 'ip_address') {
            for (let i = 0; i < valA.length; i++) {
                if (valA[i] < valB[i]) return -1 * directionMultiplier;
                if (valA[i] > valB[i]) return 1 * directionMultiplier;
            }
            return 0;
        }

        if (valA < valB) return -1 * directionMultiplier;
        if (valA > valB) return 1 * directionMultiplier;
        return 0;
    });

    tableHeaders.forEach(th => th.classList.remove('asc', 'desc'));
    const activeHeader = document.querySelector(`th[data-id="${columnId}"]`);
    activeHeader.classList.add(currentSortDirection);

    const filteredData = filterData(usersData);
    renderTable(filteredData);
}

function filterData(data) {
    const filters = {};
    const inputs = filterForm.querySelectorAll('input');
    
    inputs.forEach(input => {
        filters[input.name] = input.value.toLowerCase().trim();
    });

    return data.filter(user => {
        for (const key in filters) {
            const filterValue = filters[key];
            if (filterValue === '') continue;

            let userValue;
            if (key === 'id') {
                userValue = String(user.id);
            } else if (key === 'ip') {
                userValue = user.ip_address.toLowerCase();
            } else {
                userValue = String(user[key]).toLowerCase();
            }

            if (!userValue.includes(filterValue)) {
                return false;
            }
        }
        return true;
    });
}

function handleFilter() {
    const filteredData = filterData(usersData);
    renderTable(filteredData);
}

tableHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const columnId = header.getAttribute('data-id');
        handleSort(columnId);
    });
});

filterForm.addEventListener('input', handleFilter);

fetchData();