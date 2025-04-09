import createHtmlElement from "../utils/baseHtmlElement";
import { paths } from "../utils/svgCarPaths";
import { getAllCars, createCar, deleteCar, updateCar } from "../utils/api";
import { sections } from "../router";
import type { Car } from "../utils/api";
import type { Paths } from "../utils/svgCarPaths";

type id = Promise<number | undefined>;
const CARS_PER_PAGE: number = 7;
let TOTAL_COUNT_CARS: number = 0;

//Создание общей области с 2мя боксами (для новой машинки и обновления выбраной),
//а так же кнопками гонка, сброс и генерации 100 машинок

//TODO разбить на более мелкие функции
function createSettingSection(): HTMLElement {
  const section: HTMLElement = createHtmlElement("section", ["settings"]);

  const newBox: HTMLElement = createInputField(
    "create-field",
    "Create new car",
    {
      name: "newNameId",
      color: "newColorId",
    },
    "create",
    false,
  );

  const updateBox: HTMLElement = createInputField(
    "update-field",
    "Update car",
    {
      name: "updateNameId",
      color: "updateColorId",
    },
    "update",
    true,
  );

  const manageBox: HTMLElement = createHtmlElement("div", ["manage"]);
  const buttonRace: HTMLElement = createHtmlElement(
    "button",
    ["btn", "btn_race"],
    "race",
  );
  const buttonReset: HTMLElement = createHtmlElement(
    "button",
    ["btn", "btn_reset"],
    "reset",
  );
  const buttonGenerate: HTMLElement = createHtmlElement(
    "button",
    ["btn", "btn_generate"],
    "generate cars",
  );

  manageBox.append(buttonRace, buttonReset, buttonGenerate);
  section.append(newBox, updateBox, manageBox);

  return section;
}

//Создание одного блока с полями ввода имени, выбором цвета и кнопкой
//TODO разбить на более мелкие функции
function createInputField(
  name: string,
  title: string,
  inputId: { name: string; color: string },
  buttonText: string,
  disabled: boolean,
): HTMLElement {
  const box: HTMLElement = createHtmlElement("div", [name]);
  const caption: HTMLElement = createHtmlElement("h2", ["title-field"], title);
  const inputBox: HTMLElement = createHtmlElement("div", ["input-box"]);

  const labelName: HTMLElement = createHtmlElement(
    "label",
    ["input-text"],
    "Name",
  );
  labelName.setAttribute("for", inputId.name);

  const inputName: HTMLElement = createHtmlElement("input", []);
  inputName.setAttribute("type", "text");
  inputName.setAttribute("id", inputId.name);
  if (disabled) inputName.setAttribute("disabled", "true");

  const labeColor: HTMLElement = createHtmlElement(
    "label",
    ["input-text"],
    "Color",
  );
  labeColor.setAttribute("for", inputId.color);

  const inputColor: HTMLElement = createHtmlElement("input", []);
  inputColor.setAttribute("type", "color");
  inputColor.setAttribute("id", inputId.color);
  inputColor.setAttribute("value", "#58F8F3");
  if (disabled) inputColor.setAttribute("disabled", "true");

  const classes: string[] = ["btn"];

  if (disabled) {
    classes.push("btn_update");
    classes.push("btn__disable");
  } else {
    classes.push("btn_create");
  }

  const button: HTMLElement = createHtmlElement(
    "button",
    [...classes],
    buttonText,
  );

  inputBox.append(labelName, inputName, labeColor, inputColor, button);
  box.append(caption, inputBox);

  return box;
}

//Создание всех секций с машинками и инфо
function createGarageSection(): HTMLElement {
  const section: HTMLElement = createHtmlElement("section", ["track"]);

  const infoBox: HTMLElement = createHtmlElement("div", ["track__info"]);
  const caption: HTMLElement = createHtmlElement(
    "h2",
    ["title-page"],
    "GARAGE",
  );
  infoBox.append(caption);

  getAllCars()
    //Получаем все авто
    .then((cars) => {
      TOTAL_COUNT_CARS = cars.length;
      const totalInfo: HTMLElement = createHtmlElement(
        "h3",
        ["all-cars"],
        `Total number of cars: #${TOTAL_COUNT_CARS}`,
      );
      infoBox.append(totalInfo);
      // Получаем только 7 авто для дальнейшего рендеринга
      const pageNumber = 1;
      return getCarsForDisplay(cars, pageNumber);
    })
    .then((cars) => {
      cars.forEach((car) => {
        const id: number | undefined = car.id;
        const carBox: HTMLElement = renderCarItem(id, car.name, car.color);
        section.append(carBox);
      });
    });

  section.append(infoBox);
  return section;
}

//Создание одной машинки с блоками кнопок Select&Remove и Start&Stop
function renderCarItem(
  id: number | undefined,
  name: string,
  color: string,
): HTMLElement {
  const box: HTMLElement = createHtmlElement("div", ["car"]);

  //Задаем ID контейнеру (соответсвует ID из БД) для далейшего манипулирования с авто
  box.dataset.carId = id?.toString();

  const blockControl: HTMLElement = buildCarUpdate(id, name);

  const trackBlock: HTMLElement = createHtmlElement("div", [
    "car__track-block",
  ]);

  trackBlock.append(buildRunControl(), buildCarView(color));

  const road: HTMLElement = createHtmlElement("div", ["road__line"]);

  box.append(blockControl, trackBlock, road);

  return box;
}

//Блок с кнопками Select & Remove
function buildCarUpdate(id: number | undefined, name: string): HTMLElement {
  const blockControl: HTMLElement = createHtmlElement("div", [
    "car__control-block",
  ]);
  const buttonSelect: HTMLElement = createHtmlElement(
    "div",
    ["btn", "btn_select"],
    "select",
  );
  const buttonRemove: HTMLElement = createHtmlElement(
    "div",
    ["btn", "btn_remove"],
    "remove",
  );

  // Вешаем обработчик события на кнопку при ее создании
  // Так потом к ним не получить доступ - они формируются динамически,
  // после запроса данных из БД
  buttonSelect.addEventListener("click", selectUpdatingCar);
  buttonRemove.addEventListener("click", deleteCarFromPage);

  const carName: HTMLElement = createHtmlElement("div", ["car__name"], name);
  blockControl.append(buttonSelect, buttonRemove, carName);
  return blockControl;
}

//Блок с кнопками Start & Stop
function buildRunControl(): HTMLElement {
  const runControl: HTMLElement = createHtmlElement("div", ["car__run"]);
  const buttonStart: HTMLElement = createHtmlElement(
    "button",
    ["btn", "btn_start-engine"],
    "START",
  );
  const buttonStop: HTMLElement = createHtmlElement(
    "button",
    ["btn", "btn_stop-engine", "btn__disable"],
    "STOP",
  );
  runControl.append(buttonStart, buttonStop);
  return runControl;
}

//Отрисовка картики с машинкой и флага финиша
function buildCarView(color: string): HTMLElement {
  const carView: HTMLElement = createHtmlElement("div", ["car__view"]);

  const carImageBox: HTMLElement = createHtmlElement("div", ["car__image-box"]);
  const carImage: SVGElement = createSvgImage(color);
  carImageBox.append(carImage);

  const flagBox: HTMLElement = createHtmlElement("div", ["finish__flag"]);
  const flagImage: HTMLElement = createHtmlElement(
    "img",
    ["flag-image"],
    "",
    "flag",
    "assets/images/finish.png",
  );
  flagBox.append(flagImage);
  carView.append(carImageBox, flagBox);

  return carView;
}

//Полное создание SVG картинки
export function createSvgImage(color: string): SVGElement {
  const svgNamespace = "http://www.w3.org/2000/svg";

  const svg = document.createElementNS(svgNamespace, "svg");
  svg.setAttribute("class", "car__image");
  svg.setAttribute("xmlns", svgNamespace);
  svg.setAttribute("width", "100");
  svg.setAttribute("version", "1.0");
  svg.setAttribute("viewBox", "0 0 1280 640");
  svg.setAttribute("fill", color);

  const combineString: string[] = combinePaths(paths);

  combineString.forEach((item) => {
    const path = document.createElementNS(svgNamespace, "path");
    path.setAttribute("d", item);
    svg.appendChild(path);
  });

  return svg;
}

//Склейка всех path для корректной отрисовки SVG картинки
export function combinePaths(paths: Paths): string[] {
  return [
    paths.path1.join(""),
    paths.path2.join(""),
    paths.path3.join(""),
    paths.path4.join(""),
  ];
}

//Создаем блок пагинации (как для гаража, так и для победителей)
function craetePagination(label: string): HTMLElement {
  const section: HTMLElement = createHtmlElement("section", [
    "pagination",
    label,
  ]);
  const buttonPrevious: HTMLElement = createHtmlElement(
    "button",
    ["btn_prev", "btn", "btn__disable"],
    "prev",
  );
  buttonPrevious.addEventListener("click", toPreviousPage);
  const nextPage: HTMLElement = createHtmlElement("div", ["current-page"], "1");
  section.append(buttonPrevious, nextPage);
  // При стартовой загрузке в зависимости от количества авто
  // делает кнопку "Next" доступной или нет
  getAllCars().then((cars) => {
    const classes = ["btn_next", "btn"];
    if (cars.length <= CARS_PER_PAGE && label === "cars") {
      classes.push("btn__disable");
    }
    const buttonNext: HTMLElement = createHtmlElement(
      "button",
      classes,
      "next",
    );
    buttonNext.addEventListener("click", toNextPage);
    section.append(buttonNext);
  });

  return section;
}

//Создание навой машинки для отправки в БД и показа на странице
export async function createNewCar(): Promise<void> {
  const inputName: HTMLInputElement | null =
    document.querySelector("#newNameId");
  const inputColor: HTMLInputElement | null =
    document.querySelector("#newColorId");

  try {
    if (inputName && inputColor) {
      const newCar: Car = {
        name: inputName.value,
        color: inputColor.value,
      };

      if (newCar.name !== "") {
        await createCar(newCar);
        const cars: Car[] = await getAllCars();

        inputName.value = "";
        //Сначала берем ID созданое БД, т.к только БД создает ID
        const newId: id = getIdNewCar(newCar.name, newCar.color);
        //Рендер авто, если на странице их меньше 7
        if (getCountCarOnPage() < CARS_PER_PAGE) {
          const viewCar: HTMLElement = renderCarItem(
            await newId,
            newCar.name,
            newCar.color,
          );
          sections.track.append(viewCar);
        }
        if (cars.length > CARS_PER_PAGE) {
          if (!checkVisibleButtonPagination("cars", ".btn_next")) {
            changeVisibleButtonPagination("cars", ".btn_next");
          }
        }

        //Обновляем число авто в гараже на странице
        await updateCountTrack();
      }
    }
  } catch (error) {
    console.error("Error when created car", error);
  }
}

//Удаление авто по ID из БД и на странице
async function deleteCarFromPage(event: Event): Promise<void> {
  const target = event.currentTarget;

  if (target instanceof HTMLElement) {
    const carBox = target.closest(".car");

    try {
      if (carBox) {
        const carBoxId = carBox.getAttribute("data-car-id");
        // Удаляем со страницы
        carBox.remove();
        // Удаляем из БД
        await deleteCar(Number(carBoxId));
        //Обновляем число авто в гараже на странице
        await updateCountTrack();
        await updateTrack();
        // Скрываем кнопку "Next", если авто мешьше 7
        const cars = await getAllCars();
        if (cars.length <= CARS_PER_PAGE) {
          changeVisibleButtonPagination("cars", ".btn_next");
        }
      }
    } catch (error) {
      console.error("No delete car:", error);
    }
  }
}

//Добавляем имя и цвет в поля Update
async function selectUpdatingCar(event: Event): Promise<void> {
  const target = event.currentTarget;

  if (target instanceof HTMLElement) {
    const carBox = target.closest(".car");

    try {
      if (carBox) {
        // Находим ID авто
        const carBoxId = Number(carBox.getAttribute("data-car-id"));
        // Извлекаем имя авто
        const carNameElement = carBox.querySelector(".car__name");
        const carName = carNameElement?.textContent;
        // Извлекаем цвет авто
        const carImageElement = carBox.querySelector(".car__image");
        const carColor = carImageElement?.getAttribute("fill");
        // Передаем данные в форму обновления
        showSelectedCar(carBoxId, String(carName), String(carColor));
      }
    } catch (error) {
      console.error("No update car:", error);
    }
  }
}

// Обновляем число, которое отображает количество машин в гараже
async function updateCountTrack(): Promise<void> {
  const viewCountCars: HTMLElement | null = document.querySelector(".all-cars");
  const allCars: Car[] = await getAllCars();
  const count: number = allCars.length;

  if (viewCountCars) {
    const nextText = viewCountCars.textContent;
    if (nextText !== null) {
      viewCountCars.textContent = nextText.replace(/#\d+/, `#${count}`);
    } else {
      viewCountCars.textContent = `#${count}`;
    }
  }
}

// Дополняем контейнер с авто до 7 на странице
async function updateTrack(): Promise<void> {
  const car: Car | null = await findCarAfterDelete();
  if (car) {
    const carBox: HTMLElement = renderCarItem(car.id, car.name, car.color);
    sections.track.append(carBox);
  }
}

//Поиск авто, которое дополнит страницу до 7 авто
async function findCarAfterDelete(): Promise<Car | null> {
  const lastCarElement: Element | null = sections.track.lastElementChild;
  let nextCar = null;
  if (lastCarElement) {
    const carId = Number(lastCarElement.getAttribute("data-car-id"));
    const cars: Car[] = await getAllCars();

    if (cars.length > 0) {
      const nextCars = cars.filter(
        (car) => car.id !== undefined && car.id > carId,
      );

      if (nextCars.length > 0) {
        nextCar = nextCars[0];
      }
    }
  }
  return nextCar;
}

// Поиск id нового авто по имени и цвету
async function getIdNewCar(name: string, color: string): id {
  const cars: Car[] = await getAllCars();
  let id = undefined;
  cars.forEach((car) => {
    if (car.color === color && car.name === name) {
      id = car.id;
    }
  });
  return id;
}
// Добавление выбранного авто в форму для обновления
function showSelectedCar(id: number, name: string, color: string): void {
  const inputName: HTMLInputElement | null =
    document.querySelector("#updateNameId");
  const inputColor: HTMLInputElement | null =
    document.querySelector("#updateColorId");
  const buttonUpdate: HTMLElement | null =
    document.querySelector(".btn_update");

  if (inputName && inputColor && buttonUpdate) {
    inputName.removeAttribute("disabled");
    inputColor.removeAttribute("disabled");
    buttonUpdate?.classList.remove("btn__disable");
    inputName.value = name;
    inputColor.value = color;
    //Задаем ID контейнеру (соответсвует ID из БД) для далейшего манипулирования с авто
    buttonUpdate.dataset.boxId = id?.toString();
  }
}
// Обновление авто на странице и БД
export async function updateSelectedCar(): Promise<void> {
  const inputName: HTMLInputElement | null =
    document.querySelector("#updateNameId");
  const inputColor: HTMLInputElement | null =
    document.querySelector("#updateColorId");
  const buttonUpdate: HTMLElement | null =
    document.querySelector(".btn_update");

  try {
    if (inputName && inputColor && buttonUpdate) {
      const newCar: Car = {
        name: inputName.value,
        color: inputColor.value,
        id: Number(buttonUpdate.dataset.boxId),
      };

      updateViewCar(newCar);
      resetUpdateForm();
      updateCar(newCar);
    }
  } catch (error) {
    console.error("Error when created car", error);
  }
}
// Обновление авто на странице
function updateViewCar(car: Car): void {
  const selector: string = `[data-car-id="${car.id}"]`;
  const boxCar: HTMLElement | null = document.querySelector(selector);
  if (boxCar) {
    const image: HTMLElement | null = boxCar.querySelector(".car__image");
    if (image) {
      image.setAttribute("fill", car.color);
    }
    const name: HTMLElement | null = boxCar.querySelector(".car__name");
    if (name) {
      name.textContent = car.name;
    }
  }
}
// Сброс формы обновления и ее блокирование
function resetUpdateForm(): void {
  const inputName: HTMLInputElement | null =
    document.querySelector("#updateNameId");
  const inputColor: HTMLInputElement | null =
    document.querySelector("#updateColorId");
  const buttonUpdate: HTMLElement | null =
    document.querySelector(".btn_update");

  if (inputName && inputColor && buttonUpdate) {
    inputName.setAttribute("disabled", "true");
    inputColor.setAttribute("disabled", "true");
    buttonUpdate?.classList.add("btn__disable");
    inputName.value = "";
    inputColor.value = "#58f8f3";
    delete buttonUpdate.dataset.boxId;
  }
}

export function getCarsForDisplay(cars: Car[], page: number): Car[] {
  const startIndex = (page - 1) * CARS_PER_PAGE;
  const endIndex = startIndex + CARS_PER_PAGE;

  const carsToDisplay = cars.slice(startIndex, endIndex);

  return carsToDisplay;
}

// Делаем кнопку "Next" доступной при стартовой загрузке страницы
// В зависимости от количества авто в БД
export async function visibleButtonNext(): Promise<void> {
  const cars: Car[] = await getAllCars();
  const totalPages = Math.ceil(cars.length / CARS_PER_PAGE);

  if (totalPages > 1) {
    changeVisibleButtonPagination("cars", ".btn_next");
  }
}

// Вычисляем количество существующих авто на странице (чтобы не превышало 7 авто)
function getCountCarOnPage(): number {
  const visibleCars: NodeList = document.querySelectorAll(".car");
  const count: number = visibleCars.length;
  return count;
}

// Изменяем видимость кнопок "Prev" & "Next" ("cars", ".btn_next")
function changeVisibleButtonPagination(
  lable: string,
  buttonClass: string,
): void {
  let pagination: HTMLElement | null = null;

  if (lable === "cars") {
    pagination = document.querySelector(".pagination, .cars");
  }

  if (lable === "wins") {
    pagination = document.querySelector(".pagination, .wins");
  }

  if (pagination) {
    const button: HTMLElement | null = pagination.querySelector(buttonClass);
    if (button) button.classList.toggle("btn__disable");
  }
}

// Проверка доступности кнопок "Prev" & "Next" ("cars", ".btn_next")
function checkVisibleButtonPagination(
  lable: string,
  buttonClass: string,
): boolean {
  let pagination: HTMLElement | null = null;

  if (lable === "cars") {
    pagination = document.querySelector(".pagination, .cars");
  }

  if (lable === "wins") {
    pagination = document.querySelector(".pagination, .wins");
  }
  if (pagination) {
    const button: HTMLElement | null = pagination.querySelector(buttonClass);
    if (button) {
      button.classList.contains("btn__disable");
      return Boolean(button);
    }
  }
  return false;
}

async function toNextPage(): Promise<void> {
  const cars: Car[] = await getAllCars();
  let currentPage: number = 1;
  const totalPages = Math.ceil(cars.length / CARS_PER_PAGE);

  const pagination: HTMLElement | null =
    document.querySelector(".pagination, .cars");
  if (pagination) {
    const pageDiv: HTMLElement | null =
      pagination.querySelector(".current-page");
    if (pageDiv) {
      currentPage = Number(pageDiv.textContent);
      if (totalPages > currentPage) {
        pageDiv.textContent = String(currentPage + 1);
        const nextPage = currentPage + 1;
        const nextCars: Car[] = getCarsForDisplay(cars, nextPage);
        rerenderTrackSection(nextCars);
      }
      //Делаем кнопки недоступными
      if (totalPages === currentPage + 1) {
        changeVisibleButtonPagination("cars", ".btn_next");
      }
      if (currentPage + 1 === 2) {
        changeVisibleButtonPagination("cars", ".btn_prev");
      }
    }
  }
}

function rerenderTrackSection(cars: Car[]): void {
  const track: HTMLElement | null = sections.track;
  // Очищаем содержимое секции с авто
  while (track.firstChild) {
    track.removeChild(track.firstChild);
  }
  // Создаем блок с информацией
  const infoBox: HTMLElement = createHtmlElement("div", ["track__info"]);
  const caption: HTMLElement = createHtmlElement(
    "h2",
    ["title-page"],
    "GARAGE",
  );
  infoBox.append(caption);

  const totalInfo: HTMLElement = createHtmlElement(
    "h3",
    ["all-cars"],
    `Total number of cars: #${TOTAL_COUNT_CARS}`,
  );
  infoBox.append(totalInfo);
  track.append(infoBox);
  // Рендеринг новых авто
  cars.forEach((car) => {
    const id: number | undefined = car.id;
    const carBox: HTMLElement = renderCarItem(id, car.name, car.color);
    track.append(carBox);
  });
}

async function toPreviousPage(): Promise<void> {
  const cars: Car[] = await getAllCars();
  let currentPage: number = 1;
  const totalPages = Math.ceil(cars.length / CARS_PER_PAGE);

  const pagination: HTMLElement | null =
    document.querySelector(".pagination, .cars");
  if (pagination) {
    const pageDiv: HTMLElement | null =
      pagination.querySelector(".current-page");
    if (pageDiv) {
      currentPage = Number(pageDiv.textContent);
      if (currentPage > 1) {
        pageDiv.textContent = String(currentPage - 1);

        const previousPage = currentPage - 1;
        const nextCars: Car[] = getCarsForDisplay(cars, previousPage);
        rerenderTrackSection(nextCars);
      }
      //Делаем кнопки недоступными
      if (currentPage - 1 === 1) {
        changeVisibleButtonPagination("cars", ".btn_prev");
      }
      if (totalPages === currentPage) {
        changeVisibleButtonPagination("cars", ".btn_next");
      }
    }
  }
}

export { createSettingSection, createGarageSection, craetePagination };
