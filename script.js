// Replace 'YOUR_API_KEY' with your Fixer.io API key
const apiKey = "aa18b7c4d644858f242945349f28e695";
const apiEndpoint = `http://data.fixer.io/api/latest?access_key=${apiKey}`;
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const amount = document.getElementById("amount");
const result = document.getElementById("result");
const convertButton = document.getElementById("convert");

// Fetch the exchange rates and populate the currency dropdowns
fetch(apiEndpoint)
    .then((response) => response.json())
    .then((data) => {
        const currencies = Object.keys(data.rates);
        currencies.forEach((currency) => {
            fromCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
            toCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
        });
    });

// Conversion function
function convertCurrency() {
    fetch(apiEndpoint)
        .then((response) => response.json())
        .then((data) => {
            const from = fromCurrency.value;
            const to = toCurrency.value;
            const exchangeRate = data.rates[to] / data.rates[from];
            const convertedAmount = (amount.value * exchangeRate).toFixed(2);
            result.textContent = `${amount.value} ${from} = ${convertedAmount} ${to}`;
        })
        .catch((error) => {
            console.error("Error fetching exchange rates: " + error);
        });
}

convertButton.addEventListener("click", convertCurrency);

// Handle keyboard accessibility
amount.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        convertCurrency();
    }
});
