import Swiper, { Navigation } from 'swiper';
Swiper.use([Navigation]);

document.addEventListener('DOMContentLoaded', () => {
    const modalSlider = document.querySelector('.modal-slider');

    if (!modalSlider) return;

    const tabletQuery = window.matchMedia('(max-width: 991px)');

    const slider = modalSlider.querySelector('.modal-slider__swiper');
    const productImagesInDocument = document.querySelectorAll('.product-gallery__photo, .product-characteristics__scheme-img');
    productImagesInDocument.forEach((element, index) => {
        element.setAttribute('data-index', index);
        element.setAttribute('data-open-slider', '');
    });

    const images = [...productImagesInDocument];

    const containerForSlides = modalSlider?.querySelector('.swiper-wrapper');
    const imagesForSlider = [];
    console.log(images)
    if (images) {
        images.forEach((img) => {
            if (img.classList.contains('product-characteristics__scheme-img')) {
                imagesForSlider.push(img.querySelector('img').getAttribute('src'));
            } else {
                imagesForSlider.push(img.getAttribute('src'));
            }
        });
    }
    console.log(imagesForSlider)

    imagesForSlider.forEach((imageSrc) => createSlide(imageSrc));

    const modalGallerySlider = new Swiper(slider, {
        direction: 'horizontal',
        speed: 500,
        loop: true,
        spaceBetween: 40,

        breakpoints: {
            991: {
                navigation: {
                    nextEl: '.modal-slider__button-next',
                    prevEl: '.modal-slider__button-prev',
                    disabledClass: 'slider-button-disabled',
                },
            },
        },
        pagination: {
            el: '.modal-slider__pagination',
            bulletClass: 'modal-slider__pagination-el',
            bulletActiveClass: 'is-active',
            clickable: true,
            renderBullet: function (index, className) {
                return `<div class=${className}><img src='${imagesForSlider[index]}'></div>`;
            },
        },
    });

    // setSwiperState(tabletQuery.matches);
    tabletQuery.addEventListener('change', (e) => setSwiperState(e.matches));

    document.addEventListener('click', (e) => handleImage(e.target));

    function handleImage(element) {
        const imageElement = element.closest(`[data-open-slider]`);
        if (imageElement) {
            openModalSlider(imageElement.dataset.index);
        } else if (element.closest('.modal-slider__close')) {
            closeModalSlider();
        }
    }

    function openModalSlider(slideIndex) {
        console.log(slideIndex)
        modalGallerySlider.slideToLoop(slideIndex, 0, false);
        modalSlider.classList.add('is-active');
        noScroll.disableScroll();
    }

    function closeModalSlider() {
        modalSlider.classList.remove('is-active');
        noScroll.enableScroll();
    }

    function createSlide(imageSrc) {
        const slide = document.createElement('div');
        slide.classList.add('modal-slider__slide', 'swiper-slide');
        // slide.setAttribute('data-index', index);
        slide.innerHTML = `<img src='${imageSrc}'>`;
        containerForSlides.append(slide);
    }

    // function setSwiperState(condition) {
    //     if (condition) {
    //         console.log(condition);
    //         modalGallerySlider.detachEvents();
    //     } else {
    //         modalGallerySlider.attachEvents();
    //     }
    // }
});
