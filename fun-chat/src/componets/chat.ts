import createHtmlElement from "../utils/baseHtmlElement";
type message = {
  id: string;
  from: string;
  to: string;
  text: string;
  datetime: string;
  status: {
    isDelivered: boolean;
    isReaded: boolean;
    isEdited: boolean;
  };
};

export type user = {
  login: string;
  isLogined: boolean;
};

export function renderChat(): HTMLElement {
  const chatSection: HTMLElement = createHtmlElement("section", ["chat"]);

  //Create sidebar with search and list of person
  const sidebar: HTMLElement = createHtmlElement("div", ["chat__sidebar"]);
  const search: HTMLElement = createHtmlElement("input", ["chat__search"]);
  search.setAttribute("type", "search");
  search.setAttribute("placeholder", "Search...");
  const personBox: HTMLElement = renderListPerson();
  sidebar.append(search, personBox);

  //Create dialog block
  const dialog: HTMLElement = createHtmlElement("div", ["dialog"]);
  const dialogInfo: HTMLElement = renderPersonInfo("Evgen", "offline");
  const dialogBox: HTMLElement = renderTextingBox();
  const dialogForm: HTMLElement = renderFormText();
  dialog.append(dialogInfo, dialogBox, dialogForm);

  chatSection.append(sidebar, dialog);
  return chatSection;
}

//TODO render real person from server, who was registarted
function renderListPerson(): HTMLElement {
  const listPerson: HTMLElement = createHtmlElement("ul", [
    "chat__list-person",
  ]);

  // const firstPerson: HTMLElement = renderItemPerson("online", "Anna", 3);
  // const seconderson: HTMLElement = renderItemPerson("offline", "Evgen", 0);
  // listPerson.append(firstPerson, seconderson);

  return listPerson;
}

function renderItemPerson(
  status: string,
  name: string,
  unreadedMessages: string,
): HTMLElement {
  const item: HTMLElement = createHtmlElement("li", ["item-person"]);

  const statusItem: HTMLSpanElement = createHtmlElement("span", [
    "item-person__status",
    status,
  ]);
  const nameItem: HTMLSpanElement = createHtmlElement(
    "span",
    ["item-person__name"],
    name,
  );
  const unreadedMessageItem: HTMLSpanElement = createHtmlElement(
    "span",
    ["item-person__unreaded"],
    unreadedMessages,
  );

  item.append(statusItem, nameItem, unreadedMessageItem);

  return item;
}

//TODO change name and status to rael name from server
function renderPersonInfo(name: string, status: string): HTMLElement {
  const infoBox: HTMLElement = createHtmlElement("div", [
    "dialog__info",
    "person",
  ]);
  const personName: HTMLElement = createHtmlElement(
    "div",
    ["person__name"],
    name,
  );
  const classStatus = `person__status_${status}`;
  const personStatus: HTMLElement = createHtmlElement(
    "div",
    [classStatus],
    status,
  );
  infoBox.append(personName, personStatus);

  return infoBox;
}

function renderTextingBox(): HTMLElement {
  const textWrapper: HTMLElement = createHtmlElement("div", [
    "dialog__message-wrapper",
  ]);
  const messagesBox: HTMLElement = createHtmlElement("div", ["message-box"]);
  //TODO Chenge to real message from server
  const firstMessage: message = {
    from: "Ivan",
    datetime: "4:43 PM",
    text: "Hello",
    status: {
      isDelivered: true,
      isEdited: true,
      isReaded: true,
    },
    id: "",
    to: "Evgen",
  };
  const secondMessage: message = {
    from: "Evgen",
    datetime: "4:56 PM",
    text: "Hello?hibin",
    status: {
      isDelivered: true,
      isEdited: true,
      isReaded: true,
    },
    id: "",
    to: "Ivan",
  };
  messagesBox.append(renderMessageItem(false, firstMessage));
  messagesBox.append(renderMessageItem(true, secondMessage));
  textWrapper.append(messagesBox);

  return textWrapper;
}

function renderMessageItem(owner: boolean, data: message): HTMLElement {
  const messageClasses = ["message"];
  if (owner) {
    messageClasses.push("message_private");
  }

  const box: HTMLElement = createHtmlElement("div", messageClasses);

  const header: HTMLElement = createHtmlElement("div", ["message__header"]);
  const author: HTMLElement = document.createElement("span");
  author.classList.add("message__author");
  author.textContent = data.from;
  const time: HTMLElement = document.createElement("div");
  time.classList.add("message__time");
  time.textContent = data.datetime;
  header.append(author, time);

  const text: HTMLElement = document.createElement("pre");
  text.classList.add("message__text");
  text.textContent = data.text;

  const footer: HTMLElement = createHtmlElement("div", ["message__footer"]);
  const edit: HTMLElement = document.createElement("span");
  edit.classList.add("message__state-edited");
  if (data.status.isEdited) {
    edit.textContent = "edited";
  } else {
    edit.textContent = "";
  }
  const read: HTMLElement = document.createElement("span");
  read.classList.add("message__state");
  if (data.status.isReaded) {
    read.textContent = "readed";
  } else {
    read.textContent = "";
  }
  footer.append(edit, read);

  const buttonBox: HTMLElement = createHtmlElement("div", ["message__buttons"]);
  const buttonRemove: HTMLElement = createHtmlElement("button", [
    "message__remove",
  ]);
  const iconRemove: HTMLImageElement = document.createElement("img");
  iconRemove.classList.add("remove-icon", "icon");
  iconRemove.setAttribute("src", "assets/icons/delete-icon.svg");
  buttonRemove.append(iconRemove);
  const buttonEdit: HTMLElement = createHtmlElement("button", [
    "message__edit",
  ]);
  const iconEdit: HTMLImageElement = document.createElement("img");
  iconEdit.classList.add("edit-icon", "icon");
  iconEdit.setAttribute("src", "assets/icons/edit-icon.svg");
  buttonEdit.append(iconEdit);

  buttonBox.append(buttonRemove, buttonEdit);

  box.append(header, text, footer, buttonBox);

  return box;
}

function renderFormText(): HTMLElement {
  const form: HTMLElement = createHtmlElement("form", ["dialog__form", "text"]);
  const textarea: HTMLElement = createHtmlElement("textarea", [
    "text__container",
  ]);
  const button: HTMLElement = document.createElement("button");
  button.classList.add("text__send", "btn_disable");
  button.setAttribute("type", "button");
  button.setAttribute("disabled", "true");
  const image: HTMLElement = document.createElement("img");
  image.classList.add("send-icon", "icon");
  image.setAttribute("src", "assets/icons/send-icon.svg");
  button.append(image);
  form.append(textarea, button);
  return form;
}

export function showActiveUsers(users: user[]): void {
  // console.log(users);
}

export function showInactiveUsers(users: user[]): void {
  // console.log(users);
}

export function showListPersons(users: user[]): void {
  // let count = 0;
  // messages.forEach((message) => {
  //   if (!message.status.isReaded) {
  //     count++;
  //   }
  // });
  const listPerson: HTMLElement | null =
    document.querySelector(".chat__list-person");

  if (listPerson) {
    while (listPerson.firstElementChild) {
      listPerson.firstElementChild.remove();
    }
  }

  users.forEach((user) => {
    let status = user.isLogined ? "online" : "offline";
    const person: HTMLElement = renderItemPerson(status, user.login, "");
    if (listPerson) listPerson.append(person);
    changeActive(user.login, status);
  });
}

export function changeActive(user: string, status: string): void {
  const userElement = document.querySelector(
    `.item-person[data-username="${user}"]`,
  );
  console.log(userElement);

  if (userElement) {
    const statusElement = userElement.querySelector(".item-person__status");

    if (statusElement) {
      statusElement.classList.remove("online", "offline");
      statusElement.classList.add(status);
    }
  }
}
