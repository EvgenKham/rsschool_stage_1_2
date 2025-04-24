import {
  changeActive,
  showActiveUsers,
  showInactiveUsers,
  showListPersons,
} from "../componets/chat";
import { resetForm } from "../componets/login";
import { authenticate, logout } from "./router";
import type { user } from "../componets/chat";

const socket = new WebSocket("ws://127.0.0.1:4000");

type userActive = {
  id: string;
  type: string;
  payload: { users: [] };
};

const ACTIVE_USERS: user[] = [];
const INACTIVE_USERS: user[] = [];
let LOGIN = "";
let PASSWORD = "";

// Функция для отправки данных на сервер
export function loginUser(login: string, password: string): void {
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
  localStorage.setItem(
    "userStatus",
    JSON.stringify({ login: LOGIN, status: "online" }),
  );
  getUsersInactive();
  getUsersActive();
  // showListPersons(getRenderUsers());
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
  localStorage.setItem(
    "userStatus",
    JSON.stringify({ login: LOGIN, status: "offline" }),
  );
  getUsersInactive();
  // getUsersActive();
  // showListPersons(getRenderUsers());
}

function getUsersActive(): void {
  const requestData = {
    id: generateRequestId(),
    type: "USER_ACTIVE",
    payload: null,
  };
  socket.send(JSON.stringify(requestData));
}

function getUsersInactive(): void {
  const requestData = {
    id: generateRequestId(),
    type: "USER_INACTIVE",
    payload: null,
  };
  socket.send(JSON.stringify(requestData));
}

function getMessagesFromUser(users: user[] | null): void {
  if (users) {
    users.forEach((user) => {
      if (user.login !== LOGIN) {
        const requestData = {
          id: generateRequestId(),
          type: "MSG_FROM_USER",
          payload: {
            user: {
              login: user.login,
            },
          },
        };
        socket.send(JSON.stringify(requestData));
      }
    });
  }
}

// Функция для генерации уникального ID запроса
function generateRequestId(): string {
  return "req-" + Math.random().toString(36).substr(2, 9);
}

// Обработчик события для получения ответов от сервера
socket.onmessage = function (event): void {
  const response = JSON.parse(event.data);

  // Обработка ответа от сервера
  if (response.type === "USER_LOGIN") {
    // console.log("Login successful!");
    successAuth(response.payload.user.login);
    showListPersons(getRenderUsers());
  } else if (response.type === "ERROR") {
    displayError(response.payload.error);
  }

  if (response.type === "USER_LOGOUT") {
    // console.log("Logout successful!");
    successLogout();
    showListPersons(getRenderUsers());
  } else if (response.type === "ERROR") {
    displayError(response.payload.error);
  }

  if (response.type === "USER_ACTIVE") {
    console.log("Get active users");
    ACTIVE_USERS.splice(0);
    ACTIVE_USERS.push(...response.payload.users);
    console.log(ACTIVE_USERS);
    showActiveUsers(response.payload.users);
    getMessagesFromUser(response.payload.users);
  } else if (response.type === "ERROR") {
    displayError(response.payload.error);
  }

  if (response.type === "USER_INACTIVE") {
    console.log("Get inactive users");
    INACTIVE_USERS.splice(0);
    INACTIVE_USERS.push(...response.payload.users);
    console.log(INACTIVE_USERS);
    showInactiveUsers(response.payload.users);
    getMessagesFromUser(response.payload.users);
  } else if (response.type === "ERROR") {
    displayError(response.payload.error);
  }

  if (response.type === "MSG_FROM_USER") {
    console.log("Get msg from user");
    const message = response.payload.messages;
    showListPersons(getRenderUsers());
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

function getRenderUsers(): user[] {
  const users: user[] = [...INACTIVE_USERS, ...ACTIVE_USERS];
  const filteredUsers = users.filter((user) => user.login !== LOGIN);
  return filteredUsers;
}

window.addEventListener("storage", (event) => {
  if (event.key === "userStatus") {
    const userStatus = JSON.parse(event.newValue || "null");
    if (userStatus) {
      changeActive(userStatus.login, userStatus.status);
      console.log(`${userStatus.login} is now ${userStatus.status}`);
    }
  }
});
