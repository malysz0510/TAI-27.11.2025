const form = document.querySelector('#searchForm');
const input = document.querySelector('#search');
const API_URL = 'https://www.googleapis.com/books/v1/volumes?q=';

function extractAndLogTitles(data) {
    if (data && data.items) {
        data.items.forEach(item => {
            if (item.volumeInfo && item.volumeInfo.title) {
                console.log(item.volumeInfo.title);
            }
        });
    } else {
        console.log('Nie znaleziono książek.');
    }
}

function handleFormSubmit(event) {
    event.preventDefault();
    const title = input.value.trim();
    if (title === '') {
        return;
    }
    const fullUrl = API_URL + title;

    console.log('--- XMLHttpRequest ---');
    fetchWithXHR(fullUrl);

    console.log('--- Fetch ---');
    fetchWithFetch(fullUrl);

    console.log('--- Axios ---');
    fetchWithAxios(fullUrl);

    if (window.jQuery) {
        console.log('--- jQuery Ajax ---');
        fetchWithJQuery(fullUrl);
    }
}

function fetchWithXHR(url) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = function() {
        if (xhr.status === 200) {
            extractAndLogTitles(xhr.response);
        } else {
            console.error('Błąd XHR: ', xhr.status);
        }
    };
    xhr.onerror = function() {
        console.error('Błąd połączenia XHR.');
    };
    xhr.send();
}

async function fetchWithFetch(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Błąd HTTP: ${response.status}`);
        }
        const data = await response.json();
        extractAndLogTitles(data);
    } catch (error) {
        console.error('Błąd Fetch: ', error.message);
    }
}

function fetchWithAxios(url) {
    if (window.axios) {
        window.axios.get(url)
            .then(response => {
                extractAndLogTitles(response.data);
            })
            .catch(error => {
                console.error('Błąd Axios: ', error.message);
            });
    }
}

function fetchWithJQuery(url) {
    if (window.jQuery) {
        window.jQuery.ajax({
            url: url,
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                extractAndLogTitles(data);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Błąd jQuery Ajax: ', textStatus, errorThrown);
            }
        });
    }
}

form.addEventListener('submit', handleFormSubmit);

if (!window.jQuery) {
    const script = document.createElement('script');
    script.src = 'https://code.jquery.com/jquery-3.5.1.min.js';
    script.defer = true;
    document.head.appendChild(script);
}