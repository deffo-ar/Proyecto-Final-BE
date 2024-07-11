
async function fetchBooks(tipo, termino, cantidad) {

    const apiUrl = 'https://www.googleapis.com/books/v1/volumes?language=es&q='+termino+'&maxResults='+cantidad;

    try {
        const response = await fetch(apiUrl);
        //console.log('Response status:', response.status);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        if (tipo === 'masleidos') {
            displayBooks(data.items);
        } else if (tipo === "masaclamados") {
            displayBooksAclamados(data.items);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayBooks(books) {

    const booksContainer = document.getElementById('peliculas');
    booksContainer.innerHTML = '';

    books.forEach(book => {
        const titulo = book.volumeInfo.title;
        const imagen = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : './assets/sin_imagen.jpg';
        booksContainer.innerHTML += `
        <a href="./pages/detalle.html">
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

function displayBooksAclamados(booksAclamados) {

    const booksContainer = document.getElementById('aclamadas');
    booksContainer.innerHTML = '';

    booksAclamados.forEach(bookAclamados => {
        const titulo = bookAclamados.volumeInfo.title;
        const imagen = bookAclamados.volumeInfo.imageLinks ? bookAclamados.volumeInfo.imageLinks.thumbnail : './assets/sin_imagen.jpg';
        booksContainer.innerHTML += `
            <div class="peliculaItem">
            <img class="imgAclamada" src="${imagen}" alt="${titulo}"> 
        </div>     
        `;
    });
}

//Llama a la función cuando carga la página 
document.addEventListener("DOMContentLoaded", function () {
    // Busca para Más Leídos
    fetchBooks('masleidos', 'stephen king', '10');
    // Busca para Más Aclamados
    fetchBooks('masaclamados', 'potter', '20');
});