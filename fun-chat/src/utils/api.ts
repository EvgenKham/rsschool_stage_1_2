const socket = new WebSocket("ws://127.0.0.1:4000");

// Функция для отправки данных на сервер
export function sendLoginData(login: string, password: string): void {
  const requestId = generateRequestId();
  const requestData = {
    id: requestId,
    type: "USER_LOGIN",
    payload: {
      user: {
        login: login,
        password: password,
      },
    },
  };

  // Отправляем данные на сервер
  socket.send(JSON.stringify(requestData));
}

// Функция для генерации уникального ID запроса
function generateRequestId(): string {
  return "req-" + Math.random().toString(36).substr(2, 9);
}

// Обработчик события для получения ответов от сервера
socket.onmessage = function (event): void {
  const response = JSON.parse(event.data);
  // console.log("Response from server:", response);

  // Обработка ответа от сервера
  if (response.type === "USER_LOGIN_RESPONSE") {
    if (response.payload.success) {
      console.log("Login successful!", response.payload.data);
      // Здесь можно обработать успешный логин (например, перенаправить пользователя)
    } else {
      // Если ответ не успешный, выводим сообщение об ошибке
      displayError(response.payload.error);
    }
  } else if (response.type === "ERROR") {
    // Обработка ошибок
    displayError(response.payload.error);
  }
};

// Функция для отображения ошибок от сервера
function displayError(errorMessage: string): void {
  const errorPassword: HTMLElement | null =
    document.getElementById("passwordError");
  if (errorPassword) {
    errorPassword.textContent = errorMessage;
  }
}
