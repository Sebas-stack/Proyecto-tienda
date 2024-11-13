//variables globales
const d = document;
let btnProducts = d.querySelectorAll(".btn-product");
let contadorCarrito = d.querySelector(".contar-pro")
let listadoCarrito = d.querySelector(".list-cart tbody")
let contador = 0;



// console.log(btnProducts)

//recorrer los productos
btnProducts.forEach((btn,i) => {
    btn.addEventListener("click",()=>{
        // alert("diste click boton"+i)
        contador++; //aumenta variable
        contadorCarrito.textContent = contador;
        // agregarCarrito();
        infoProducto(i);
    });
});

//funcion para agg productos al carro

function agregarCarrito(info) {
    let fila= d.createElement("tr");
    fila.innerHTML = `
        <td> ${contador} </td>
        <td> <img src="${info.imagen}" width="80px"> </td>
        <td> ${info.nombre} </td>
        <td> ${info.precio} </td>
        <td> X </td>
    `;
    listadoCarrito.appendChild(fila);
}

//funcion ´para extraer informacional producto

function infoProducto(posicion) {
    let producto =(btnProducts[posicion].parentElement.parentElement.parentElement);
    let info = {
        nombre: producto.querySelector("h3").textContent,
        precio: producto.querySelector("h5").textContent,
        imagen: producto.querySelector("img").src
    };
    console.log(info)
    agregarCarrito(info);
}