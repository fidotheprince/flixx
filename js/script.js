import config from "./config.js";
import showCard from "./components/ShowCard.js";
import movieCard from "./components/MovieCard.js";

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
        console.log(details);
        const src = details.poster_path ? `https://image.tmdb.org/t/p/w500${details.poster_path}` : 'images/no-image.jpg';
        const parent = document.querySelector('#movie-details');
        const child = document.createElement('div');
        const ul = document.createElement('ul');
        ul.classList.add('list-group');
        
        details.genres.forEach(genre => {
            const li = document.createElement('li');
            li.innerHTML = genre.name;
            ul.appendChild(li);
        });

        const genres = ul.innerHTML;
        const companies = details.production_companies.map(company => ` ${company.name}`);

        const detailsBody = `
            <div class="details-top">
                <div>
                    <img
                        src=${src}
                        class="card-img-top"
                        alt="Movie Title"
                    />
                </div>
                <div>
                    <h2>${details.original_title}</h2>
                    <p>
                        <i class="fas fa-star text-primary"></i>
                        ${details.vote_average.toFixed(1)} / 10
                    </p>
                    <p class="text-muted">Release Date: ${details.release_date}</p>
                    <p>
                        ${details.overview} / 10
                    </p>
                    <h5>Genres</h5>
                    ${genres}
                    <a href=${details.homepage} target="_blank" class="btn">Visit Movie Homepage</a>
                    </div>
                </div>
            <div class="details-bottom">
                <h2>Movie Info</h2>
                <ul>
                <li><span class="text-secondary">Budget:</span> ${details.budget}</li>
                <li><span class="text-secondary">Revenue:</span> ${details.revenue}</li>
                <li><span class="text-secondary">${details.revenue < details.budget ? 'Loss:' : 'Proft:'}</span> ${details.revenue - details.budget}</li>
                <li><span class="text-secondary">Runtime:</span> ${details.runtime}</li>
                <li><span class="text-secondary">Status:</span> ${details.status}</li>
                </ul>
                <h4>Production Companies</h4>
                <div class="list-group">${companies}</div>
            </div>
        `
        child.innerHTML += detailsBody;
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

 

