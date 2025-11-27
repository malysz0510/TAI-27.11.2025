const map = L.map('mapid').setView([51.919437, 19.145136], 5);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1Ijoia2FydG9mZWxlazAwNyIsImEiOiJjanRpazhyM2owbHUwNDluem40Ynljdm5hIn0.kYoJkNni5ksRyA0gy1yV7A'
}).addTo(map);

/*--------------------------------------------------------------------------------------------------------
 !!! powyzszego nie ruszaj, to mapa wstawiona za pomocą leafletjs
 wzorowana na tutorialu ze strony: https://leafletjs.com/examples/quick-start/
 Skrypt pisz poniżej
 --------------------------------------------------------------------------------------------------------*/

const selectElement = document.querySelector('#countrySelect');
const countryDataElement = document.querySelector('#countryData');
const countryFlagElement = document.querySelector('#countryFlag');

async function populateCountrySelect() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const countries = await response.json();

        countries.sort((a, b) => {
            const nameA = a.name.common.toUpperCase();
            const nameB = b.name.common.toUpperCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
        });

        let optionsHtml = '<option value="" disabled selected>Wybierz państwo...</option>';
        countries.forEach(country => {
            const name = country.name.common;
            optionsHtml += `<option value="${name}">${name}</option>`;
        });

        selectElement.innerHTML = optionsHtml;
        selectElement.disabled = false;
    } catch (error) {
        console.error('Błąd ładowania listy państw:', error);
    }
}

async function fetchCountryData(countryName) {
    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        if (!response.ok) {
            throw new Error(`Błąd HTTP: ${response.status}`);
        }
        const data = await response.json();
        const country = data[0];

        const capital = country.capital ? country.capital[0] : 'Brak danych';
        const region = country.region || 'Brak danych';
        const subregion = country.subregion || 'Brak danych';
        const population = country.population.toLocaleString() || 'Brak danych';
        const timezones = country.timezones ? country.timezones.join(', ') : 'Brak danych';

        const dataHtml = `
            <h3 class="country-name">
                ${country.name.common}
            </h3>
            <div>
                Stolica: <strong>${capital}</strong>
            </div>
            <div>
                Region: <strong>${region}</strong>
            </div>
            <div>
                Podregion: <strong>${subregion}</strong>
            </div>
            <div>
                Liczba ludności: <strong>${population}</strong>
            </div>
            <div>
                Strefa czasowa: <strong>${timezones}</strong>
            </div>
        `;

        countryDataElement.innerHTML = dataHtml;

        countryFlagElement.src = country.flags.svg;

        const [lat, lng] = country.latlng;
        map.setView([lat, lng], 5);

    } catch (error) {
        console.error('Błąd ładowania danych państwa:', error);
    }
}

function handleSelectChange() {
    const selectedCountry = selectElement.value;
    if (selectedCountry) {
        fetchCountryData(selectedCountry);
    }
}

selectElement.addEventListener('change', handleSelectChange);

populateCountrySelect();