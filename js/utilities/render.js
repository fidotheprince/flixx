import detailsBodyMovie from '../components/DetailsBodyMovie.js';
import detailsBodyTV from '../components/DetailsBodyTV.js';
import movieCard from '../components/MovieCard.js';
import showCard from '../components/ShowCard.js';

const render = {
    movies : (results) => {
        results.forEach(movie => {
            const src = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'images/no-image.jpg';
            const parent = document.querySelector('#popular-movies');
            const child = document.createElement('div');
            child.classList.add('card');
            const cardBody = movieCard(movie.title, movie.release_date, src, movie.id);
            child.innerHTML += cardBody;
            parent.appendChild(child);
    
        });
    },
    shows : (results) => {
        results.forEach(show => {
            const src = show.poster_path ? `https://image.tmdb.org/t/p/w500${show.poster_path}` : 'images/no-image.jpg';
            const parent = document.querySelector('#popular-shows');
            const child = document.createElement('div');
            child.classList.add('card');
            const cardBody = movieCard(show.name, show.first_air_date, src, show.id);
            child.innerHTML += cardBody;
            parent.appendChild(child);
        });
    },
    search : (results, endpoint) => {
        results.forEach(result => {
            const src = result.poster_path ? `https://image.tmdb.org/t/p/w500${result.poster_path}` : 'images/no-image.jpg';
            const parent = document.querySelector('#search-results');
            const child = document.createElement('div');
            child.classList.add('card');
            const cardBody = endpoint === 'movie' ? movieCard(result.title, result.release_date, src, result.id) : showCard(result.name, result.first_air_date, src, result.id);
            child.innerHTML += cardBody;
            parent.appendChild(child);
        });
    },
    details : (details, endpoint, displayBackdrop) => {
        const src = details.poster_path ? `https://image.tmdb.org/t/p/w500${details.poster_path}` : 'images/no-image.jpg';
        const selector = endpoint === 'movie' ? '#movie-details' : '#show-details';
        const parent = document.querySelector(selector);
        const child = document.createElement('div');
        const ul = document.createElement('ul');
        ul.classList.add('list-group');
        
        const genres = details.genres.map(genre => `<li>${genre.name}</li>`).join('');
        const companies = details.production_companies.map(company => ` ${company.name}`);

        let detailBody = undefined;

        if (endpoint === 'movie') {
            detailBody = detailsBodyMovie(
                src, 
                details.title, 
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
        }

        if (endpoint === 'tv') {
            detailBody = detailsBodyTV(
                src, 
                details.name, 
                details.first_air_date, 
                details.vote_average, 
                details.overview, 
                genres, 
                details.homepage, 
                details.number_of_episodes, 
                details.last_episode_to_air.name,
                details.status, 
                companies
            );
        }
    

        child.innerHTML += detailBody;

        displayBackdrop(details.backdrop_path, document.querySelector('body'));

        parent.appendChild(child);
    }
}

export default render;