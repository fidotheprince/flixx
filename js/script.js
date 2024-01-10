import config from "./config.js";

const global = {
    currentPage : window.location.pathname,
};

//Fetch data from TMBD API
const fetchFromTMBD = async (endpoint) => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${config.ACCESS_TOKEN_AUTH}`,
        }
    }
    const resp = await fetch(`${config.API_URL}${endpoint}/changes?page=1`, options);
    const data = await resp.json();
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
            console.log('Home Page');
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

    //Fetch data from TMBD API
    fetchFromTMBD('movie');
}

//DOM Loaded
document.addEventListener('DOMContentLoaded', init);

 

