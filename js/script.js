const global = {
    currentPage : window.location.pathname,
};

//Init App
const init = () => {
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
}

//DOM Loaded
document.addEventListener('DOMContentLoaded', init);
 

