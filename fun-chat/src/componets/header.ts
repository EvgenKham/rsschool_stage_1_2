import { logoutUser } from "../utils/api";
import createHtmlElement from "../utils/baseHtmlElement";

export function renderHeader(): HTMLElement {
  const header: HTMLElement = createHtmlElement("header", ["header"]);
  const logoBox: HTMLElement = createHtmlElement("div", ["header__logo"]);
  const logoTitle: HTMLElement = createHtmlElement(
    "h1",
    ["header__name"],
    "Fun Chat",
  );
  logoBox.append(logoTitle);

  const userName: HTMLElement = createHtmlElement(
    "div",
    ["header__name", "login-name"],
    "",
  );

  const navigation: HTMLElement = createHtmlElement("nav", [
    "header__navigation",
  ]);

  const buttonAbout: HTMLElement = createHtmlElement(
    "button",
    ["btn", "btn_nav", "btn_about"],
    "About",
  );

  const buttonLogout: HTMLElement = createHtmlElement(
    "button",
    ["btn", "btn_nav", "btn_disable", "btn_logout"],
    "Logout",
  );
  buttonLogout.addEventListener("click", logoutUser);

  navigation.append(buttonAbout, buttonLogout);
  header.append(logoBox, userName, navigation);

  return header;
}
