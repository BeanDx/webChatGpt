"use strict";
// ========================
// Themes
document.querySelector('.themetoggle').addEventListener('click', (event) => {
    event.preventDefault();
    if (localStorage.getItem('theme') === 'dark') {
        localStorage.removeItem('theme');
    } else {
        localStorage.setItem('theme', 'dark');
    }
    addDarkClassHTML();
});

function addDarkClassHTML() {
    try {
        if (localStorage.getItem('theme') === 'dark') {
            document.querySelector('html').classList.add('dark');
            document.querySelector('.themetoggle span').textContent = 'dark_mode';
        }
        else {
            document.querySelector('html').classList.remove('dark');
            document.querySelector('.themetoggle span').textContent = 'wb_sunny';
        }
    } catch (err) { }
}
addDarkClassHTML();
// ======================== 
// request to chatgpt
// const sendButton = document.querySelector('.base__send-request');
// const textArea = document.querySelector('.base__area');
// const answerDiv = document.querySelector('.answer__answer');

// sendButton.addEventListener('click', async () => {
//     sendButton.disabled = true;
//     sendButton.style.cursor = 'not-allowed';
//     let countdown = 20;
//     const countdownInterval = setInterval(() => {
//         sendButton.textContent = `Отправить (${countdown}s)`;
//         countdown--;
//         if (countdown < 0) {
//             clearInterval(countdownInterval);
//             sendButton.disabled = false;
//             sendButton.style.cursor = 'pointer';
//             sendButton.textContent = 'Отправить';
//         }
//     }, 1000);
//     try {
//         const text = textArea.value;
//         const response = await fetch('https://api.openai.com/v1/engines/text-davinci-003/completions?model=text-davinci-003', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': 'Bearer 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' // замените YOUR_API_TOKEN на ваш API-токен
//             },
//             body: JSON.stringify({
//                 prompt: text,
//                 max_tokens: 2000,
//                 n: 5,
//                 top_p: 1.0,
//                 frequency_penalty: 0.0,
//                 presence_penalty: 0.6,
//                 stop: ['You']
//             })
//         });

//         if (!response.ok) {
//             throw new Error(`Ошибка HTTP: ${response.status}`);
//         }

//         const data = await response.json();
//         console.log(data);
//         answerDiv.innerText = data.choices[0].text;
//     } catch (error) {
//         console.error(`Ошибка: ${error.message}`);
//     }
// });

// ======================== 
// експеременталка
const sendButton = document.querySelector('.base__send-request');
const textArea = document.querySelector('.base__area');
const answerDiv = document.querySelector('.answer__answer');

sendButton.addEventListener('click', async () => {
    sendButton.disabled = true;
    sendButton.style.cursor = 'not-allowed';
    let countdown = 20;
    const countdownInterval = setInterval(() => {
        sendButton.textContent = `Отправить (${countdown}s)`;
        countdown--;
        if (countdown < 0) {
            clearInterval(countdownInterval);
            sendButton.disabled = false;
            sendButton.style.cursor = 'pointer';
            sendButton.textContent = 'Отправить';
        }
    }, 1000);
    try {
        const text = textArea.value;
        const response = await fetch('https://api.openai.com/v1/engines/text-davinci-003/completions?model=text-davinci-003', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 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' // замените YOUR_API_TOKEN на ваш API-токен
            },
            body: JSON.stringify({
                prompt: text,
                max_tokens: 2000,
                n: 5,
                top_p: 1.0,
                frequency_penalty: 0.0,
                presence_penalty: 0.6,
                stop: ['You']
            })
        });

        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        answerDiv.innerText = data.choices[0].text;
    } catch (error) {
        console.error(`Ошибка: ${error.message}`);
    }
});
