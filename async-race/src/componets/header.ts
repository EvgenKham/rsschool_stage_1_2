import createHtmlElement from "../utils/baseHtmlElement";

export default function createHeader(): HTMLElement {
  const header: HTMLElement = createHtmlElement("header", ["header"]);
  const logo: HTMLElement = createHtmlElement("div", ["logo"]);
  const image: HTMLElement = createHtmlElement(
    "img",
    ["logo__img"],
    "",
    "logo-car",
    "./assets/images/logo.png",
  );

  logo.appendChild(image);

  const navigation: HTMLElement = createHtmlElement("nav", ["navigation"]);
  const buttonGarage: HTMLElement = createHtmlElement(
    "button",
    ["btn_garage", "btn", "btn__disable"],
    "GARAGE",
  );
  const buttonWinners: HTMLElement = createHtmlElement(
    "button",
    ["btn_winners", "btn"],
    "WINNERS",
  );

  navigation.append(buttonGarage, buttonWinners);
  header.append(logo, navigation);

  return header;
}
