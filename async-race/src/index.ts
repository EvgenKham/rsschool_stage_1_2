import { subtract } from "./app";
import "./styles/css/main.css";

function init(): void {
  const form = document.querySelector("form");
  form?.addEventListener("submit", submitHandler);
}

function submitHandler(event: Event): void {
  event.preventDefault();
  const number1 = document.querySelector(
    "input[name='firstnumber']",
  ) as HTMLInputElement;
  const number2 = document.querySelector(
    "input[name='secondnumber']",
  ) as HTMLInputElement;
  const result = subtract(Number(number1.value), Number(number2.value));
  const resultElement = document.querySelector("p");
  if (resultElement) {
    resultElement.textContent = result.toString();
  }
}

init();
