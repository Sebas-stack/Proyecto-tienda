// variables globales 
let tablaCarrito = document.querySelector('.cart-table tbody');

// agregar evento al navegador
document.addEventListener("DOMContentLoaded", ()=>{
    cargarProductos();
})


//funcion cargar productos guardados de lsg


function cargarProductos() {
    let productosEnCarrito = JSON.parse(localStorage.getItem("pro-carrito")) || [];

    
    tablaCarrito.innerHTML ="";


    // comprobar si hay prodectos en LS 
    if (productosEnCarrito.length !=0) {
    productosEnCarrito.forEach((info,i) => {
        let fila = document.createElement("tr");
        fila.setAttribute("data-id", info.id);  
    
        fila.innerHTML = `
            <td class="d-flex justify-content-evenly align-items-center">
                <span onclick="borrarProducto(${info.id})" class="btn btn-danger">x</span>
                <img src="${info.imagen}" width="80px">
                ${info.nombre}
                </td>
            <td>
                <span>${info.precio}</span>
            </td>
            <td>
                <div class="quantity quantity-wrap">
                    <div class="decrement" onclick="actualizarCantidad(${i},-1)" > <i class="fa-solid fa-minus"></i></div>
                    <input class="number" type="number" name="quantity" value="${info.contador || 1}" maxlength="2" size="1" readonly>
                    <div class="increment" onclick="actualizarCantidad(${i}1)"> <i class="fa-solid fa-plus"></i></div>
                </div>
            </td>
            <td class="cantidad">${info.indice}</td> 
            <td></td>
        `;
        
        tablaCarrito.appendChild(fila); 
    });
    }else{
        let fila = document.createElement("tr")
        fila.innerHTML = `
            <td colspan="4">
                <p class="text-center fs">No hay productos en el carrito </p>
            </td>
        `;
        tablaCarrito.appendChild(fila)
    }
}


// funcion para actualizar cantidad de producto 

function actualizarCantidad(pos,cambio) {
    let productosEnCarrito = JSON.parse(localStorage.getItem("pro-carrito")) || [];
    
    if (productosEnCarrito[pos]) {
        // actualizar cantidad 
        productosEnCarrito[pos].cantidad=(productosEnCarrito[pos].cantidad || 1) + cambio;

        //Asegurarse de que la cantidad no sea menor a 1
        if (productosEnCarrito[pos].cantidad<1) {
            productosEnCarrito[pos].cantidad =1;
        }
    }
    // actualizar en localStorage 
    localStorage.setItem("pro-carrito",JSON.stringify(productosEnCarrito));
    
    // recargar tabla 
    cargarProductos();
}