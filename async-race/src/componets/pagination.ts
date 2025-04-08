import { sections } from "../router";
import { getAllCars } from "../utils/api";
import type { Car } from "../utils/api";

export function getCarsForDisplay(cars: Car[]): Car[] {
  const carsPerPage: number = 7;
  let currentPage: number = 1;

  const startIndex = (currentPage - 1) * carsPerPage;
  const endIndex = startIndex + carsPerPage;

  // const cars: Car[] = await getAllCars();

  const carsToDisplay = cars.slice(startIndex, endIndex);

  return carsToDisplay;
}

const carsPerPage = 7;
let currentPage = 1;

// Функция для отображения автомобилей
// function displayCar(): void {
//   const garage = document.getElementById("garage");
//   garage.innerHTML = ""; // Очищаем контейнер

//   const startIndex = (currentPage - 1) * carsPerPage;
//   const endIndex = startIndex + carsPerPage;

//   const carsToDisplay = cars.slice(startIndex, endIndex);

//   carsToDisplay.forEach((car) => {
//     const carDiv = document.createElement("div");
//     carDiv.className = "car";
//     carDiv.innerHTML = `Модель: ${car.model}, Год выпуска: ${car.year}`;
//     garage.appendChild(carDiv);
//   });
// }

// Функция для отображения кнопок пагинации
// function displayPagination(): void {
//   const pagination = document.getElementById("pagination");
//   pagination.innerHTML = ""; // Очищаем контейнер

//   const totalPages = Math.ceil(cars.length / carsPerPage);

//   for (let i = 1; i <= totalPages; i++) {
//     const button = document.createElement("button");
//     button.innerText = i;
//     button.onclick = () => {
//       currentPage = i;
//       displayCar();
//       displayPagination();
//     };

//     if (i === currentPage) {
//       button.disabled = true; // Деактивируем кнопку текущей страницы
//     }

//     pagination.appendChild(button);
//   }
// }

// Инициализация
// displayCar();
// displayPagination();
