const CURRENCY = 'GTQ';
const IS_DEVELOPMENT = ['localhost', '127.0.0.1'].includes(window.location.hostname);
const API_URL = IS_DEVELOPMENT ? 'http://localhost:8080' : 'https://delifood-production.up.railway.app';

console.log(`Using API URL: ${API_URL}`);

const saludoElement = document.getElementById("Saludo");
const rootElement = document.getElementById("Root");
const categoriasElement = document.getElementById("Categorias");
const menuElement = document.getElementById("Menu");
const menuAtrasAction = document.getElementById("MenuAtrasAction");

let categories = [];
fetch(`${API_URL}/categories`)
  .then(response => response.json())
  .then(json => {
    const { data } = json;
    categories = data.categories;
    renderCategories(categories);
  });

let products = [];
fetch(`${API_URL}/products`)
  .then(response => response.json())
  .then(json => {
    const { data } = json;
    products = data.products;
  })

const vanish = elem => elem.classList.add("do-vanish");

function renderCategories(categories) {
  categories.forEach(category => {
    const categoryElement = getCategoryComponent(category);
    categoriasElement.appendChild(categoryElement);
  });
}

function getCategoryComponent(category) {
  const figElement = document.createElement("figure");
  figElement.setAttribute("id", `Category_${category.id}`);
  figElement.classList.add("Category__GridItem");

  const imageItem = document.createElement("img");
  imageItem.setAttribute("src", category.image);
  imageItem.setAttribute("alt", category.description);

  const figcapElement = document.createElement("figcaption");
  figcapElement.innerText = category.name;

  figElement.appendChild(imageItem);
  figElement.appendChild(figcapElement);

  figElement.addEventListener("click", () => {
    renderMenuByCategoryId(category.id);
  });

  return figElement;
}

function getMenuComponent(menu) {
  const divElement = document.createElement("div");
  const imgElement = document.createElement("img");
  const figElement = document.createElement("figure");
  const figcapElement = document.createElement("figcaption");
  const precioElement = document.createElement("div");
  const descripElement = document.createElement("div");

  divElement.classList.add("MenuContent__Item");
  divElement.setAttribute("id", `MenuItem_${menu.id}`);

  imgElement.setAttribute("src", menu.image);
  imgElement.setAttribute("alt", menu.description);

  figcapElement.innerText = menu.name;

  precioElement.classList.add("MenuContent__Precio");
  precioElement.innerText = `${menu.price} ${CURRENCY}`;

  descripElement.classList.add("MenuContent__Descripcion");
  descripElement.innerText = menu.description ?? '';

  figElement.appendChild(imgElement);
  figElement.appendChild(figcapElement);

  divElement.appendChild(figElement);
  divElement.appendChild(descripElement);
  divElement.appendChild(precioElement);

  const actionsElement = document.createElement("div");
  const addButton = document.createElement("button");
  const counterElement = document.createElement("div");
  const removeButton = document.createElement("button");
  const clearCounterButton = document.createElement("button");

  actionsElement.classList.add("MenuContent__Actions");

  counterElement.setAttribute("id", `Counter_${menu.id}_${menu.categoryId}`);
  counterElement.innerText = 0;

  addButton.innerHTML = "Agregar";
  addButton.addEventListener("click", () => addCounter(counterElement));

  removeButton.innerText = "Quitar";
  removeButton.addEventListener("click", () => removeCounter(counterElement));

  clearCounterButton.classList.add("ClearCounter");
  clearCounterButton.innerHTML = "Clear &times;";
  clearCounterButton.addEventListener("click", () => clearCounter(counterElement));

  actionsElement.appendChild(removeButton);
  actionsElement.appendChild(counterElement);
  actionsElement.appendChild(addButton);
  actionsElement.appendChild(clearCounterButton);

  divElement.appendChild(actionsElement);

  return divElement;
};

function renderMenuByCategoryId(categoryId) {
  const selectedMenus = products.filter(menu => menu.categoryId === categoryId);
  const menuContainer = menuElement.querySelector('.Menu__Content');

  selectedMenus.forEach(menu => {
    const menuItem = getMenuComponent(menu);
    menuContainer.appendChild(menuItem);
  });

  categoriasElement.classList.add('hidden');
  menuElement.classList.remove("hidden");
}

function backToCategories() {
  categoriasElement.classList.remove("hidden");
  menuElement.classList.add('hidden');
  menuElement.querySelectorAll('.MenuContent__Item').forEach(item => item.remove());
}

function addCounter(counterElement) {
  let count = Number(counterElement.innerText.trimEnd().trimStart());
  count += 1;
  counterElement.innerText = count;
}

function removeCounter(counterElement) {
  let count = Number(counterElement.innerText.trimEnd().trimStart());
  count -= 1;
  counterElement.innerText = count;
}
function clearCounter(counterElement) {
  counterElement.innerText = 0;
}

setTimeout(() => vanish(saludoElement), 3000);
setTimeout(() => rootElement.classList.remove("hidden"), 4000);

menuAtrasAction.addEventListener('click', backToCategories);
