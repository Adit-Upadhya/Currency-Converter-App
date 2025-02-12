// API configuration
    const API_KEY = '760551541c26b12882518601'; // Get free API key from exchangerate-api.com
    const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;

    // Elements
    const amountEl = document.getElementById('amount');
    const fromCurrencyEl = document.getElementById('from-currency');
    const toCurrencyEl = document.getElementById('to-currency');
    const exchangeRateEl = document.getElementById('exchange-rate');
    const convertedAmountEl = document.getElementById('converted-amount');
    const updateTimeEl = document.getElementById('update-time');

    let exchangeRates = { };
    let lastUpdate = '';

    // Fetch exchange rates
    async function getExchangeRates() {
            try {
                const response = await fetch(BASE_URL);
    const data = await response.json();

    if (data.result === 'success') {
        exchangeRates = data.conversion_rates;
    lastUpdate = new Date(data.time_last_update_utc).toLocaleTimeString();
    populateCurrencies(data.conversion_rates);
    updateConversion();
                } else {
        console.error('Error fetching rates:', data);
    updateTimeEl.textContent = 'Failed to load rates';
                }
            } catch (error) {
        console.error('Error fetching rates:', error);
    updateTimeEl.textContent = 'Failed to load rates';
            }
        }

    // Populate currency options
    function populateCurrencies(rates) {
            const currencies = Object.keys(rates);

            currencies.forEach(currency => {
                const option1 = new Option(`${currency} (${getCurrencyName(currency)})`, currency);
    const option2 = new Option(`${currency} (${getCurrencyName(currency)})`, currency);

    fromCurrencyEl.add(option1);
    toCurrencyEl.add(option2);
            });

    updateTimeEl.textContent = lastUpdate;
        }

    // Update conversion
    function updateConversion() {
            const fromCurrency = fromCurrencyEl.value;
    const toCurrency = toCurrencyEl.value;
    const amount = parseFloat(amountEl.value);

    if (exchangeRates[fromCurrency] && exchangeRates[toCurrency]) {
                const rate = exchangeRates[toCurrency] / exchangeRates[fromCurrency];
    const converted = (amount * rate).toFixed(2);

    exchangeRateEl.textContent = `1 ${fromCurrency} = ${rate.toFixed(4)} ${toCurrency}`;
    convertedAmountEl.textContent = `${converted} ${toCurrency}`;
            }
        }

    // Swap currencies
    function swapCurrencies() {
            const temp = fromCurrencyEl.value;
    fromCurrencyEl.value = toCurrencyEl.value;
    toCurrencyEl.value = temp;
    updateConversion();
        }

    // Get currency name
    function getCurrencyName(currencyCode) {
            const currencyNames = {
        USD: 'US Dollar',
    INR: 'Indian Rupee',
    EUR: 'Euro',
    GBP: 'British Pound',
    JPY: 'Japanese Yen',
                // Add more currencies as needed
            };
    return currencyNames[currencyCode] || currencyCode;
        }

        // Event listeners
        document.addEventListener('DOMContentLoaded', () => {
        amountEl.addEventListener('input', updateConversion);
    fromCurrencyEl.addEventListener('change', updateConversion);
    toCurrencyEl.addEventListener('change', updateConversion);

    // Initial load
    getExchangeRates();
        });