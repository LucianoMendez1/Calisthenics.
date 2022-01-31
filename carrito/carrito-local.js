$(() => {
	obtenerProductos();
	imprimirCarrito(carrito);
});

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let productos;

function obtenerProductos() {
	$.get("https://apptrazojes2020.000webhostapp.com/presenta/productos.json", (respuesta, estado) => {
		productos = respuesta.productos;
		imprimirProductos(productos);
	});
}

function imprimirProductos(array) {
	$("#container").empty();
	array.forEach((prod) => {

		let enCarrito = carrito.some(
			(prodEnCarrito) => prodEnCarrito.id === prod.id
		);

		$("#container").append(
			$(`
            <div class="producto">
                <div class="info">
                    <img src="${prod.img}" alt="${prod.nombre}">
                    <div>
                        <h2>${prod.nombre}</h2>
                        <h3>$${prod.precio}</h3>
                    </div>
                </div>
                <button id="${prod.id}" ${enCarrito ? "disabled" : null
				} onclick="agregarAlCarrito(event)">${enCarrito ? "En carrito" : "Añadir al carrito"
				}</button>
            </div>
            `)
		);
	});
}

function agregarAlCarrito(e) {
	e.target.textContent = "En Carrito";
	e.target.disabled = true;

	let id = Number(e.target.id);
	let productoElegido = productos.find((p) => p.id === id);

	carrito.push(productoElegido);

	localStorage.setItem("carrito", JSON.stringify(carrito));

	imprimirCarrito(carrito);
}

function eliminarProducto(e) {
	let id = Number(e.target.id);
	let index = carrito.findIndex((p) => p.id === id);

	carrito.splice(index, 1);

	imprimirCarrito(carrito);

	localStorage.setItem("carrito", JSON.stringify(carrito));

	imprimirProductos(productos, false);
}

function imprimirCarrito(array) {
	$("#carrito").empty();
	let total = 0;
	array.forEach((prod) => {
		total = total + prod.precio;
		$("#carrito").append(`
        <tr>
            <td>${prod.nombre}</td>
            <td class="precio-prod">$${prod.precio}</td>
            <td><button id="${prod.id}" class="eliminar" onclick="eliminarProducto(event)">Eliminar</button></td>
        </tr>
        `);
	});

	$("#total").remove();
	$("#table-modal").append(`
				<div id="total">
					<span class="total">Total: $${total.toFixed(2)}</span>
					<button id="comprar" class="comprarLibros">Comprar</button>
				</div>
	`);

	const btnComprar = document.getElementById("comprar");
	const childProd = document.getElementById("carrito").hasChildNodes();

	if (childProd) {
		compraHecha(btnComprar);
	} else {
		carritoVacio(btnComprar);
	}
}
const compraHecha = elemento => {
	elemento.addEventListener("click", () => {
		Swal.fire(comprarProductos);
		$("#carrito").empty();

		let long = carrito.length;
		carrito.splice(0, long);

		imprimirCarrito(carrito);
		localStorage.setItem("carrito", JSON.stringify(carrito));
		imprimirLibros(libros);
	})
}
const carritoVacio = elemento => {
	elemento.addEventListener("click", () => {
		Swal.fire(errorProductos);
	})
}

const comprarProductos = {
	title: "Comprado!",
    text: "Tus compra se ha realizado con exito!",
    icon: "success",
    timer: 4000,
    timerProgressBar: true,
    showConfirmButton: false
}

const errorProductos = {
    title: "No hay productos en el carrito!",
    text: "No podemos acreditar tu compra aún",
    icon: "warning",
    timer: 3500,
    timerProgressBar: true,
    showConfirmButton: false
}
