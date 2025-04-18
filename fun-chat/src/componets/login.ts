import createHtmlElement from "../utils/baseHtmlElement";

const NAME_PATTERN = "^[a-zA-Z\-]{3,10}$";
const PASSWORD_PATTERN = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{7,}$";

export function renderLogin(): HTMLElement {
  const loginSection: HTMLElement = createHtmlElement("section", ["login"]);
  const form: HTMLElement = createHtmlElement("form", ["login-form"]);
  const title: HTMLElement = createHtmlElement(
    "h2",
    ["login-form__title"],
    "Authorization",
  );
  form.append(title);

  const labelName: HTMLElement = renderLabel("loginName", "Name");
  const inputName: HTMLElement = renderInput("loginName", "text", NAME_PATTERN);
  const errorName: HTMLElement = renderError("loginError");
  form.append(labelName, inputName, errorName);

  const labelPassword: HTMLElement = renderLabel("loginPassword", "Password");
  const inputPassword: HTMLElement = renderInput(
    "loginPassword",
    "password",
    PASSWORD_PATTERN,
  );
  const errorPassword: HTMLElement = renderError("passwordError");
  form.append(labelPassword, inputPassword, errorPassword);

  const button: HTMLElement = createHtmlElement(
    "button",
    ["btn", "btn_login", "btn_disable"],
    "Login",
  );
  form.append(button);

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

function renderInput(id: string, type: string, pattern: string): HTMLElement {
  const input: HTMLElement = createHtmlElement("input", ["login-form__input"]);
  input.setAttribute("id", id);
  input.setAttribute("type", type);
  input.setAttribute("required", "true");
  input.setAttribute("pattern", pattern);
  return input;
}

function renderError(id: string): HTMLElement {
  const error: HTMLElement = createHtmlElement("p", ["login-form__error"]);
  error.setAttribute("id", id);
  return error;
}
