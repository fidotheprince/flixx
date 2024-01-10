const global = {
    currentPage : window.location.pathname,
};

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
}

//DOM Loaded
document.addEventListener('DOMContentLoaded', init);

 

