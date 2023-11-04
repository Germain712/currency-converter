// Replace 'YOUR_API_KEY' with your Open Exchange Rates API key
const apiEndpoint = "https://open.er-api.com/v6/latest/YOUR_API_KEY";
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
    const from = fromCurrency.value;
    const to = toCurrency.value;
    const exchangeRate = data.rates[to] / data.rates[from];
    const convertedAmount = (amount.value * exchangeRate).toFixed(2);
    result.textContent = `${amount.value} ${from} = ${convertedAmount} ${to}`;
}

convertButton.addEventListener("click", convertCurrency);

// Handle keyboard accessibility
amount.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        convertCurrency();
    }
});
