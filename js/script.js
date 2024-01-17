import config from "./config.js";
import showCard from "./components/ShowCard.js";
import movieCard from "./components/MovieCard.js";
import detailsBody from "./components/DetailsBody.js";

const global = {
    currentPage : window.location.pathname,
};

//Fetch data from TMBD API
const fetchFromTMBD = async (endpoint) => {
    showSpinner(); 
    const resp = await fetch(`${config.API_URL}${endpoint}?api_key=${config.API_KEY}&language=en-US`)
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

const displayBackdrop = async (backdropPath, element) => {
    const imageUrl = `https://image.tmdb.org/t/p/original${backdropPath}`;
    element.style.backgroundImage = `linear-gradient(to right, rgba(0,0,0,0.9), rgba(0,0,0,0.6)), url(${imageUrl})`;
    element.style.backgroundSize = 'cover';
}

const displayMovieDetails = async (endpoint) => {

    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    
    const parameters = {
        id: id, 
        API_KEY: config.API_KEY, 
        API_URL: config.API_URL, 
        endpoint: endpoint
    };

    if (!id || !config.API_KEY || !config.API_URL || !endpoint) {
        console.error({message: 'Missing required parameters', parameters});
        return;
    }

    try {
        const queryString = `${config.API_URL}${endpoint}/${id}?api_key=${config.API_KEY}&language=en-US`
        const resp = await fetch(queryString)
        const details = await resp.json();
        
        const src = details.poster_path ? `https://image.tmdb.org/t/p/w500${details.poster_path}` : 'images/no-image.jpg';
        const parent = document.querySelector('#movie-details');
        const child = document.createElement('div');
        const ul = document.createElement('ul');
        ul.classList.add('list-group');
        
        const genres = details.genres.map(genre => `<li>${genre.name}</li>`).join('');
        const companies = details.production_companies.map(company => ` ${company.name}`);

        child.innerHTML += detailsBody(
            src, 
            details.original_title, 
            details.release_date, 
            details.vote_average, 
            details.overview, 
            genres, 
            details.homepage, 
            details.budget, 
            details.revenue, 
            details.runtime, 
            details.status, 
            companies
        );

        displayBackdrop(details.backdrop_path, document.querySelector('body'));

        parent.appendChild(child);
    } catch (error) {
        console.error(error);
    }


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
            displayMovieDetails('movie');  
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

 

