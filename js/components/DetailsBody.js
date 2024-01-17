import readableDate from "../utilities/date.js";
import addCommasToNumber from "../utilities/addCommas.js";

const detailsBody = (
    src,
    title, 
    releaseDate,  
    voteAverage, 
    overview, 
    genres,
    homepage,
    budget,
    revenue, 
    runtime, 
    status,
    companies
) => `
    <div class="details-top">
    <div>
        <img
            src=${src}
            class="card-img-top"
            alt="Movie Title"
        />
    </div>
    <div>
        <h2>${title}</h2>
        <p>
            <i class="fas fa-star text-primary"></i>
            ${voteAverage.toFixed(1)} / 10
        </p>
        <p class="text-muted">Release Date: ${readableDate(releaseDate)}</p>
        <p>
            ${overview} / 10
        </p>
        <h5>Genres</h5>
        ${genres}
        <a href=${homepage} target="_blank" class="btn">Visit Movie Homepage</a>
        </div>
    </div>
    <div class="details-bottom">
    <h2>Movie Info</h2>
    <ul>
    <li><span class="text-secondary">Budget:</span> $ ${addCommasToNumber(budget)}</li>
    <li><span class="text-secondary">Revenue:</span> $ ${addCommasToNumber(revenue)}</li>
    <li><span class="text-secondary">${revenue < budget ? 'Loss:' : 'Proft:'}</span> $ ${addCommasToNumber(revenue - budget)}</li>
    <li><span class="text-secondary">Runtime:</span> ${runtime}</li>
    <li><span class="text-secondary">Status:</span> ${status}</li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group">${companies}</div>
`;
export default detailsBody;
