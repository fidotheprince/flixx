import readableDate from "../utilities/date.js";

const detailsBodyTV = () => `
    <div class="details-top">
    <div>
    <img
        src="images/no-image.jpg"
        class="card-img-top"
        alt="Show Name"
    />
    </div>
    <div>
    <h2>Show Name</h2>
    <p>
        <i class="fas fa-star text-primary"></i>
        8 / 10
    </p>
    <p class="text-muted">Release Date: XX/XX/XXXX</p>
    <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo
        aut, illum nesciunt esse cum tempora ipsa animi unde repellendus
        recusandae, quidem libero labore beatae sint nostrum inventore!
        Inventore libero sit exercitationem non magni odio nobis dolorum
        quae, deserunt quo unde labore consequuntur amet voluptatum vitae
        omnis dignissimos error quasi tempora?
    </p>
    <h5>Genres</h5>
    <ul class="list-group">
        <li>Genre 1</li>
        <li>Genre 2</li>
        <li>Genre 3</li>
    </ul>
    <a href="#" target="_blank" class="btn">Visit Show Homepage</a>
    </div>
    </div>
    <div class="details-bottom">
    <h2>Show Info</h2>
    <ul>
    <li><span class="text-secondary">Number Of Episodes:</span> 50</li>
    <li>
        <span class="text-secondary">Last Episode To Air:</span> Last
        Aired Show Episode
    </li>
    <li><span class="text-secondary">Status:</span> Released</li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group">Company 1, Company 2, Company 3</div>
    </div>
`

export default detailsBodyTV;