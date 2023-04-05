"use strict";

function addDarkClassHTML() {
  try {
    if (localStorage.getItem("theme") === "dark") {
      document.querySelector("html").classList.add("dark");
      document.querySelector(".themetoggle span").textContent = "dark_mode";
    } else {
      document.querySelector("html").classList.remove("dark");
      document.querySelector(".themetoggle span").textContent = "wb_sunny";
    }
  } catch (err) {
    console.error(`Ошибка: ${err.message}`);
  }
}

document.querySelector(".themetoggle").addEventListener("click", (e) => {
  e.preventDefault();
  if (localStorage.getItem("theme") === "dark") {
    localStorage.removeItem("theme");
  } else {
    localStorage.setItem("theme", "dark");
  }
  addDarkClassHTML();
});

addDarkClassHTML();

const sendButton = document.querySelector(".base__send-request");
const textArea = document.querySelector(".base__area");
const answerDiv = document.querySelector(".answer__answer");

sendButton.addEventListener("click", async () => {
  sendButton.disabled = true;
  sendButton.style.cursor = "not-allowed";

  // проверяем, есть ли сохраненное значение счетчика в localStorage
  let seconds = localStorage.getItem('countdownSeconds') || 20;

  let countdown = setInterval(() => {
    sendButton.textContent = `Подождите(${seconds}s)`;
    --seconds;
    // сохраняем значение счетчика в localStorage при каждом изменении
    localStorage.setItem('countdownSeconds', seconds);

    if (seconds < 0) {
      clearInterval(countdown);
      sendButton.disabled = false;
      sendButton.style.cursor = "pointer";
      sendButton.textContent = "Отправить";

      // удаляем сохраненное значение счетчика при завершении отсчета
      localStorage.removeItem('countdownSeconds');
    }
  }, 1000);
  try {
    const prompt = textArea.value;
    if (prompt === "") {
      throw new Error("Вы ввели пустой запрос! Попробуйте еще раз!");
    }
    const response = await fetch("https://api.openai.com/v1/engines/text-davinci-003/completions?model=text-davinci-003", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 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",
      },
      body: JSON.stringify({
        prompt: prompt,
        max_tokens: 2000,
        n: 5,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0.6,
        stop: ["You"]
      })
    });
    if (!response.ok) {
      throw Error(`Ошибка HTTP: ${ response.status }`);
    }
    const responseBody = await response.json();
    console.log(responseBody);
    answerDiv.innerText = responseBody.choices[0].text;
  } catch (err) {
    console.error(`Ошибка: ${ err.message }`);
    answerDiv.innerText = err.message;
  }
});
