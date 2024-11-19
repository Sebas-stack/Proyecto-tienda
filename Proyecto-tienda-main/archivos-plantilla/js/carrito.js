
// Variables globales
const d = document;
let btnProducts = d.querySelectorAll(".btn-product");
let contadorCarrito = d.querySelector(".contar-pro");
let listadoCarrito = d.querySelector(".list-cart tbody");

// Lista para almacenar los productos en el carrito
let productosEnCarrito = [];

// Cargar productos desde localStorage al iniciar la página
document.addEventListener("DOMContentLoaded", () => {
    cargarProLocalStorage();  
});

// Recorrer los botones de los productos
btnProducts.forEach((btn, i) => {
    btn.addEventListener("click", () => {
        infoProducto(i);  // Llamamos a la función que maneja la información del producto
    });
});

// Función para agregar un producto al carrito
function agregarCarrito(info) {
    let fila = d.createElement("tr");
    fila.setAttribute("data-id", info.id);  

    fila.innerHTML = `
        <td class="cantidad">${info.indice}</td>  <!-- Muestra el índice en la fila -->
        <td><img src="${info.imagen}" width="80px"></td>
        <td>${info.nombre}</td>
        <td>$${info.precio}</td>
        <td><span onclick="borrarProducto(${info.id})" class="btn btn-danger">x</span></td>
        
    `;
    
    listadoCarrito.appendChild(fila);  // Agregar la fila a la tabla
}

// Función para extraer información de un producto y agregarlo al carrito
function infoProducto(posicion) {
    let producto = btnProducts[posicion].parentElement.parentElement.parentElement;
    let info = {
        id: Date.now(),  // Generamos un ID único para cada producto
        nombre: producto.querySelector("h3").textContent,
        precio: producto.querySelector("h5").textContent.split("$")[1],
        imagen: producto.querySelector("img").src,
        cantidad:1
    };
    agregarCarrito(info)
    // Añadir el producto a la lista 
    productosEnCarrito.push(info);

    // agregamos un índice para el producto, este es el numero que se muestra
    info.indice = productosEnCarrito.length; 

    // Guardamos los productos en el localStorage
    localStorage.setItem("pro-carrito", JSON.stringify(productosEnCarrito));

    cargarProLocalStorage(); 
}

// Función para eliminar un producto del carrito
function borrarProducto(id) {
    productosEnCarrito = productosEnCarrito.filter(producto => producto.id !== id);
    
    
    localStorage.setItem("pro-carrito", JSON.stringify(productosEnCarrito));
    
    cargarProLocalStorage();
}

function cargarProLocalStorage() {
    // Cargar los productos desde el localStorage
    productosEnCarrito = JSON.parse(localStorage.getItem("pro-carrito")) || [];
    
    listadoCarrito.innerHTML = '';  
    
    // Reordenamos productos y actualizamos el índice
    productosEnCarrito.forEach((producto, index) => {
        // Asignamos un índice secuencial para mostrar en la tabla (1, 2, 3, ...)
        producto.indice = index + 1;  // **Esta es la solución del reto**: Asignamos el índice en orden después de cada actualización.
        agregarCarrito(producto);
    });

    
    contadorCarrito.textContent = productosEnCarrito.length;
}

contadorCarrito.parentElement.addEventListener("click",()=>{
    listadoCarrito.parentElement.classList.toggle("ocultar");
})
