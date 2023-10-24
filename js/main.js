//array de productos
const productosArray = [
    {id:1, titulo:"pantalon", precio:12000, imagen: "./img/pantalon1.jpg"},
    {id:2, titulo:"remera", precio:6000, imagen: "./img/remera1.jpg"},
    {id:3, titulo:"buzo", precio:15000, imagen: "./img/buzo1.jpg"},
    {id:4, titulo:"zapatillas", precio:20000, imagen: "./img/zapatillas1.jpg"},
];

//aca pongo lo que llamo del dom
const contenedorProductos = document.querySelector("#contenedor-productos");
const botonCategorias = document.querySelectorAll("#boton-categorias");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const contadorCarrito = document.querySelector("#contadorCarrito");

function cargarProductos(productosElegidos){ 
        /* contenedorProductos.innerHTML = "";  */

        //llamo array
        /*-   ERROR   -*/productosElegidos.forEach(producto => {
        const div = document.createElement("div"); //div contenedor de c/producto
        div.classList = "producto"; // pongo class al div
        div.innerHTML= `
        <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
        <div class="producto-detalles">
            <h2 class="producto-titulo">${producto.titulo}</h2>
            <p class="producto-precio">${producto.precio}</p>
            <button class="producto-agregar" id="${producto.id}">.   Agregar   .</button>
        </div>`; //al boton agregar le agrego ID del producto

        contenedorProductos.append(div);
    });
}

cargarProductos(productosArray);

botonesAgregar = document.querySelectorAll(".producto-agregar");

botonesAgregar.forEach(boton =>{
    boton.addEventListener("click", (e) => agregarAlCarrito(e));
});


let productosEnCarrito; 
let productosEnCarritoLS = localStorage.getItem("productos-en-carrito"); //traigo lo que haya en LS
//const productosEnCarritoLS = JSON.parse(localStorage.getItem("productos-en-carrito"));

if (productosEnCarritoLS) {
    //productosEnCarrito = productosEnCarritoLS; //si hay algo en LS , lo traigo
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarContadorCarrito();
} else {
    productosEnCarrito = []; // si no hay nada en el LS , es un array vacio
}


function agregarAlCarrito(e){ //agrego elementos al array de productos en carrito
    const idBoton = e.currentTarget.id;
    const productoAgregado = productosArray.find(producto => producto.id == idBoton); // solo = x2 xq compara valor- si quiero estrictamente igual =x3 cambio el id en el array a un "texto"
    
    if(productosEnCarrito.some(producto => producto.id == idBoton)){
       const index = productosEnCarrito.findIndex(producto => producto.id == idBoton); //busco index del producto
        productosEnCarrito[index].cantidad++; //suma una cantidad cuando se repite producto
    } else{
        productoAgregado.cantidad = 1; //agrego propiedad cantidad a los elementos del array
        productosEnCarrito.push(productoAgregado);
    }

    actualizarContadorCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

    Toastify({
        text: "Producto agregado!",
        duration: 3000,
        //destination: "https://github.com/apvarun/toastify-js",
        //newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
        background: "linear-gradient(to right, rgb(238, 189, 232), #96c93d)",
        },
        onClick: function(){} // Callback after click
    }).showToast();
} 

function actualizarContadorCarrito() {
    let nuevoContadorCarrito = productosEnCarrito.reduce((i, producto) => i + producto.cantidad, 0);
    contadorCarrito.innerText = nuevoContadorCarrito;
    }
