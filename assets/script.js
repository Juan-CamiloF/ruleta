//Arreglo de elementos globales
let elementos = [];

//Evento de tecla Enter

const input = document.getElementById("elemento");

input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    agregarElemento();
  }
});

// Función para agregar input a lista
function agregarElemento() {
  const elemento = document.getElementById("elemento");
  if (elemento.value !== "") {
    elementos.push(elemento.value);
    mostrarElementos();
    elemento.value = "";
  }
}

//Función para mostrar los elementos de la lista
function mostrarElementos() {
  let lista = document.getElementById("lista");
  lista.innerHTML = "";

  let tamanio = 0;

  // Obtener elemento con tamaño más grande
  for (let index = 0; index < elementos.length; index++) {
    if (elementos[index].length > tamanio) {
      tamanio = elementos[index].length;
    }
  }

  for (let index = 0; index < elementos.length; index++) {
    const li = document.createElement("div");
    li.id = index;
    li.style.width = 12 * tamanio + "px";
    li.textContent = elementos[index];
    li.className = "item";

    lista = document.getElementById("lista");
    lista.appendChild(li);
  }

  const items = document.querySelectorAll(".item");
  const radio = 130; // Radio del círculo
  const centroX = 150; // Centro en X
  const centroY = 150; // Centro en Y

  items.forEach((item, index) => {
    const angulo = (index / items.length) * (2 * Math.PI); // Ángulo en radianes
    const x = centroX + radio * Math.cos(angulo) - item.offsetWidth / 2;
    const y = centroY + radio * Math.sin(angulo) - item.offsetHeight / 2;
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
  });
}

function borrarElementos() {
  let lista = document.getElementById("lista");
  lista.innerHTML = "";
  elementos = [];
}

function borrarElemento() {
  document.getElementById("elemento").value = "";
}

async function iniciar() {
  const cantidadVueltas = Math.floor(Math.random() * (6 - 2) + 2);
  const empezar = document.getElementById(0);
  empezar.style.backgroundColor = "red";
  for (let i = 0; i <= cantidadVueltas; i++) {
    if (i == cantidadVueltas) {
      const random = Math.floor(Math.random() * elementos.length + 1);
      const ultimoElemento = document.getElementById(elementos.length - 1);
      ultimoElemento.style.backgroundColor = "white";
      await iterarLista(random);
    } else {
      await iterarLista(elementos.length);
    }
  }
}

function esperar() {
  return new Promise((resolve) => setTimeout(resolve, 100));
}

async function iterarLista(index) {
  console.log("elemento", index);
  for (let j = 0; j < index; j++) {
    const elemento = document.getElementById(j);
    elemento.style.backgroundColor = "rgb(166, 167, 211)";
    elemento.style.border = "3px solid rgb(166, 167, 211)";
    let idElementoAnterior = 0;
    if (j == 0) {
      idElementoAnterior = elementos.length - 1;
    } else if (j > 0) {
      idElementoAnterior = j - 1;
    }

    console.log(j, idElementoAnterior);
    const elementoAnterior = document.getElementById(idElementoAnterior);
    elementoAnterior.style.backgroundColor = "white";
    elementoAnterior.style.border = " 3px solid #ccc";
    await esperar();
  }
}
