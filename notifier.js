const axios = require('axios');

var { Web3 } = require("web3");
var provider = "wss://mainnet.infura.io/ws/v3/d84fcf1869e64029beaf2a1e13d1428f";
var web3Provider = new Web3.providers.WebsocketProvider(provider);
var web3 = new Web3(web3Provider);
// Подключение к узлу Ethereum

// Замените YOUR_INFURA_PROJECT_ID на ваш Infura Project ID

// Замените YOUR_TELEGRAM_BOT_TOKEN и YOUR_CHAT_ID на ваш токен бота и ID вашего чата
const TELEGRAM_BOT_TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN';
const CHAT_ID = 'YOUR_CHAT_ID';

// Функция для отправки уведомлений в телеграм
async function sendTelegramMessage(message) {
    try {
        await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            text: message
        });
        console.log('Уведомление отправлено в телеграм:', message);
    } catch (error) {
        console.error('Ошибка при отправке уведомления в телеграм:', error.response.data);
    }
}

// Функция для подписки на событие новых транзакций
async function subscribeToNewTransactions(threshold = 1000) {
    console.log(await web3.eth.getBlock())
    web3.eth.subscribe('pendingTransactions', (error, result) => {
        if (error) {
            console.error('Ошибка при подписке на новые транзакции:', error);
            return;
        }

        console.log('Получена новая транзакция:', result);

        web3.eth.getTransaction(result).then(transaction => {
            if (parseInt(transaction.value) >= threshold) {
                console.log('Найдена большая транзакция:', transaction);
                const message = `Обнаружена большая транзакция на сумму ${web3.utils.fromWei(transaction.value)} ETH\nХеш транзакции: ${transaction.hash}`;
                // sendTelegramMessage(message);
            }
        }).catch(err => {
            console.error('Ошибка при получении информации о транзакции:', err);
        });
    });
}

// Пример использования
const threshold = 1000; // Устанавливаем пороговое значение для "больших" транзакций
module.exports = {subscribeToNewTransactions};
