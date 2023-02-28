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
// просто выводит текст
// let btnSendRequest = document.querySelector('.base__send-request'); // кнопка отправки запроса

// btnSendRequest.addEventListener('click', () => { // событие клика
//     let textArea = document.querySelector('.base__area'), // получение поля для ввода текста
//     answer = document.querySelector('.answer__answer'); // получение дива для вывода информации

//     answer.innerHTML = textArea.value; // добавление текста в див
// })
// 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
// ========================
// работает только отвечает бредом
// получаем кнопку и textarea
// const sendButton = document.querySelector('.base__send-request');
// const textArea = document.querySelector('.base__area');
// // получаем div для вывода ответа
// const answerDiv = document.querySelector('.answer__answer');

// // добавляем обработчик события на кнопку
// sendButton.addEventListener('click', async () => {
//   // получаем текст из textarea
//   const text = textArea.value;
//   // делаем запрос на ChatGPT API
//   const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': 'Bearer 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' // замените YOUR_API_TOKEN на ваш API-токен
//     },
//     body: JSON.stringify({
//       prompt: text,
//       max_tokens: 200,
//       n: 1,
//       stop: ['\n']
//     })
//   });
//   // парсим ответ в формате JSON
//   const data = await response.json();
//   // выводим ответ в div
//   answerDiv.innerText = data.choices[0].text;
// });
// ==================================
// точно рабочий
// получаем кнопку и textarea
const sendButton = document.querySelector('.base__send-request');
const textArea = document.querySelector('.base__area');
// получаем div для вывода ответа
const answerDiv = document.querySelector('.answer__answer');

// добавляем обработчик события на кнопку
sendButton.addEventListener('click', async () => {
  // получаем текст из textarea
  const text = textArea.value;
  // делаем запрос на GPT-2 API
  const response = await fetch('https://api.openai.com/v1/engines/text-davinci-003/completions?model=text-davinci-003', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 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' // замените YOUR_API_TOKEN на ваш API-токен
    },
    body: JSON.stringify({
      prompt: text,
      max_tokens: 100,
      n: 1,
      stop: ['\n']
    })
  });
  // парсим ответ в формате JSON
  const data = await response.json();
  // выводим ответ в div
  console.log(data);
  answerDiv.innerHTML = data.choices[0].text;
//   answerDiv.innerText = data.choices[0].text;
});
