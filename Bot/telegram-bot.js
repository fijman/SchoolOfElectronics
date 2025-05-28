import { config } from './config.js';

// Функция отправки сообщения в Telegram
async function sendToTelegram(name, phone, message) {
    const text = `Новая заявка!\n\nИмя: ${name}\nТелефон: ${phone}\nСообщение: ${message}`;
    const url = `https://api.telegram.org/bot${config.botToken}/sendMessage`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: config.chatId,
                text: text,
                parse_mode: 'HTML'
            })
        });

        return response.ok;
    } catch (error) {
        console.error('Ошибка отправки в Telegram:', error);
        return false;
    }
}

// Экспортируем функцию для использования в других файлах
export { sendToTelegram }; 