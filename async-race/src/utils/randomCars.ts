import {
  updateCountTrack,
  getCountCarOnPage,
  findCarAfterDelete,
  renderCarItem,
  changeVisibleButtonPagination,
  checkVisibleButtonPagination,
} from "../componets/garage";
import { sections } from "../router";
import { createCar, getAllCars, type Car } from "./api";

const CARS_PER_PAGE = 7;

const carBrand = [
  "BMW",
  "Toyota",
  "Volvo",
  "Volkswagen",
  "Renault",
  "Nissan",
  "Hyundai",
  "Tesla",
  "Audi",
  "Chevrolet",
  "Skoda",
  "Lada",
  "Ford",
];

const carModel = [
  "Espace",
  "Access",
  "Caravelle",
  "Genesis Coupe",
  "Global 900",
  "Santa Cruz",
  "Super Truck",
  "Rapid",
  "R10 TDI",
  "Q5 8R",
  "Model S",
  "Cybertruck",
];

function getRandomCarNames(
  carBrand: string[],
  carModel: string[],
  count: number,
): string[] {
  const carNames: string[] = [];

  for (let i = 0; i < count; i++) {
    const randomBrandIndex = Math.floor(Math.random() * carBrand.length);
    const randomModelIndex = Math.floor(Math.random() * carModel.length);

    const carName = `${carBrand[randomBrandIndex]} ${carModel[randomModelIndex]}`;
    carNames.push(carName);
  }

  return carNames;
}

function getRandomHexColor(): string {
  const randomColor = Math.floor(Math.random() * 16777215);

  return `#${randomColor.toString(16).padStart(6, "0")}`;
}

function generateRandomColors(count: number): string[] {
  const colors: string[] = [];

  for (let i = 0; i < count; i++) {
    colors.push(getRandomHexColor());
  }

  return colors;
}

export function generateRandomListCars(): Car[] {
  // Генерируем 100 случайных цветов
  const randomColors = generateRandomColors(100);
  // Генерируем случайные имена автомобилей
  const randomCarNames = getRandomCarNames(carBrand, carModel, 100);

  const cars = randomCarNames.map((name, index) => ({
    name: name,
    color: randomColors[index],
  }));

  return cars;
}

export async function randomCars(): Promise<void> {
  const newCars: Car[] = generateRandomListCars();
  // Создали 100 авто в БД
  newCars.forEach((car) => createCar(car));

  const cars: Car[] = await getAllCars();

  //Рендер авто, если на странице их меньше 7
  const visibleCarCount: number = getCountCarOnPage();
  const countAddCars = CARS_PER_PAGE - visibleCarCount;
  for (let i = 0; i < countAddCars; i++) {
    const nextCar: Car | null = await findCarAfterDelete();
    if (nextCar) {
      const viewCar: HTMLElement = renderCarItem(
        nextCar.id,
        nextCar.name,
        nextCar.color,
      );
      sections.track.append(viewCar);
    }
  }
  if (cars.length > CARS_PER_PAGE) {
    if (checkVisibleButtonPagination("cars", ".btn_next")) {
      changeVisibleButtonPagination("cars", ".btn_next");
    }
  }

  updateCountTrack();
}
