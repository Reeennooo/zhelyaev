import Swiper, { Navigation, Pagination } from 'swiper';
Swiper.use([Navigation]);

document.addEventListener('DOMContentLoaded', () => {
    const recommendationSlider = document.querySelector('.recommendation-slider');
    if (recommendationSlider) {
        const slider = new Swiper(recommendationSlider, {
            direction: 'horizontal',
            speed: 1000,
            navigation: {
                nextEl: '.recommendation-navigation__button-next',
                prevEl: '.recommendation-navigation__button-prev',
                disabledClass: 'disabled',
            },
            spaceBetween: 16,
            slidesPerView: 'auto',
            pagination: {
                el: '.recommendation-pagination',
                bulletClass: 'recommendation-pagination__bullet',
                bulletActiveClass: 'recommendation-pagination__bullet--active',
            },
            breakpoints: {
                991: {
                    spaceBetween: 32,
                    slidesPerView: 'auto',
                },
            },
        });
    }
});
