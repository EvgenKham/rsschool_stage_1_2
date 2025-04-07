import { getDateForWins } from "../utils/api";
import createHtmlElement from "../utils/baseHtmlElement";
import { createSvgImage } from "../componets/garage";
import type { WinnerTableDate } from "../utils/api";

export default function createWinners(): HTMLElement {
  const section: HTMLElement = createHtmlElement("section", ["winners"]);

  const tableBox: HTMLElement = createHtmlElement("div", ["table__results"]);
  const table: HTMLElement = document.createElement("table");
  const caption: HTMLElement = document.createElement("caption");
  caption.textContent = "Racing winners";
  const tableHead: HTMLElement = document.createElement("thead");
  tableHead.append(createTableHeadRow());
  const tableBody: HTMLElement = document.createElement("tbody");

  //TODO количесво строк с победителями будет зависеть от БД
  getDateForWins().then((tableRows) => {
    tableRows.forEach((item) => {
      const rowOne: HTMLElement = createTableBodyRow(
        item.id,
        item.name,
        item.color,
        item.wins,
        item.time,
      );
      tableBody.append(rowOne);
    });
  });

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

function createTableBodyRow(
  id: number,
  name: string,
  color: string,
  wins: number,
  time: string,
): HTMLElement {
  const row: HTMLElement = document.createElement("tr");

  const numberCell: HTMLElement = createHtmlElement("td", [], String(id));
  const imageCell: HTMLElement = createHtmlElement("td", []);
  const carImage: SVGElement = createSvgImage(color);
  carImage.style.width = "50px";
  imageCell.append(carImage);
  const nameCell: HTMLElement = createHtmlElement("td", [], name);
  const countWinCell: HTMLElement = createHtmlElement("td", [], String(wins));
  const timeCell: HTMLElement = createHtmlElement("td", [], time);

  row.append(numberCell, imageCell, nameCell, countWinCell, timeCell);

  return row;
}
