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

const renderMovies = async () => {
    const { results } = await fetchFromTMBD('movie/popular');
    const parent = document.querySelector('#popular-movies');

    results.forEach(movie => {
        console.log(movie)
        const parent = document.querySelector('#popular-movies');
        const child = document.createElement('div');
        child.classList.add('card');
        const cardBody = `
            <div class="card">
                <a href="movie-details.html?id=1">
                <img
                    src="images/no-image.jpg"
                    class="card-img-top"
                    alt="Movie Title"
                />
                </a>
                <div class="card-body">
                <h5 class="card-title">${movie.title}</h5>
                <p class="card-text">
                    <small class="text-muted">Release: ${date(movie.release_date)}</small>
                </p>
            </div>
        `;

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
            fetchFromTMBD('movie/popular');
            renderMovies();
            break;
        case '/shows.html':
            console.log('Shows Page');
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

 

