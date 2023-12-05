import Swiper, { Navigation } from 'swiper';
Swiper.use([Navigation]);

document.addEventListener('DOMContentLoaded', () => {
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        let slider = new Swiper(heroSlider, {
            direction: 'horizontal',
            speed: 1000,
            navigation: false,
            loop: true,
            pagination: {
                el: '.hero-slider__pagination',
                bulletClass: 'slider-pagination__bullet',
                bulletActiveClass: 'active',
                // clickable: true,
            },
            breakpoints: {
                991: {
                    navigation: {
                        nextEl: '.hero__button-next',
                        prevEl: '.hero__button-prev',
                        disabledClass: 'hero__button-disabled',
                    },
                },
            },
            // parallax: true,
            // effect: 'fade',
            // fadeEffect: {
            //     crossFade: true
            // },
        });
    }
});
