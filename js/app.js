//variables
const carrito           = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn  = document.querySelector('#vaciar-carrito');
const listaCursos       = document.querySelector('#lista-cursos');
let   articulosCarrito  = [];
let precio = 0;
cargarEventListeners();
function cargarEventListeners(){
    //cuando agregas un curso presionando "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);

    //elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    //vaciar el carrito 
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];
        limpiarHTML();
    });
}

//funciones
function agregarCurso(e){
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        // console.log();
        leerDatosCurso( cursoSeleccionado)
    }
    
}
//Elimina un curso del carrito
function eliminarCurso(e){
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');
        
        //elimina del arreglo articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso=> curso.id !== cursoId);

        carritoHTML();//iteramos sobre el carrito y mostramos el HTML
    }
    
}

//lee el contenido del html al que dimos click y extrae la informacion del curso
function leerDatosCurso(curso){
    // console.log(curso);

    //crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen  : curso.querySelector('img').src,
        titulo  : curso.querySelector('h4').textContent,
        precio  : curso.querySelector('.precio span').textContent,
        precioAcumulado  : curso.querySelector('.precio span').textContent,
        id      : curso.querySelector('a').getAttribute('data-id'),
        cantidad : 1,

    }
    // console.log(infoCurso);
    //revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);

    if (existe) {

        //actualizamos la cantidad
        const cursos = articulosCarrito.map(curso =>{
        
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                
                if (typeof curso.precio === 'string') {
                    curso.precio = curso.precioAcumulado.replace(/\$/g, ''); //elimina el simbolo de dolar 
                    curso.precio = parseInt(curso.precio); // se convierte a entero
                }

                curso.precioAcumulado = `$${curso.precio * curso.cantidad}`;
                
                return curso; //retorna el objeto actualizado 
            }else{
                return curso; //retorna objetos que no son duplicados
            }
        });
        articulosCarrito = [...cursos];
    }else{
        //agrega elementos al arreglo de carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    
    
    // console.log(articulosCarrito);
    carritoHTML();
}

//muestra el carrito de compras en el HTML
function carritoHTML(){
    //limpiar el html
    limpiarHTML();
    //recorre el carrito y genera el HTML 
    articulosCarrito.forEach((curso)=>{
        const {imagen, titulo, cantidad, precioAcumulado, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td> <img src= "${imagen}" width = "100"> </td>
            <td> ${titulo} </td>
            <td> ${precioAcumulado} </td>
            <td> ${cantidad} </td>
            <td>
                <a href ="#" class="borrar-curso" data-id="${id}"> X </a>
            </td>
            
        `;
        //agrega HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    })
}

//elimina los cursos del tbody
function limpiarHTML(){
    //forma lenta
    // contenedorCarrito.innerHTML ='';
    // fin forma lenta

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}


