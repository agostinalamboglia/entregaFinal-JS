//traigo info del LS
const productosEnCarrito1 = JSON.parse(localStorage.getItem("productos-en-carrito"));

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");

if (productosEnCarrito1) {
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.remove("disabled");
    contenedorCarritoAcciones.classList.remove("disabled");
    
    contenedorCarritoProductos.innerHTML = ""; 
    
    productosEnCarrito1.forEach(producto => {
        //creo div
        const div = document.createElement("div");
        div.classList = "carrito-producto";
        div.innerHTML = `
        <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
        <div class="carrito-producto-titulo">
            <small>Titulo</small>
            <h- ${producto.imagen}</h3>
        </div>
        <div class="carrito-producto-cantidad">
            <small>${producto.cantidad}</small>
            <p>1</p>
        </div>
        <div class="carrito-producto-precio">
            <small>${producto.precio}</small>
            <p>$15000</p>
        </div>
        <div class="carrito-producto-subtotal">
            <small>Subtotal</small>
            <p>${producto.precio * producto.cantidad}</p>
        </div>
        <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash"></i></button>`;

        contenedorCarritoProductos.append(div);

    })
    
} else{

}