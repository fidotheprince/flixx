import config from "./config.js";
import render from "./utilities/render.js";
import showCard from "./components/ShowCard.js";
import movieCard from "./components/MovieCard.js";
import swiperSlide from "./components/SwiperSlide.js";
import detailsBodyTV from "./components/DetailsBodyTV.js";
import detailsBodyMovie from "./components/DetailsBodyMovie.js";

const global = {
    currentPage : window.location.pathname,
};

const swiperOptions = {
    slidePerView: 1,
    spaceBetween: 10,
    freeMode: true,
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    breakpoints: {
        500: {
            slidesPerView: 2,
            spaceBetween: 10,
        },
        700: {
            slidesPerView: 3,
            spaceBetween: 10,
        },
        1000: {
            slidesPerView: 4,
            spaceBetween: 10,
        },
    }
};

//Fetch data from TMBD API
const fetchFromTMBD = async (endpoint) => {
    showSpinner(); 
    const resp = await fetch(`${config.API_URL}${endpoint}?api_key=${config.API_KEY}&language=en-US`)
    const data = await resp.json();
    hideSpinner();
    return data;

};

const displaySlider = async () => {
    const { results } = await fetchFromTMBD('movie/now_playing');
    const parent = document.querySelector('.swiper-wrapper');
    let src = undefined;

    results.forEach(movie => {
        src = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'images/no-image.jpg';
        parent.innerHTML += swiperSlide(movie.id, src, movie.original_title, movie.vote_average);
    });

    const initSlider = () => {
        const swiper = new Swiper('.swiper', swiperOptions);
    };
    
    initSlider();

};

const renderMovies = async () => {
    const { results } = await fetchFromTMBD('movie/popular');
    render.movies(results);
};

const renderShows = async () => {
    const { results } = await fetchFromTMBD('tv/popular');
    render.shows(results);
};

const displaySearchResults = async (endpoint) => {
    const params = new URLSearchParams(window.location.search);
    const searchTerm = params.get('search-term');
    const query = `${config.API_URL}search/${endpoint}?query=${searchTerm}&api_key=${config.API_KEY}&language=en-US}`;
    const resp = await fetch(query)
    const data = await resp.json();
    const { results } = data;
    render.search(results, endpoint);
};

const displayBackdrop = async (backdropPath, element) => {
    const imageUrl = `https://image.tmdb.org/t/p/original${backdropPath}`;
    element.style.backgroundImage = `linear-gradient(to right, rgba(0,0,0,0.9), rgba(0,0,0,0.6)), url(${imageUrl})`;
    element.style.backgroundSize = 'cover';
};

const displayDetails = async (endpoint) => {

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
        render.details(details, endpoint, displayBackdrop);

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
            displaySlider();
            break;
        case '/shows.html':
            renderShows();
            break;
        case '/movie-details.html':
            displayDetails('movie');  
            break;
        case '/tv-details.html':
            displayDetails('tv');
            break;
        case '/search.html':
            displaySearchResults('movie');
            break; 
    }

    //HighLight Active Link
    highLightActiveLink();
}

//DOM Loaded
document.addEventListener('DOMContentLoaded', init);

 
