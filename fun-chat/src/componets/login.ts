import createHtmlElement from "../utils/baseHtmlElement";
import { sendLoginData } from "../utils/api";

let form: HTMLFormElement;
let inputName: HTMLInputElement;
let inputPassword: HTMLInputElement;
let errorName: HTMLElement;
let errorPassword: HTMLElement;
let button: HTMLButtonElement;

export function renderLogin(): HTMLElement {
  const loginSection: HTMLElement = createHtmlElement("section", ["login"]);
  form = document.createElement("form");
  form.classList.add("login-form");
  const title: HTMLElement = createHtmlElement(
    "h2",
    ["login-form__title"],
    "Authorization",
  );
  form.append(title);

  const labelName: HTMLElement = renderLabel("loginName", "Name");
  inputName = renderInput("loginName", "text");
  inputName.addEventListener("input", () => {
    validateName();
    checkButtonState();
  });
  errorName = renderError("loginError");
  form.append(labelName, inputName, errorName);

  const labelPassword: HTMLElement = renderLabel("loginPassword", "Password");
  inputPassword = renderInput("loginPassword", "password");
  inputPassword.addEventListener("input", () => {
    validatePassword();
    checkButtonState();
  });
  errorPassword = renderError("passwordError");
  form.append(labelPassword, inputPassword, errorPassword);

  button = document.createElement("button");
  button.classList.add("btn", "btn_login", "btn_disable");
  button.textContent = "Login";
  form.append(button);
  form.addEventListener("submit", submitFormData);
  form.addEventListener("keydown", keydownFormData);

  loginSection.append(form);

  return loginSection;
}

function renderLabel(id: string, text: string): HTMLElement {
  const label: HTMLElement = createHtmlElement(
    "label",
    ["login-form__label"],
    text,
  );
  label.setAttribute("for", id);
  return label;
}

function renderInput(id: string, type: string): HTMLInputElement {
  const input: HTMLInputElement = document.createElement("input");
  input.classList.add("login-form__input");
  input.setAttribute("id", id);
  input.setAttribute("type", type);
  input.setAttribute("required", "true");
  return input;
}

function renderError(id: string): HTMLElement {
  const error: HTMLElement = createHtmlElement("pre", ["login-form__error"]);
  error.setAttribute("id", id);
  return error;
}

function submitFormData(event: Event): void {
  event.preventDefault();

  if (validateForm()) {
    // Здесь вы можете отправить данные на сервер
    const login = inputName.value;
    const password = inputPassword.value;

    console.log(login, password);
    sendLoginData(login, password);
  }
}

// Обработка нажатия клавиши Enter
function keydownFormData(event: KeyboardEvent): void {
  if (event.key === "Enter") {
    event.preventDefault();
    form.dispatchEvent(new Event("submit"));
  }
}

function validateName(): void {
  errorName.textContent = "";
  let errorMassage = "";

  if (!inputName.value) {
    errorMassage += "* Name cannot be empty.\n";
  }
  if (inputName.value.length < 3 || inputName.value.length > 10) {
    errorMassage += "* Name must be 3-10 letters.";
  }
  errorName.textContent = errorMassage;
}

function validatePassword(): void {
  errorPassword.textContent = "";
  let errorMassage = "";

  if (!inputPassword.value) {
    errorMassage += "* Password cannot be empty.\n";
  }
  if (inputPassword.value.length < 7) {
    errorMassage += "* Password must be at least 7 symbols\n";
  }
  if (!/[A-Z]/.test(inputPassword.value)) {
    errorMassage += "* With at least one uppercase letter\n";
  }
  if (!/[a-z]/.test(inputPassword.value) || !/\d/.test(inputPassword.value)) {
    errorMassage += "* One lowercase letter, and one digit.";
  }
  errorPassword.textContent = errorMassage;
}

// Функция для проверки валидности полей
function validateForm(): boolean {
  let isValid = true;

  if (errorName.textContent || errorPassword.textContent) {
    isValid = false;
  }

  return isValid;
}

function checkButtonState(): void {
  const isNameValid = !errorName.textContent && inputName.value.length > 0;
  const isPasswordValid =
    !errorPassword.textContent && inputPassword.value.length > 0;

  if (isNameValid && isPasswordValid) {
    button.classList.remove("btn_disable");
  }
  if (!(isNameValid && isPasswordValid)) {
    button.classList.add("btn_disable");
  }
}
