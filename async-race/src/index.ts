import "./styles/css/main.css";
// import type { Car } from "./utils/api";
import createHeader from "./componets/header";
import {
  createSettingSection,
  createGarageSection,
  craetePagination,
} from "./componets/garage";

// import {
//   createCar,
//   deleteCar,
//   getAllCars,
//   getCar,
//   updateCar,
// } from "./utils/api";

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

// createCar(exampleNewCar).then();

// deleteCar(9).then();

// getCar(carId).then((car) => {
//   const newName: string = "Mersedes";

//   const updatedCar: Car = {
//     ...car,
//     name: newName,
//   };

//   return updateCar(updatedCar);
// });

const container: HTMLElement = document.createElement("div");
container.classList.add("container");
container.append(createHeader());
container.append(createSettingSection());
container.append(createGarageSection());
container.append(craetePagination());
document.body.append(container);
