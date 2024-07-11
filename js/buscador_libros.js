async function fetchBooks(termino, cantidad) {

    const apiUrl = 'https://www.googleapis.com/books/v1/volumes?language=es&q='+termino+'&maxResults='+cantidad;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        displayBooksBuscados(data.items);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayBooksBuscados(booksBuscados) {

    const booksContainerBuscados = document.getElementById('peliculas');
    booksContainerBuscados.innerHTML = '';

    booksBuscados.forEach(bookBuscados => {

        const titulo = bookBuscados.volumeInfo.title;
        const imagen = bookBuscados.volumeInfo.imageLinks ? bookBuscados.volumeInfo.imageLinks.thumbnail : '../assets/sin_imagen.jpg';

        booksContainerBuscados.innerHTML += `
        <a href="detalle.html">
        <div class="pelicula">
        <img class="imgTendencia" src="${imagen}" alt="${titulo}">
        <div class="tituloPelicula">
            <h4>${titulo}</h4>
        </div>    
        </div>  
        </a>      
        `;
    });
    
}

//Llama a la función cuando carga la página 
document.addEventListener("DOMContentLoaded", function () {

    // Event listener para el botón de búsqueda
    document.getElementById('buscarLibros').addEventListener('click', function () {
        const buscar = document.getElementById('queBusco').value.trim();
        if (buscar !== '') {
            fetchBooks(buscar,'30');
        } else {
            alert('Por favor, ingrese una búsqueda');
        }
    });
});