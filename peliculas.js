let movie ="" ;

const moviesList = [];

// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formulario');
    const input = document.getElementById('buscador-pelicula');


    form.addEventListener('submit', (evento) => {
        evento.preventDefault()
        const valorInput = input.value; // Capturamos el valor del input
        console.log("Texto ingresado:", valorInput);
        
        movie = valorInput;
        console.log('Variable con valor capturado:', movie)
    
        getData();
        })
    });


// Agregar una nueva tarjeta al html y mostrar todos los datos de cada pelicula
function showMovies(moviesList){
    const contenedor = document.getElementById('movies-container');

    contenedor.innerHTML = ''; // 🧹 Limpia las tarjetas anteriores

    moviesList.forEach(element => {
        const target = document.createElement('div');

        target.classList.add('target');

        target.innerHTML = `
        <img src="${element.Poster}" alt="${element.Title}">
        <h3>${element.Title}</h3>
        <p>${element.Year}</p>
        <p>${element.Type}</p>
        `;

        contenedor.appendChild(target);

    });
}


// Funcion para conseguir los datos del API
async function getData() {
    try{
        const corsProxy = "https://cors-anywhere.herokuapp.com/";
        let allDataRequest = `${corsProxy}https://www.omdbapi.com/?apikey=a31f5235&s=${movie}`;

        const evaluar = await fetch(allDataRequest);
        const response = await evaluar.json()

        if(response.Response === "False"){
            alert("Lo sentimos, pelicula no encontrada. Intenta de nuevo.");
            return; // Detener la ejecucion
        }

        moviesList.length = 0; // 🧹 Limpia el array antes de agregar nuevos resultados
        
        // Guardar todos los datos en un diccionario y agregarlo a la lista 'moviesList'
        for (let i = 0; i < response.Search.length; i++){

            const obj = {
                Title: response.Search[i].Title,
                Year: response.Search[i].Year,
                Type: response.Search[i].Type,
                Poster: response.Search[i].Poster
            };

            if (response.Search[i].Poster !== "N/A" && response.Search[i].Type !== "game") {
                moviesList.push(obj);
            }

        }

        console.log(moviesList);
        showMovies(moviesList);
        console.log(allDataRequest);

    } catch (error){
        console.error("Se ha presentado un error en la recopilación de datos.", error);
    }
}


