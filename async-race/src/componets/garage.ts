import createHtmlElement from "../utils/baseHtmlElement";
import { paths } from "../utils/svgCarPaths";
import type { Paths } from "../utils/svgCarPaths";

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
  );

  const updateBox: HTMLElement = createInputField(
    "update-field",
    "Update car",
    {
      name: "updateNameId",
      color: "updateColorId",
    },
    "update",
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

  const labeColor: HTMLElement = createHtmlElement(
    "label",
    ["input-text"],
    "Color",
  );
  labelName.setAttribute("for", inputId.color);

  const inputColor: HTMLElement = createHtmlElement("input", []);
  inputColor.setAttribute("type", "color");
  inputColor.setAttribute("id", inputId.color);
  inputColor.setAttribute("value", "#58F8F3");

  const button: HTMLElement = createHtmlElement(
    "button",
    ["btn", "btn_create"],
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
  const totalInfo: HTMLElement = createHtmlElement(
    "h3",
    ["all-cars"],
    "Total number of cars: 4",
  );
  infoBox.append(caption, totalInfo);
  section.append(infoBox);

  //TODO Будет получать с сервера через API количество всех машин(имена и цвет)
  //TODO Создание всех машин через цикл
  for (let i = 0; i < 3; i++) {
    const carBox: HTMLElement = createCarItem("Tesla", "#FF338F");
    section.append(carBox);
  }

  return section;
}

//Создание одной машинки с блоками кнопок Select&Remove и Start&Stop
function createCarItem(name: string, color: string): HTMLElement {
  const box: HTMLElement = createHtmlElement("div", ["car"]);

  const blockControl: HTMLElement = buildCarUpdate(name);

  const trackBlock: HTMLElement = createHtmlElement("div", [
    "car__track-block",
  ]);

  trackBlock.append(buildRunControl(), buildCarView(color));

  const road: HTMLElement = createHtmlElement("div", ["road__line"]);

  box.append(blockControl, trackBlock, road);

  return box;
}

//Блок с кнопками Select & Remove
function buildCarUpdate(name: string): HTMLElement {
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
function createSvgImage(color: string): SVGElement {
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
function combinePaths(paths: Paths): string[] {
  return [
    paths.path1.join(""),
    paths.path2.join(""),
    paths.path3.join(""),
    paths.path4.join(""),
  ];
}

//Создаем блок пагинации
function craetePagination(): HTMLElement {
  const section: HTMLElement = createHtmlElement("section", ["pagination"]);
  const buttonPrevious: HTMLElement = createHtmlElement(
    "button",
    ["btn_prev", "btn", "btn__disable"],
    "prev",
  );
  const currentPage: HTMLElement = createHtmlElement(
    "div",
    ["current-page"],
    "1",
  );
  const buttonNext: HTMLElement = createHtmlElement(
    "button",
    ["btn_prev", "btn", "btn__disable"],
    "next",
  );
  section.append(buttonPrevious, currentPage, buttonNext);

  return section;
}

export { createSettingSection, createGarageSection, craetePagination };
