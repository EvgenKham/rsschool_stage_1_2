export default function createHtmlElement(
  tag: string,
  classes: string[],
  text?: string,
): HTMLElement {
  const element = document.createElement(tag);
  element.classList.add(...classes);
  if (text) element.textContent = text;
  return element;
}
