import createHtmlElement from "../utils/baseHtmlElement";

export function renderFooter(): HTMLElement {
  const footer: HTMLElement = createHtmlElement("footer", ["footer"]);

  const githubLink: HTMLElement = createHtmlElement("a", ["footer__github"]);
  githubLink.setAttribute("href", "https://github.com/EvgenKham");
  const githubIcon: HTMLElement = createHtmlElement("img", [
    "footer__github_icon",
  ]);
  githubIcon.setAttribute("src", "assets/icons/mark-github.png");
  githubIcon.setAttribute("alt", "GitHub icon");
  const githubText: HTMLElement = createHtmlElement(
    "p",
    ["footer__github_text"],
    "GitHub",
  );
  githubLink.append(githubIcon, githubText);

  const year: HTMLElement = createHtmlElement("p", ["footer__year"], "2025");

  const schoolLink: HTMLElement = createHtmlElement("a", ["footer__school"]);
  schoolLink.setAttribute("href", "https://rs.school/courses/javascript");
  const schoolIcon: HTMLElement = createHtmlElement("img", [
    "footer__school_icon",
  ]);
  schoolIcon.setAttribute("src", "assets/icons/logo_rs_text.svg");
  schoolIcon.setAttribute("alt", "RS School");
  schoolLink.append(schoolIcon);

  footer.append(githubLink, year, schoolLink);

  return footer;
}
