import { renderChat } from "../componets/chat";
import { renderFooter } from "../componets/footer";
import { renderHeader } from "../componets/header";
import { renderAbout } from "../componets/info";
import { renderLogin } from "../componets/login";

const historyStack: string[] = [];
let isAuthenticated: boolean = false;

export const sections: { [key: string]: HTMLElement } = {
  header: renderHeader(),
  login: renderLogin(),
  chat: renderChat(),
  about: renderAbout(),
  footer: renderFooter(),
};

export function renderStartPage(): void {
  const wrapper: HTMLElement = document.createElement("div");
  wrapper.classList.add("wrapper");
  const main: HTMLElement = document.createElement("main");
  main.classList.add("main");

  wrapper.append(sections.header);
  const chat: HTMLElement = sections.chat;
  chat.style.display = "none";
  const about: HTMLElement = sections.about;
  about.style.display = "none";
  main.append(sections.login, chat, about);
  wrapper.append(main);
  wrapper.append(sections.footer);
  historyStack.push("login");
  history.pushState({ page: "login" }, "", "login");

  document.body.append(wrapper);
}

// Функция для отображения Login page
function showLoginPage(): void {
  sections.login.style.display = "flex";
  sections.chat.style.display = "none";
  sections.about.style.display = "none";
}

// Функция для отображения Chat page
function showChatPage(): void {
  sections.login.style.display = "none";
  sections.chat.style.display = "flex";
  sections.about.style.display = "none";
}

// Функция для отображения About page
function showAboutPage(): void {
  sections.login.style.display = "none";
  sections.chat.style.display = "none";
  sections.about.style.display = "flex";
}

// Обработчики событий навигации
document.addEventListener("DOMContentLoaded", function () {
  const buttonAbout: HTMLButtonElement | null =
    document.querySelector(".btn_about");

  const storedAuthStatus = sessionStorage.getItem("isAuthenticated");
  isAuthenticated = storedAuthStatus === "true";

  const page = window.location.pathname.split("/").pop();
  if (page) {
    navigateTo(page);
  }

  buttonAbout?.addEventListener("click", (event) => {
    event.preventDefault();
    if (buttonAbout.textContent === "Back") {
      buttonAbout.textContent = "About";
      historyStack.pop();
      const previousPage = historyStack.pop();
      if (previousPage) {
        navigateTo(previousPage);
      }
    } else if (buttonAbout.textContent === "About") {
      buttonAbout.textContent = "Back";
      navigateTo("about");
    }
  });
});

export function navigateTo(page: string): void {
  if (page === "login" && isAuthenticated) {
    showChatPage();
    historyStack.push("chat");
    history.pushState({ page: "chat" }, "", "chat");
    const buttonLogout: HTMLElement | null =
      document.querySelector(".btn_logout");
    if (buttonLogout) {
      buttonLogout.classList.remove("btn_disable");
    }
  }

  if (page === "chat" && isAuthenticated) {
    showChatPage();
    historyStack.push("chat");
    history.pushState({ page: "chat" }, "", "chat");
  }

  if (page === "login" && !isAuthenticated) {
    showLoginPage();
    historyStack.push("login");
    history.pushState({ page: "login" }, "", "login");
  }

  if (page === "chat" && !isAuthenticated) {
    showLoginPage();
    historyStack.push("login");
    history.pushState({ page: "login" }, "", "login");
  }

  if (page === "about") {
    showAboutPage();
    historyStack.push(page);
    history.pushState({ page }, "", page);
  }
}

// Обработка события "popstate" для навигации назад/вперед
window.addEventListener("popstate", (event) => {
  if (event.state) {
    navigateTo(event.state.page);
  } else {
    navigateTo("login");
  }
});

// Функция для аутентификации пользователя
export function authenticate(): void {
  isAuthenticated = true;
  sessionStorage.setItem("isAuthenticated", "true");
  navigateTo("chat");
}

// Функция для выхода пользователя
export function logout(): void {
  isAuthenticated = false;
  sessionStorage.removeItem("isAuthenticated");
  navigateTo("login");
}
