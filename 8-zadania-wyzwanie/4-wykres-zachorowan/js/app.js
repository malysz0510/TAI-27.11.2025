const API_BASE = "https://disease.sh/v3/covid-19";
const chartCanvas = document.querySelector("#myChart");
const form = document.querySelector("#filterForm");
const countrySelect = document.querySelector("#countrySelect");
const dateFromInput = document.querySelector("#dateFrom");
const dateToInput = document.querySelector("#dateTo");

let chartInstance = null;

function formatDate(date) {
    return new Date(date).toISOString().substring(0, 10);
}

function setInitialDates() {
    const today = new Date();
    dateToInput.value = formatDate(today);
    dateFromInput.value = "2020-01-01";
}

function processDailyCases(timeline) {
    const dates = Object.keys(timeline);
    const cases = Object.values(timeline);

    const daily = [0];
    for (let i = 1; i < cases.length; i++) {
        const diff = cases[i] - cases[i - 1];
        daily.push(diff < 0 ? 0 : diff);
    }

    return { dates, daily };
}

function renderChart(dates, data, label) {
    if (chartInstance) chartInstance.destroy();

    chartInstance = new Chart(chartCanvas, {
        type: "bar",
        data: {
            labels: dates,
            datasets: [{
                label: `Dzienne przypadki COVID — ${label}`,
                data: data,
                backgroundColor: "rgba(54,162,235,0.5)",
                borderColor: "rgba(54,162,235,1)",
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                yAxes: [{
                    ticks: { beginAtZero: true }
                }]
            }
        }
    });
}

async function fetchCovidData(country, from, to) {
    const url = `${API_BASE}/historical/${country}?lastdays=all`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            console.warn("Brak danych dla kraju:", country);

            if (chartInstance) chartInstance.destroy();
            return;
        }

        const data = await response.json();

        if (!data.timeline || !data.timeline.cases) {
            console.warn("Ten kraj nie posiada danych historycznych.");
            if (chartInstance) chartInstance.destroy();
            return;
        }

        const { dates, daily } = processDailyCases(data.timeline.cases);

        const filteredDates = [];
        const filteredData = [];

        dates.forEach((d, i) => {
            if (d >= from && d <= to) {
                filteredDates.push(d);
                filteredData.push(daily[i]);
            }
        });

        renderChart(filteredDates, filteredData, data.country);

    } catch (err) {
        console.error("Błąd pobierania danych:", err);
    }
}

async function loadCountries() {
    const response = await fetch(`${API_BASE}/countries`);
    const countries = await response.json();

    countries.sort((a, b) => a.country.localeCompare(b.country));

    countries.forEach(c => {
        const option = document.createElement("option");
        option.value = c.country;
        option.textContent = c.country;

        if (c.country === "Poland") option.selected = true;

        countrySelect.appendChild(option);
    });
}

function handleSubmit(e) {
    e.preventDefault();
    fetchCovidData(countrySelect.value, dateFromInput.value, dateToInput.value);
}

async function init() {
    setInitialDates();
    await loadCountries();
    handleSubmit({ preventDefault: () => {} });
    form.addEventListener("submit", handleSubmit);
}

init();
