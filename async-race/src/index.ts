import "./styles/css/main.css";
import { renderStartPage } from "./router";
import { buildNewCar, updateSelectedCar } from "./componets/garage";
import { randomCars } from "./utils/randomCars";

// Инициализация приложения
renderStartPage();

document.addEventListener("DOMContentLoaded", () => {
  // Создаем новое авто
  const buttonCreate: HTMLButtonElement | null =
    document.querySelector(".btn_create");
  if (buttonCreate) {
    buttonCreate.addEventListener("click", buildNewCar);
  }

  // Обновляем выбранное авто
  const buttonUpdate: HTMLButtonElement | null =
    document.querySelector(".btn_update");
  if (buttonUpdate) {
    buttonUpdate.addEventListener("click", updateSelectedCar);
  }

  // Генерация 100 случайных авто
  const buttonRandom: HTMLElement | null =
    document.querySelector(".btn_generate");
  if (buttonRandom) {
    buttonRandom.addEventListener("click", randomCars);
  }
});
