import Swiper, { Pagination } from 'swiper';
import { openModal } from '../../components/modal/modal';
Swiper.use([Pagination]);
import { scrollTo } from '../../js/global-scripts';

document.addEventListener('DOMContentLoaded', () => {
    const productSection = document.querySelector('.product');
    const productGallery = productSection?.querySelector('.product-gallery');

    // Открытие скрытых фотографий
    if (productGallery) {
        const buttonShowPhoto = productGallery.querySelector('.product-gallery__button');
        buttonShowPhoto.addEventListener('click', () => {
            const hiddenPhotos = productGallery.querySelectorAll('.product-gallery__photo--hidden');

            if (buttonShowPhoto.classList.contains('is-active')) {
                hiddenPhotos.forEach((photo) => (photo.style.display = 'block'));
                buttonShowPhoto.querySelector('span').innerText = 'Скрыть фото';
                buttonShowPhoto.classList.remove('is-active');
            } else {
                hiddenPhotos.forEach((photo) => (photo.style.display = 'none'));
                buttonShowPhoto.querySelector('span').innerText = 'Все фото';
                buttonShowPhoto.classList.add('is-active');
            }
        });
    }

    // Адаптация tablet. Создание слайдера.
    const tabletWidthQuery = window.matchMedia('(max-width: 991px)');

    function createGallerySlider(isTablet, gallery) {
        if (!isTablet || gallery.querySelector('.gallery-slider')) return;
        const allPhotos = gallery.querySelectorAll('.product-gallery__photo');

        // Создание слайдера
        const slider = document.createElement('div');
        const sliderWrapper = document.createElement('div');
        slider.classList.add('swiper', 'gallery-slider');
        sliderWrapper.classList.add('swiper-wrapper');

        // Создание слайдов
        let slides = [];
        allPhotos.forEach((photo) => {
            const slide = photo.cloneNode(true);
            slide.removeAttribute('class');
            slide.classList.add('swiper-slide', 'gallery-slider__slide', '.product-gallery__photo');

            slides.push(slide);
        });

        // Создание пагинации
        const pagination = document.createElement('div');
        pagination.classList.add('gallery-slider-pagination');

        // Инициализация слайдера
        slides.forEach((slide) => sliderWrapper.append(slide));
        slider.append(sliderWrapper);
        slider.append(pagination);
        productSection.prepend(slider);

        const gallerySlider = new Swiper(slider, {
            direction: 'horizontal',
            pagination: {
                el: pagination,
                bulletActiveClass: 'active',
                bulletClass: 'gallery-slider__bullet',
            },
        });
    }

    function changeDashboardPosition(isTablet) {
        const productDashboard = document.querySelector('.product__dashboard-wp');
        if (isTablet) {
            productGallery.after(productDashboard);
        } else {
            productSection.querySelector('.product__wrapper').append(productDashboard);
        }
    }

    if (productSection) {
        function fillApplicationModal() {
            // Модальное окно заявки
            const modalApplication = document.querySelector('.modal-application');
            const modalImg = modalApplication.querySelector('.application-info__img');
            const modalProductName = modalApplication.querySelector('.application-info__product-name');
            const modalProductCost = modalApplication.querySelector('.application-info__product-cost span');
            const modalProductId = modalApplication.querySelector('.for-id input');

            const imgSrc = productSection.dataset.img;
            const productName = productSection.querySelector('.product-dashboard__name').innerHTML;
            const productCost = productSection.querySelector('.product-dashboard__cost span').innerHTML;
            const productId = productSection.dataset.id;

            modalImg.setAttribute('src', `${imgSrc}`);
            modalProductName.innerHTML = productName;
            modalProductCost.innerHTML = productCost;
            modalProductId.value = productId;
        }

        // Создание слайдера при адаптации
        createGallerySlider(tabletWidthQuery.matches, productGallery);
        changeDashboardPosition(tabletWidthQuery.matches);
        tabletWidthQuery.addEventListener('change', (event) => {
            // Слайдер
            createGallerySlider(event.matches, productSection);
            // Изменения положения элемента
            changeDashboardPosition(event.matches);
        });

        // Скролл к характеристикам.
        const characteristic = productSection?.querySelector('.product-characteristics');
        const btnCharacterisic = document.getElementById('characteristics');
        btnCharacterisic.addEventListener('click', () => scrollTo(characteristic));

        const BtnSendApplication = productSection.querySelector('.product-dashboard__send-request');
        BtnSendApplication.addEventListener('click', fillApplicationModal);
    }
});
