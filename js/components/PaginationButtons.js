const paginationButtons = (page, totalPages, emptyResults) => {

    const next = page + 1;
    const prev = page - 1;
    
    const h2 = document.createElement('h2');
    const nextButton = document.querySelector('#next');
    const prevButton = document.querySelector('#prev');
    const buttonContainer = document.querySelector('.pagination');

    const disableNextButton = () => {
        nextButton.disabled = true;
        nextButton.style.border = '2px solid grey';
        nextButton.style.color = 'grey';
    }

    const disablePrevButton = () => {
        prevButton.disabled = true;
        prevButton.style.border = '2px solid grey';
        prevButton.style.color = 'grey';
    }

    const disableAllButtons = () => { 
        disableNextButton();
        disablePrevButton();
    }  

    emptyResults ? disableAllButtons() : null;
    page === totalPages ? disableNextButton() : nextButton.disabled = false;
    page === 1 ? disablePrevButton() : prevButton.disabled = false;

    const seeNextPage = (e) => {
        let url = new URL(window.location.href);
        let params = url.searchParams;
        params.set('page', next);
        url.search = params.toString();
        window.location.href = url.toString();
    }

    const seePrevPage = (e) => {
        let url = new URL(window.location.href);
        let params = url.searchParams;
        params.set('page', prev);
        url.search = params.toString(); 
        window.location.href = url.toString();
    }
    
    h2.innerHTML = `Page ${page} of ${totalPages}`;

    nextButton.addEventListener('click', seeNextPage);
    prevButton.addEventListener('click', seePrevPage);

    buttonContainer.appendChild(h2);


}

export default paginationButtons;