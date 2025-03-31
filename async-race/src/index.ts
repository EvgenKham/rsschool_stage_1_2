import type { Car } from "./utils/api";
import {
  createCar,
  deleteCar,
  getAllCars,
  getCar,
  updateCar,
} from "./utils/api";

const carId = 2;

const exampleNewCar: Car = {
  name: "New Red Car",
  color: "#ff0000",
};

getCar(carId).then((car) => {
  console.log("Car:", car);
});

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
