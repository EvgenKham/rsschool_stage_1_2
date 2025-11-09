export default function createHtmlElement(
  tag: string,
  classes: string[],
  text?: string,
  alt?: string,
  source?: string,
): HTMLElement {
  const element = document.createElement(tag);
  element.classList.add(...classes);
  if (text) element.textContent = text;
  if (alt) {
    element.setAttribute("alt", alt);
    element.setAttribute("type", "image/png");
  }
  if (source) element.setAttribute("src", source);
  return element;
}
