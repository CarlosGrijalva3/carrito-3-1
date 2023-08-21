const items         = document.getElementById('items') 
const templateCard  = document.getElementById('template-card').content 
const fragmento     =document.createDocumentFragment() 

//----------------------- Creacion del objeto carrito
let carrito = {}
document.addEventListener('DOMContentLoaded', () => { 
    fetchData() 
}) 


//-----------------------evento on click
items.addEventListener('click', e =>{
    addCarrito(e)
})
//---------------------Agregar los datos por medio del comumnento api.json
const fetchData = async () => { 
    try{ 
        const res  = await fetch('api.json') 
        const data = await res.json() 
        console.log(data) 
        mostrarProductos(data) 
    }catch (error) { 
        console.log(error)         
    } 
} 
//---------------------MostrarProductos 

    const mostrarProductos = data => { 
         data.forEach(producto => { 
            templateCard.querySelector('h5').textContent = producto.title  //titulo
            templateCard.querySelector('p').textContent = producto.precio  //precion
            templateCard.querySelector('img').setAttribute("src", producto.thumbnailUrl)  //imagen
            templateCard.querySelector('.btn-dark').dataset.id = producto.id //id}
            const clone = templateCard.cloneNode(true) 
            fragmento.appendChild(clone) 
         });  

         items.appendChild(fragmento) 
    } 

    //-------------------------dar salida al carrito (set,parent-socia)
 const addCarrito = e =>{
    if(e.target.classList.contains('btn-dark')){
        settCarrito(e.target.parentElement)
    }
    e.stopPropagation()

 }




 const settCarrito = objeto => { //quede en cero
    const producto = {
        id: objeto.querySelector('.btn-dark').dataset.id,
        title: objeto.querySelector('h5').textContent,
        precio: objeto.querySelector('p').textContent,
        cantidad: 1
    }
    //si existe el registro con el id 
    if(carrito.hasOwnProperty(producto.id)){
        producto.cantidad = carrito[producto.id].cantidad + 1
    }
    carrito[producto.id] = {...producto} 
    console.log(carrito)

 }