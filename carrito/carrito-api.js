
$(() => {
	obtenerProductos();
	imprimirCarrito(carrito);
});

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let productos;

function obtenerProductos() {
	// traer JSON con jquery
	$.get("https://fakestoreapi.com/products", (respuesta, estado) => {
		console.log(respuesta);
		productos = respuesta;
		imprimirProductos(productos, true);
	});
}

function imprimirProductos(array, animacion) {
	let fadeTime = animacion ? 800 : 0;
	let delayTime = 50;

	$("#container").empty();
	array.forEach((prod) => {
		delayTime = animacion ? delayTime + 200 : 0;

		let enCarrito = carrito.some(
			(prodEnCarrito) => prodEnCarrito.id === prod.id
		);

		$("#container").append(
			$(`
            <div class="producto">
                <div class="info">
                    <img src="${prod.image}" alt="${prod.title}">
                    <div>
                        <h2>${prod.title}</h2>
                        <h3>$${prod.price}</h3>
						<p>${prod.description}</p>
                    </div>
                </div>
                <button id="${prod.id}" ${
				enCarrito ? "disabled" : null
			} onclick="agregarAlCarrito(event)">${
				enCarrito ? "En carrito" : "Añadir al carrito"
			}</button>
            </div>
            `)
				.hide()
				.delay(delayTime)
				.fadeIn(fadeTime)
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
		total = total + prod.price;
		$("#carrito").append(`
        <tr>
            <td>${prod.title}</td>
            <td>$${prod.price}</td>
            <td><button id="${prod.id}" class="eliminar" onclick="eliminarProducto(event)">Eliminar</button></td>
        </tr>
        `);
	});

	$("#carrito").append(`
<span class="total">Total $${total.toFixed(2)}`);
}
