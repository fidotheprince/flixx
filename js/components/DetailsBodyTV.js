import readableDate from "../utilities/date.js";

const detailsBodyTV = (
    src, 
    title,
    releaseDate,
    rating,
    overview,
    genres,
    homepage,
    numberOfEpisodes,
    lastEpisodeToAir,
    status,
    companies
) => `
    <div class="details-top">
    <div>
    <img
        src=${src}
        class="card-img-top"
        alt=${title}
    />
    </div>
    <div>
    <h2>${title}</h2>
    <p>
        <i class="fas fa-star text-primary"></i>
        ${rating.toFixed(1)} / 10
    </p>
    <p class="text-muted">Release Date: ${readableDate(releaseDate)}</p>
    <p>
        ${overview}
    </p>
    <h5>Genres</h5>
    <ul class="list-group">
        ${genres}
    </ul>
    <a href=${homepage} target="_blank" class="btn">Visit Show Homepage</a>
    </div>
    </div>
    <div class="details-bottom">
    <h2>Show Info</h2>
    <ul>
    <li><span class="text-secondary">Number Of Episodes:</span> ${numberOfEpisodes}</li>
    <li>
        <span class="text-secondary">Last Episode To Air:</span> ${lastEpisodeToAir}
    </li>
    <li><span class="text-secondary">Status:</span> ${status}</li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group">${companies}</div>
    </div>
`

export default detailsBodyTV;