import createHeader from "./componets/header";
import {
  createSettingSection,
  createGarageSection,
  craetePagination,
} from "./componets/garage";
import createWinners from "./componets/winners";
// Управляет навигацией между разными частями приложения,
// обеспечивая бесшовный переход между "Garage" и "Winners"
// API: History API

export const sections: { [key: string]: HTMLElement } = {
  header: createHeader(),
  setting: createSettingSection(),
  track: createGarageSection(),
  paginationGarage: craetePagination("cars"),
  winners: createWinners(),
  paginationWinners: craetePagination("wins"),
};

export function renderStartPage(): void {
  const container: HTMLElement = document.createElement("div");
  container.classList.add("container");
  container.append(sections.header);
  container.append(sections.setting);
  container.append(sections.track);
  container.append(sections.paginationGarage);

  const winnerTable: HTMLElement = sections.winners;
  winnerTable.style.display = "none";
  const winnerPagination: HTMLElement = sections.paginationWinners;
  winnerPagination.style.display = "none";
  container.append(winnerTable, winnerPagination);
  document.body.append(container);
}

// Функция для отображения Garage page
function showGaragePage(): void {
  sections.setting.style.display = "grid";
  sections.track.style.display = "flex";
  sections.paginationGarage.style.display = "flex";
  sections.winners.style.display = "none";
  sections.paginationWinners.style.display = "none";
}

// Функция для отображения Winners page
function showWinnersPage(): void {
  sections.setting.style.display = "none";
  sections.track.style.display = "none";
  sections.paginationGarage.style.display = "none";
  sections.winners.style.display = "block";
  sections.paginationWinners.style.display = "flex";
}

// Обработчики событий навигации
document.addEventListener("DOMContentLoaded", function () {
  const buttonGarage: HTMLButtonElement | null =
    document.querySelector(".btn_garage");
  const buttonWinners: HTMLButtonElement | null =
    document.querySelector(".btn_winners");

  buttonGarage?.addEventListener("click", (event) => {
    event.preventDefault();
    navigateTo("garage");
    buttonGarage.classList.add("btn__disable");
    buttonWinners?.classList.remove("btn__disable");
  });

  buttonWinners?.addEventListener("click", (event) => {
    event.preventDefault();
    navigateTo("winners");
    buttonGarage?.classList.remove("btn__disable");
    buttonWinners.classList.add("btn__disable");
  });
});

// Функция для обработки навигации
function navigateTo(page: string): void {
  history.pushState({ page }, "", page);
  if (page === "garage") {
    showGaragePage();
  } else if (page === "winners") {
    showWinnersPage();
  }
}

// Обработка события "popstate" для навигации назад/вперед
window.addEventListener("popstate", (event) => {
  if (event.state) {
    if (event.state.page === "garage") {
      showGaragePage();
    } else if (event.state.page === "winners") {
      showWinnersPage();
    }
  }
});
