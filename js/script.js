import config from "./config.js";
import render from "./utilities/render.js";
import swiperSlide from "./components/SwiperSlide.js";
import innerResultsHeading from "./components/InnerResultsHeading.js";


const global = {
    currentPage : window.location.pathname,
    search: {
        type: '',
        term: '',
        page: 1, 
        totalPages: 0,
        totalResults: 0
    }
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

//Change to swap between local and remote API
const generateBaseUrl = () => {
    return 'https://flixx-api-4ea54960865d.herokuapp.com/'
}

const fetchFromTMBD = async (endpoint) => {
    showSpinner(); 
    const baseUrl = generateBaseUrl();
    const url = `${baseUrl}resource/${endpoint}`;
    const resp = await fetch(url)
    const data = await resp.json();
    hideSpinner();
    return data;

};

const fetchDetailsFromTMBD = async (endpoint, id) => {
    const baseUrl = generateBaseUrl();
    const url = `${baseUrl}details/${endpoint}/${id}`;
    const resp = await fetch(url)
    const data = await resp.json();

    return data;
}

const searchFromTMBD = async (type, searchTerm, page) => {    
    if (!page) {
        page = 1;
    }

    const baseUrl = generateBaseUrl();
    const url = `${baseUrl}search/${type}?query=${searchTerm}&page=${page}`;
    const resp = await fetch(url)
    const data = await resp.json();

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

const alertRed = (message) => {
    const alert = document.querySelector('#alert');
    alert.style.display = 'block';
    alert.style.backgroundColor = 'red';
    alert.innerHTML = message;
    setTimeout(() => {
        alert.style.display = 'none';
    }, 3000);
}

const alertGreen = (message) => {
    const alert = document.querySelector('#alert');
    alert.style.display = 'block';
    alert.style.backgroundColor = 'green';
    alert.innerHTML = message;
    setTimeout(() => {
        alert.style.display = 'none';
    }, 3000);
}

const displaySearchResults = async () => {
    const params = new URLSearchParams(window.location.search);
    const searchTerm = params.get('search-term');
    const type = params.get('type');
    const p = params.get('page');

    if(Number(p) === 0) {
        window.location.href = `search.html?search-term=${searchTerm}&type=${type}&page=1`;
    }
    
    if(!searchTerm){
        alertRed('No search term provided');
    } else {
        const { results, total_pages, page, total_results } = await searchFromTMBD(type, searchTerm, p);
        const emptyResults = results.length < 1;

        global.search.type = type;
        global.search.term = searchTerm;
        global.search.page = page;
        global.search.totalPages = total_pages;
        global.search.totalResults = total_results;
        emptyResults && alertGreen('No results found');
        render.search(results, type);

        document.querySelector('#search-results-heading').innerHTML = innerResultsHeading(results, total_results);
        
        render.pagination(global.search.page, global.search.totalPages, emptyResults);
    }

};

const displayBackdrop = async (backdropPath, element) => {
    const imageUrl = `https://image.tmdb.org/t/p/original${backdropPath}`;
    element.style.backgroundImage = `linear-gradient(to right, rgba(0,0,0,0.9), rgba(0,0,0,0.6)), url(${imageUrl})`;
    element.style.backgroundSize = 'cover';
};

const displayDetails = async (endpoint) => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    
    try {
        const details = await fetchDetailsFromTMBD(endpoint, id);
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
            displaySearchResults();
            break; 
    }

    //HighLight Active Link
    highLightActiveLink();
}

//DOM Loaded
document.addEventListener('DOMContentLoaded', init);

 
