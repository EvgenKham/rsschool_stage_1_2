import "./styles/css/main.css";
import { renderStartPage } from "./router";
import { createNewCar, updateSelectedCar } from "./componets/garage";

// Инициализация приложения
renderStartPage();

document.addEventListener("DOMContentLoaded", () => {
  // Создаем новое авто
  const buttonCreate: HTMLButtonElement | null =
    document.querySelector(".btn_create");
  if (buttonCreate) {
    buttonCreate.addEventListener("click", createNewCar);
  }

  // Обновляем выбранное авто
  const buttonUpdate: HTMLButtonElement | null =
    document.querySelector(".btn_update");
  if (buttonUpdate) {
    buttonUpdate.addEventListener("click", updateSelectedCar);
  }
});
