import config from "./config.js";
import showCard from "./components/ShowCard.js";
import movieCard from "./components/MovieCard.js";

const global = {
    currentPage : window.location.pathname,
};

//Fetch data from TMBD API
const fetchFromTMBD = async (endpoint) => {
    const fetchTypes = {
        popular: fetch(`${config.API_URL}${endpoint}?api_key=${config.API_KEY}&language=en-US`),
    }
    const category = endpoint.split('/')[1];
    showSpinner(); 
    const resp = await fetchTypes[category];
    const data = await resp.json();
    hideSpinner();
    return data;

}

const renderMovies = async () => {
    const { results } = await fetchFromTMBD('movie/popular');

    results.forEach(movie => {
        const src = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'images/no-image.jpg';
        const parent = document.querySelector('#popular-movies');
        const child = document.createElement('div');
        child.classList.add('card');
        const cardBody = movieCard(movie.title, movie.release_date, src, movie.id);
        child.innerHTML += cardBody;
        parent.appendChild(child);

    });
}

const renderShows = async () => {
    const { results } = await fetchFromTMBD('tv/popular');
    
    results.forEach(show => {
        console.log(show)
        const src = show.poster_path ? `https://image.tmdb.org/t/p/w500${show.poster_path}` : 'images/no-image.jpg';
        const parent = document.querySelector('#popular-shows');
        const child = document.createElement('div');
        child.classList.add('card');
        const cardBody = showCard(show.name, show.first_air_date, src, show.id);
        child.innerHTML += cardBody;
        parent.appendChild(child);

    });
}

const displayMovieDetails = async () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    console.log(id)
}
const showSpinner = () => {
    document.querySelector('.spinner').classList.add('show');
}

const hideSpinner = () => {
    document.querySelector('.spinner').classList.remove('show');
}

//Inserts active class corresponding to existing declared css class
const highLightActiveLink = () => {
    let href;

    document.querySelectorAll('.nav-link').forEach(link => {
        href = link.getAttribute('href');
        href === global.currentPage ? link.classList.add('active') : link.classList.remove('active');
  
    })
}

//Init App
const init = () => {
    //Router
    switch (global.currentPage) {
        case '/':
        case '/index.html':
            renderMovies();
            break;
        case '/shows.html':
            renderShows();
            break;
        case '/movie-details.html':
            displayMovieDetails();  
            break;
        case '/tv-details.html':
            console.log('TV Details Page');
            break;
        case '/search.html':
            console.log('Search Page');
            break; 
    }

    //HighLight Active Link
    highLightActiveLink();
}

//DOM Loaded
document.addEventListener('DOMContentLoaded', init);

 

