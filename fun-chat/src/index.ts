import { renderChat } from "./componets/chat";
import { renderFooter } from "./componets/footer";
import { renderHeader } from "./componets/header";
import { renderAbout } from "./componets/info";
import { renderLogin } from "./componets/login";
import "./styles/css/main.css";
import createHtmlElement from "./utils/baseHtmlElement";

// Инициализация приложения
// renderStartPage();

const wrapper: HTMLElement = createHtmlElement("div", ["wrapper"]);
wrapper.append(renderHeader());

const main: HTMLElement = createHtmlElement("main", ["main"]);
// main.append(renderLogin());
main.append(renderChat());
// main.append(renderAbout());
wrapper.append(main);

wrapper.append(renderFooter());

document.body.append(wrapper);
