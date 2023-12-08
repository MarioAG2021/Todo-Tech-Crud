//probando productos y carrito
const productos= [
    {id:"auricular-01" ,
    titulo: "auriculares inalambricos",
    imagen: "./products/auriculares/auriculares01.jpg",
    categoria: {
        nombre: "auriculares",
        id: "auriculares"
    },
    precio:25000

    }, 
    {id:"auricular-02" ,
    titulo: "auriculares inalambricos",
    imagen: "./products/auriculares/auriculares02.jpg",
    categoria: {
        nombre: "auriculares",
        id: "auriculares"
    },
    precio:10000

    }, 
    {id:"camara-01" ,
    titulo: "camara fotografica",
    imagen: "./products/camaras/camara01.jpg",
    categoria: {
        nombre: "camaras",
        id: "camaras"
    },
    precio:120000

    }, 
    {id:"celular-01" ,
    titulo: "iphone 11",
    imagen: "./products/celulares/celular01.jpg",
    categoria: {
        nombre: "celulares",
        id: "celulares"
    },
    precio:650000

    }, 
    {id:"celular-02" ,
    titulo: "iphone 11 rosa",
    imagen: "./products/celulares/celular02.jpg",
    categoria: {
        nombre: "celulares",
        id: "celulares"
    },
    precio:650000

    }, 
    {id:"celular-03" ,
    titulo: "iphone 12 pro max",
    imagen: "./products/celulares/celular03.jpg",
    categoria: {
        nombre: "celulares",
        id: "celulares"
    },
    precio:850000

    }, 
    {id:"microfono-01" ,
    titulo: "microfono",
    imagen: "./products/audio/microfono01.jpg",
    categoria: {
        nombre: "audio",
        id: "audio"
    },
    precio:70000

    }, 
    {id:"monitor-01" ,
    titulo: "monitor 24 pulgadas",
    imagen: "./products/monitores/monitor01.jpg",
    categoria: {
        nombre: "monitores",
        id: "monitores"
    },
    precio:700000

    }, 
    {id:"mouse-y-teclado01" ,
    titulo: "combo mouse + teclado",
    imagen: "./products/mouse y teclado/mouse_y_teclado01.jpg",
    categoria: {
        nombre: "mouse_y_teclado",
        id: "mouse-y-teclado"
    },
    precio:100000

    }, 
    {id:"mouse-01" ,
    titulo: "mouse inalambrico",
    imagen: "./products/mouse y teclado/mouse01.jpg",
    categoria: {
        nombre: "mouse_y_teclado",
        id: "mouse-y-teclado"
    },
    precio:50000

    }, 
    {id:"notebook-01" ,
    titulo: "notebook",
    imagen: "./products/notebooks/notebook01.jpg",
    categoria: {
        nombre: "notebooks",
        id: "notebooks"
    },
    precio:870000

    }, 
    {id:"tablet-01" ,
    titulo: "tablet blanca",
    imagen: "./products/tablets/tablet01.jpg",
    categoria: {
        nombre: "tablets",
        id: "tablets"
    },
    precio:750000

    }, 
    {id:"tablet-02" ,
    titulo: "tablet negra",
    imagen: "./products/tablets/tablet02.jpg",
    categoria: {
        nombre: "tablets",
        id: "tablets"
    },
    precio:750000

    }



];

const contenedorProductos =document.querySelector("#contenedor-productos")
const botonesCategorias =document.querySelectorAll(".categoria");
let botonesAgregar =document.querySelectorAll(".producto-agregar");
let carrito; 


let productosCarrito;
const carritoLocalStorage = JSON.parse(localStorage.getItem("productos-carrito")); 
if (carritoLocalStorage){
    carrito= carritoLocalStorage;
    
}
else{
    //si no hay productos en el localStorage entonces creo un array vacio
    carrito=[];
}

//numProductos= numerito que aparece al lado del emoji de carrito
const numProductos = document.querySelector("#cantidad-productos"); 



function cargarProductos(categoriaSeleccionada){
    contenedorProductos.innerHTML="";
    //por cada elemento de productos creo un div con todos sus datos 
    categoriaSeleccionada.forEach(producto => { 
        //creo un contenedor div 
        const div= document.createElement("div");
        div.classList.add("producto"); //le agrego ña clase producto
        div.innerHTML= `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}" >
            <div class="producto-detalles">
                <h3 class ="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">
                    <span>Agregar</span>
                </button>

            </div>
        `;
        contenedorProductos.append(div); 

    })
    actulizarBotones();
   
}

//inicialmente se muestran TODOS los productos
cargarProductos(productos);
actualizarNumProductos();

botonesCategorias.forEach(boton =>{
    //agrego un eventlistener para cada categoria
    boton.addEventListener("click", (e)=>{
        
        //const categoriaActual =productos.find(producto => producto.categoria.id === e.currentTarget.id); 
        //tituloCategoria = categoriaActual.categoria.nombre; 

        const productosAMostrar =productos.filter(producto=> producto.categoria.id === e.currentTarget.id)
        
        cargarProductos(productosAMostrar); 
        
    });

});

function actulizarBotones(){
    botonesAgregar= document.querySelectorAll(".producto-agregar"); 

    //agrego eventlistener para cada boton agregar

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito); 
    }); 
}

function agregarAlCarrito(e){
    const idBoton =e.currentTarget.id; 
    productoSeleccionado =productos.find(producto => producto.id=== idBoton); 

    if(carrito.some(producto => producto.id=== idBoton)){
        //si ya esta ese producto en el carrito solo duplico la cantidad
        
        const index=carrito.findIndex(producto=> producto.id === idBoton);
        carrito[index].cantidad++;


    }else{
        //si no esta en el carrito lo agrefo
        productoSeleccionado.cantidad = 1;
        carrito.push(productoSeleccionado); 
    }
    actualizarNumProductos();

     //guardar el array de carrito en el locaStorage y
    //llevarlo a la pag "carrito"
    localStorage.setItem("productos-carrito", JSON.stringify(carrito)); 
}
 function actualizarNumProductos(){
    let numProd = carrito.reduce((acumulador, producto)=> acumulador + producto.cantidad, 0); 
    
    numProductos.innerText= numProd;
 }



 //guardar el array de carrito en el locaStorage y
 //llevarlo a la pag "carrito"