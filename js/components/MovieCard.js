import readableDate from '../utilities/date.js';

const movieCard = (title, releaseDate, src, id) =>`
    <div class="card">
        <a href="movie-details.html?id=${id}">
        <img
            src=${src}
            class="card-img-top"
            alt="Movie Title"
        />
        </a>
        <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <p class="card-text">
            <small class="text-muted">Release: ${readableDate(releaseDate)}</small>
        </p>
    </div>
`;

export default movieCard;