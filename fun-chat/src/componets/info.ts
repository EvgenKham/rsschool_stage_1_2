import createHtmlElement from "../utils/baseHtmlElement";

export function renderAbout(): HTMLElement {
  const aboutSection: HTMLElement = createHtmlElement("section", ["about"]);
  const title: HTMLElement = createHtmlElement(
    "h2",
    ["about__title"],
    "Welcome to Fun Chat",
  );

  const firstParagraph: HTMLElement = createHtmlElement(
    "p",
    ["about__text"],
    "It's my web application that lets improve my programming skills" +
      " with TypeScript, SPA, asynchronous code and WebSockets.",
  );

  const secondParagraph: HTMLElement = createHtmlElement(
    "p",
    ["about__text"],
    "This App was created as part as educational course for the Rolling Scope School.",
  );

  aboutSection.append(title, firstParagraph, secondParagraph);

  return aboutSection;
}
