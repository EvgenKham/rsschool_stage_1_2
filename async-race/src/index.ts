import "./styles/css/main.css";
import { renderStartPage } from "./router";
import { createNewCar, deleteCarFromPage } from "./componets/garage";
// import type { Car } from "./utils/api";

import {
  createCar,
  deleteCar,
  getAllCars,
  getCar,
  updateCar,
} from "./utils/api";

// const carId = 2;

// const exampleNewCar: Car = {
//   name: "New Red Car",
//   color: "#ff0000",
// };

// getCar(carId).then((car) => {
//   console.log("Car:", car);
// });

// getAllCars().then((cars) => {
//   cars.forEach((car, index) => console.log(`Car #${index + 1}:`, car));
// });

// deleteCar(5).then();

// getCar(carId).then((car) => {
//   const newName: string = "Mersedes";

//   const updatedCar: Car = {
//     ...car,
//     name: newName,
//   };

//   return updateCar(updatedCar);
// });

// Инициализация приложения
renderStartPage();

document.addEventListener("DOMContentLoaded", () => {
  // Создаем новое авто
  const buttonCreate: HTMLButtonElement | null =
    document.querySelector(".btn_create");
  if (buttonCreate) {
    buttonCreate.addEventListener("click", createNewCar);
  }
});
