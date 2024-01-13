import readableDate from '../utilities/date.js';

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
            <small class="text-muted">Aired: ${readableDate(timeStamp)}</small>
        </p>
        </div>
    </div>
`

export default showCard;