import Swiper, { Pagination } from 'swiper';
Swiper.use([Pagination]);

const mobileWidthQuery = window.matchMedia('(max-width: 767px)');

function createRoomsSlider(isMobile, sectionRooms) {
    // Выходим из функции если слайдер уже создан ИЛИ если это не мобильный.
    if (!isMobile || sectionRooms.querySelector('.rooms-slider')) return;

    const parentBlock = sectionRooms.querySelector('.container');
    // Создание слайдера
    const slider = document.createElement('div');
    const sliderWrapper = document.createElement('div');
    slider.classList.add('swiper', 'rooms-slider');
    sliderWrapper.classList.add('swiper-wrapper');

    // Создание слайдов
    let slides = [];
    const rooms = sectionRooms.querySelectorAll('.rooms__el');
    rooms.forEach((item) => {
        const slide = document.createElement('a');
        const slideImage = item.querySelector('img').getAttribute('src');
        const slideInfo = item.querySelector('.room-card__info').cloneNode(true);
        const slideHref = item.getAttribute('href');
        slide.classList.add('swiper-slide', 'rooms-slider__slide');
        slide.style.backgroundImage = `url(${slideImage})`;
        slide.setAttribute('href', `${slideHref}`);
        slide.append(slideInfo);
        slides.push(slide);
    });

    // Создание пагинации
    const pagination = document.createElement('div');
    pagination.classList.add('rooms-pagination', 'slider-pagination');

    // Добавление слайдера в документ.
    slides.forEach((slide) => sliderWrapper.append(slide));
    slider.append(sliderWrapper);
    parentBlock.append(slider);
    parentBlock.append(pagination);

    const roomsSlider = new Swiper(slider, {
        direction: 'horizontal',
        spaceBetween: 16,
        pagination: {
            el: pagination,
            bulletActiveClass: 'active',
            bulletClass: 'slider-pagination__bullet',
        },
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const sectionRooms = document.querySelector('.rooms');
    if (sectionRooms) {
        createRoomsSlider(mobileWidthQuery.matches, sectionRooms);
        mobileWidthQuery.addEventListener('change', (event) => createRoomsSlider(event.matches, sectionRooms));
    }
});
