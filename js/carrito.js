
let carrito =localStorage.getItem("productos-carrito"); 
carrito= JSON.parse(carrito); 

//const carrito = JSON.parse(localStorage.getItem("productos-carrito")); 
const carritoVacio =document.querySelector("#carrito-vacio"); 
const contenedorCarritoProductos=document.querySelector("#contenedor-carrito-productos");
const carritoAcciones=document.querySelector("#carrito-acciones"); 
const carritoComprado=document.querySelector("#carrito-comprado"); 
const botonComprar =document.querySelector("#carrito-acciones-comprar");
const vaciarCarrito= document.querySelector("#carrito-acciones-vaciar"); 
const textoTotal = document.querySelector("#total"); 

let botonesEliminar =document.querySelectorAll(".carrito-producto-eliminar");


//si hay productos no tengo que mostrar el mensaje de carrito vacio
const numProductos = document.querySelector("#cantidad-productos"); 
function actualizarNumProductos(){
    let numProd = carrito.reduce((acumulador, producto)=> acumulador + producto.cantidad, 0); 
    console.log(numProd);
    numProductos.innerText= numProd;
 }
function cargarProductosCarrito(){
    
    if (carrito && carrito.length > 0){

        carritoVacio.classList.add("disabled")
        contenedorCarritoProductos.classList.remove("disabled")
        carritoAcciones.classList.remove("disabled"); 
        carritoComprado.classList.add("disabled"); 
    
        contenedorCarritoProductos.innerHTML=""; 
      
        carrito.forEach(producto => {
            const div =document.createElement("div"); 
            div.classList.add("carrito-producto"); 
    
            div.innerHTML=`
            <img class ="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}" >
            <div class="carrito-producto-titulo">
                <small>Titulo</small>
                <h3>${producto.titulo}</h3>
            </div>
            <div class="carrito-producto-cantidad">
                <small>Cantidad</small>
                <p>${producto.cantidad}</p>
            </div>
            <div class="carrito-producto-precio">
                <small>Precio</small>
                <p>${producto.precio}</p>
            </div>
            <div class="carrito-producto-subtotal">
                <small>Subtotal</small>
                <p>${producto.precio * producto.cantidad}</p>
            </div>
            <button class="carrito-producto-eliminar" id="${producto.id}">
                <i class="bi bi-trash3"></i>
            </button>
            
            `
            contenedorCarritoProductos.append(div); 
        });
    
        
                        
                  
    }
    else{
        carritoVacio.classList.remove("disabled"); 
        contenedorCarritoProductos.classList.add("disabled"); 
        carritoAcciones.classList.add("disabled"); 
        carritoComprado.classList.add("disabled"); 
    }
    
    actulizarBotonesEliminar();
    actualizarTotal(); 
    actualizarNumProductos();
}

cargarProductosCarrito(); 



function actulizarBotonesEliminar(){
    botonesEliminar= document.querySelectorAll(".carrito-producto-eliminar"); 
   // console.log(botonesEliminar); 
    //agrego eventlistener para cada boton eliminar

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarProducto); 
    }); 
}

function eliminarProducto(e) {
    //me uardo el id del producto que quiero eliminar
    let idBoton = e.currentTarget.id; 

    //busco el producto en el array "carrito"

    let index = carrito.findIndex(producto => 
                                 producto.id === idBoton); 
    //elimino del array
    carrito.splice(index, 1); 
    //vuelvo a carar en el carrito los productos actualizados
    cargarProductosCarrito();
    //lo guardo en el local storage 
    localStorage.setItem("productos-carrito", JSON.stringify(carrito)); 
    //console.log(carrito);
}

vaciarCarrito.addEventListener("click", vaciarProductosCarrito); 

function vaciarProductosCarrito(){
   //vaciarCarrito.length=0; 
  
   carrito.length=0;
   

    //guardo el json en localStorage
    localStorage.setItem("productos-carrito", JSON.stringify(carrito)); 

  
    cargarProductosCarrito();
}

function actualizarTotal(){
    const total =carrito.reduce((acumulador, producto) => 
    acumulador +(producto.precio * producto.cantidad), 0);
    textoTotal.innerHTML= ` $${total}`;
}

botonComprar.addEventListener("click", comprar);
function comprar(){

    carrito.length=0; 
    //vacio el carrito y lo guardo en el localStorage
    localStorage.setItem("productos-carrito", JSON.stringify(carrito)); 

    carritoVacio.classList.add("disabled"); 
    contenedorCarritoProductos.classList.add("disabled"); 
    carritoAcciones.classList.add("disabled"); 
    carritoComprado.classList.remove("disabled"); 
    numProductos.innerText="0";
}


