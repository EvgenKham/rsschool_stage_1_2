// Управляет навигацией между разными частями приложения, обеспечивая бесшовный переход между "Garage" и "Winners"
// API: History API

// Функция для загрузки HTML-контента в элемент с id "app"
// async function loadComponent(component: string): Promise<void> {
//   const response = await fetch(`components/${component}.html`);
//   const html = await response.text();
//   document.body.innerHTML = html;
//   setupNavigation(); // Настройка навигации после загрузки нового контента
// }

// Функция для настройки навигации по ссылкам
// function setupNavigation(): void {
//   const garageLink = document.getElementById("link-garage");
//   const winnersLink = document.getElementById("link-winners");

//   if (garageLink) {
//     garageLink.addEventListener("click", (event) => {
//       event.preventDefault();
//       history.pushState({ page: "garage" }, "Гараж", "garage");
//       loadComponent("garage");
//     });
//   }

//   if (winnersLink) {
//     winnersLink.addEventListener("click", (event) => {
//       event.preventDefault();
//       history.pushState({ page: "winners" }, "Победители", "winners");
//       loadComponent("winners");
//     });
//   }
// }

// Обработка события "popstate" для поддержки кнопок "Назад" и "Вперед"
// window.addEventListener("popstate", (event) => {
//   if (event.state) {
//     loadComponent(event.state.page);
//   }
// });

// Загрузка начального компонента при загрузке страницы
// window.onload = (): void => {
//   loadComponent("garage"); // Загружаем компонент Garage по умолчанию
// };
