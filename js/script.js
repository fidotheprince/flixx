import config from "./config.js";

const global = {
    currentPage : window.location.pathname,
};

//Fetch data from TMBD API
const fetchFromTMBD = async (endpoint) => {

    const fetchTypes = {
        popular: fetch(`${config.API_URL}${endpoint}?api_key=${config.API_KEY}&language=en-US`),
    }
    const category = endpoint.split('/')[1]; 
    const resp = await fetchTypes[category];
    const data = await resp.json();
    return data;

}

const date = timeStamp => new Date(timeStamp).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });

//Movie Card
const movieCard = (title, releaseDate, src, id) =>`
    <div class="card">
        <a href="movie-details.html?id=${id}">
        <img
            src=${src}
            class="card-img-top"
            alt="Movie Title"
        />
        </a>
        <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <p class="card-text">
            <small class="text-muted">Release: ${date(releaseDate)}</small>
        </p>
    </div>
`;

//Show Card
const showCard = (name, timeStamp, src, id) => `
    <div class="card">
        <a href="tv-details.html?id=${id}">
        <img
            src=${src}
            class="card-img-top"
            alt="Show Title"
        />
        </a>
        <div class="card-body">
        <h5 class="card-title">${name}</h5>
        <p class="card-text">
            <small class="text-muted">Aired: ${date(timeStamp)}</small>
        </p>
        </div>
    </div>
`

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
        const src = show.poster_path ? `https://image.tmdb.org/t/p/w500${show.poster_path}` : 'images/no-image.jpg';
        const parent = document.querySelector('#popular-shows');
        const child = document.createElement('div');
        child.classList.add('card');
        const cardBody = showCard(show.name, show.first_air_date, src);
        child.innerHTML += cardBody;
        parent.appendChild(child);

    });
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
            console.log('Movie Details Page');
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

 

