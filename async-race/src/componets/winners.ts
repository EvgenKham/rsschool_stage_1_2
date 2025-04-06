import createHtmlElement from "../utils/baseHtmlElement";

export default function createWinners(): HTMLElement {
  const section: HTMLElement = createHtmlElement("div", ["winners"]);

  const tableBox: HTMLElement = createHtmlElement("div", ["table__results"]);
  const table: HTMLElement = document.createElement("table");
  const caption: HTMLElement = document.createElement("caption");
  caption.textContent = "Racing winners";
  const tableHead: HTMLElement = document.createElement("thead");
  tableHead.append(createTableHeadRow());
  const tableBody: HTMLElement = document.createElement("tbody");

  //TODO количесво строк с победителями будет зависеть от БД
  const rowOne: HTMLElement = createTableBodyRow("Tesla", "04:19");
  const rowTwo: HTMLElement = createTableBodyRow("BMW X5", "07:40");

  tableBody.append(rowOne, rowTwo);
  table.append(caption, tableHead, tableBody);
  tableBox.append(table);
  section.append(tableBox);

  return section;
}

function createTableHeadRow(): HTMLElement {
  const headRow: HTMLElement = document.createElement("tr");
  const headNumber: HTMLElement = createHtmlElement("th", [], "Number");
  const headCar: HTMLElement = createHtmlElement("th", [], "Car");
  const headName: HTMLElement = createHtmlElement("th", [], "Name");
  const headWins: HTMLElement = createHtmlElement("th", ["sortable"], "Wins");
  headWins.setAttribute("data-sort", "wins");
  const headBestTime: HTMLElement = createHtmlElement(
    "th",
    ["sortable"],
    "Best Time",
  );
  headBestTime.setAttribute("data-sort", "bestTime");
  headRow.append(headNumber, headCar, headName, headWins, headBestTime);
  return headRow;
}

function createTableBodyRow(name: string, time: string): HTMLElement {
  const row: HTMLElement = document.createElement("tr");

  const numberCell: HTMLElement = createHtmlElement("td", [], "1");
  const imageCell: HTMLElement = createHtmlElement("td", [], "Image");
  const nameCell: HTMLElement = createHtmlElement("td", [], name);
  const countWinCell: HTMLElement = createHtmlElement("td", [], "3");
  const timeCell: HTMLElement = createHtmlElement("td", [], time);

  row.append(numberCell, imageCell, nameCell, countWinCell, timeCell);

  return row;
}
