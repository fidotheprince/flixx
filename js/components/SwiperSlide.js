const swiperSlide = (id, src, title, vote) => `
    <div class="swiper-slide">
        <a href="movie-details.html?id=${id}">
        <img src=${src} alt=${title} />
        </a>
        <h4 class="swiper-rating">
        <i class="fas fa-star text-secondary"></i> ${vote.toFixed(1)} / 10
        </h4>
    </div>
`

export default swiperSlide;