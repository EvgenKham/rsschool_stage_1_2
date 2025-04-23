import { resetForm } from "../componets/login";
import { authenticate, logout, navigateTo } from "./router";

const socket = new WebSocket("ws://127.0.0.1:4000");
let LOGIN = "";
let PASSWORD = "";

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

  LOGIN = login;
  PASSWORD = password;
  socket.send(JSON.stringify(requestData));
}

export function logoutUser(): void {
  const requestId = generateRequestId();
  const requestData = {
    id: requestId,
    type: "USER_LOGOUT",
    payload: {
      user: {
        login: LOGIN,
        password: PASSWORD,
      },
    },
  };
  console.log(LOGIN, PASSWORD);

  socket.send(JSON.stringify(requestData));
}

// Функция для генерации уникального ID запроса
function generateRequestId(): string {
  return "req-" + Math.random().toString(36).substr(2, 9);
}

// Обработчик события для получения ответов от сервера
socket.onmessage = function (event): void {
  const response = JSON.parse(event.data);
  console.log("Response from server:", response);

  // Обработка ответа от сервера
  if (response.type === "USER_LOGIN") {
    console.log("Login successful!");
    successAuth(response.payload.user.login);
  } else if (response.type === "ERROR") {
    displayError(response.payload.error);
  }

  if (response.type === "USER_LOGOUT") {
    console.log("Logout successful!");
    successLogout();
  } else if (response.type === "ERROR") {
    displayError(response.payload.error);
  }
};

// Функция для отображения ошибок от сервера при авторизации
function displayError(errorMessage: string): void {
  const errorPassword: HTMLElement | null =
    document.getElementById("passwordError");
  if (errorPassword) {
    errorPassword.textContent = errorMessage;
  }
}

function successAuth(name: string): void {
  resetForm();
  authenticate();
  const buttonLogout: HTMLElement | null =
    document.querySelector(".btn_logout");

  const personAuthorizated: HTMLElement | null =
    document.querySelector(".login-name");

  if (buttonLogout) {
    buttonLogout.classList.remove("btn_disable");
  }

  if (personAuthorizated) {
    personAuthorizated.textContent = name;
  }
}

function successLogout(): void {
  logout();
  const buttonLogout: HTMLElement | null =
    document.querySelector(".btn_logout");

  const personAuthorizated: HTMLElement | null =
    document.querySelector(".login-name");

  if (buttonLogout) {
    buttonLogout.classList.add("btn_disable");
  }

  if (personAuthorizated) {
    personAuthorizated.textContent = "";
  }
}
