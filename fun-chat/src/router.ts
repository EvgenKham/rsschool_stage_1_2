import { renderChat } from "./componets/chat";
import { renderFooter } from "./componets/footer";
import { renderHeader } from "./componets/header";
import { renderAbout } from "./componets/info";
import { renderLogin } from "./componets/login";

const historyStack: string[] = [];

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
  // const buttonLogout: HTMLButtonElement | null =
  //   document.querySelector(".btn_logout");

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

  // buttonWinners?.addEventListener("click", (event) => {
  //   event.preventDefault();
  //   navigateTo("winners");
  //   buttonGarage?.classList.remove("btn__disable");
  //   buttonWinners.classList.add("btn__disable");
  // });
});

// Функция для обработки навигации
export function navigateTo(page: string): void {
  historyStack.push(page);
  history.pushState({ page }, "", page);
  if (page === "login") {
    showLoginPage();
  } else if (page === "chat") {
    showChatPage();
  } else if (page === "about") {
    showAboutPage();
  }
}

// Обработка события "popstate" для навигации назад/вперед
// window.addEventListener("popstate", (event) => {
//   if (event.state) {
//     if (event.state.page === "garage") {
//       showGaragePage();
//     } else if (event.state.page === "winners") {
//       showWinnersPage();
//     }
//   }
// });
