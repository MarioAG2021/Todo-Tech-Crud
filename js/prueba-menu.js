'use strict'

const grande = document.querySelector('.grande')
const punto = document.querySelectorAll('.punto')

// Cuando hago click en cada punto  sabe la posición de ese punto.
// aplicar un transform translatorX al grnade 
// quitar la clase activo de todos los puntos Añadir la clase activo al punto que hemos hecho click

// RECORRER TODOS LOS PUNTOS
punto.forEach((cadaPunto, i)=>{
    //Asignamos un click a cadaPunto
    punto[i].addEventListener('click',()=>{
        
        // Guardar la posición del punto y calculando el espacio que debo desplazar el grande
        let posicion = i
        let operacion = posicion * -50
        //movemos el grande
        grande.style.transform = `translateX(${ operacion }%)`  
        //recorremos los puntos
        punto.forEach( ( cadaPunto , i ) =>{
            //quitamos la clase ACTIVO a todos los punto
            punto[i].classList.remove('activo')
        })
        //añadir la clase activo en el punto que hemos hecho click
        punto[i].classList.add('activo')
    })
})

//BOTONES DE INICIAR Y REGISTRAR 
function inics() {
    document.getElementById('iniciar-sesion').style.display='block';
    document.getElementById('registrar').style.display='none';
}
function regi() {
    document.getElementById('registrar').style.display='block';
    document.getElementById('iniciar-sesion').style.display='none';
}
//CREAR USUARIO
//variables
const usuario_nuevo = {nombre:"", apellido:"", email:"", password:""};

function validarFormulario() {
    //elementos del formulario
    const nombreInput = document.getElementById('nombre');
    const apellidoInput = document.getElementById('apellido');
    const emailInput = document.getElementById('email');
    const mensajeInput = document.getElementById('mensaje');
    const comentarioEnviado = document.getElementById('comentarioEnviado');

    // Valida que todos los campos estén completos
    if (nombreInput.value.trim() === '' || apellidoInput.value.trim() === '' || emailInput.value.trim() === '' || mensajeInput.value.trim() === '') {
        alert('Por favor, completa todos los campos del formulario.');
        mensajeValidacion.innerText = '';
        return false;
    }
    alert('Comentario enviado, Gracias por su consulta.');
    return true;
}