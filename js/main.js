const CURRENCY = 'GTQ';

const saludoElement = document.getElementById("Saludo");
const rootElement = document.getElementById("Root");
const categoriasElement = document.getElementById("Categorias");
const menuElement = document.getElementById("Menu");
const menuAtrasAction = document.getElementById("MenuAtrasAction");

const categories = [
  {
    id: 1,
    nombre: "Entradas",
    descripcion: "Categoria para las entradas",
    image: "../images/entradas.png"
  },
  {
    id: 2,
    nombre: "Bebidas",
    descripcion: "",
    image: "../images/bebidas.png"
  },
  {
    id: 3,
    nombre: "Platos Fuertes",
    descripcion: "",
    image: "../images/fuerte.png"
  },
  {
    id: 4,
    nombre: "Carnes",
    descripcion: "",
    image: "../images/carnes.png"
  },
  {
    id: 5,
    nombre: "Postres",
    descripcion: "Postres a elegir",
    image: "../images/postres.png"
  },
  {
    id: 6,
    nombre: "Bebidas Alcoholicas",
    descripcion: "Bebidas alcoholicas para consumir por mayores de edad",
    image: "../images/alcoholicas.png"
  }
];

const menus = [
  {
    id: 1,
    nombre: "Carpaccio de Lomito",
    descripcion: `Carpaccio de Lomito acompañado de una porcion de minipanes.

    Disfrutelos acompañado de una bebida y una porcion de papas fritas por solo 8 ${CURRENCY} más.

    Al pedir cerveza debe presentar identificacion`,
    precio: 65.00,
    image: "https://ds1e83w8pn0gs.cloudfront.net/fotosmultisite/1961-1.jpg",
    categoria: {
      id: 1,
      nombre: "Entradas"
    }
  },
  {
    id: 2,
    nombre: "Nachos Con Frijol",
    descripcion: "Deliciosos nachos hechos en casa para un delicioso frijol volteado.",
    precio: 45.99,
    image: "https://assets.unileversolutions.com/recipes-v2/219309.jpg",
    categoria: {
      id: 1,
      nombre: "Entradas"
    }
  },
  {
    id: 3,
    nombre: "Café de Ojos",
    descripcion: "Café de altura con champurradas de la casa.",
    precio: 12.00,
    image: "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg",
    categoria: {
      id: 2,
      nombre: "Bebidas"
    }
  },
  {
    id: 4,
    nombre: "Porcion de Jamones",
    descripcion: `Una porción de jamones con 4 diferentes variedades para degustar acompañadas de un fundido de queso.`,
    precio: 17.99,
    image: "https://images.pexels.com/photos/17205261/pexels-photo-17205261/free-photo-of-plato-almuerzo-mesa-rustico.jpeg?auto=compress&cs=tinysrgb&w=400",
    categoria: {
      id: 1,
      nombre: "Entradas"
    }
  },
  {
    id: 5,
    nombre: "Chorizo para todos",
    descripcion: `Una variedad de chorizos a su disposición para compartir con todos. Puedes acompañarlo con tortillas de harina
    o integrales. Por solo 8 ${CURRENCY} más, puedes agregar una porción de longanizas argentinas que le darán un complemento adicional delicioso.`,
    precio: 28.99,
    image: "https://images.pexels.com/photos/15476366/pexels-photo-15476366/free-photo-of-comida-delicioso-sabroso-salchicha.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    categoria: {
      id: 1,
      nombre: "Entradas"
    }
  }
]

const vanish = elem => elem.classList.add("do-vanish");

function vanishElementAsyncDelay(elem, delay) {
  return new Promise((resolve, reject) => {
    if(!elem) {
      reject(new Error("Can't find element!"));
    }

    setTimeout(() => {
      vanish(elem);
      setTimeout(() => resolve(elem), 1000);
    }, delay);
  });
}

function getCategoryComponent(category) {
  const figElement = document.createElement("figure");
  figElement.setAttribute("id", `Category_${category.id}`);
  figElement.classList.add("Category__GridItem");

  const imageItem = document.createElement("img");
  imageItem.setAttribute("src", category.image);
  imageItem.setAttribute("alt", category.descripcion);

  const figcapElement = document.createElement("figcaption");
  figcapElement.innerText = category.nombre;

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
  imgElement.setAttribute("alt", menu.descripcion);

  figcapElement.innerText = menu.nombre;

  precioElement.classList.add("MenuContent__Precio");
  precioElement.innerText = `${menu.precio} ${CURRENCY}`;

  descripElement.classList.add("MenuContent__Descripcion");
  descripElement.innerText = menu.descripcion ?? '';

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

  counterElement.setAttribute("id", `Counter_${menu.id}_${menu.categoria.id}`);
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
  const selectedMenus = menus.filter(menu => menu.categoria.id === categoryId);
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

saludoElement.classList.add('hidden');
rootElement.classList.remove('hidden');

categories.forEach(category => {
  const categoryElement = getCategoryComponent(category);
  categoriasElement.appendChild(categoryElement);
});

menuAtrasAction.addEventListener('click', backToCategories);
