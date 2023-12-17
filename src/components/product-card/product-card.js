import { BASKET } from '../../blocks/basket/basket';

document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.querySelector('.catalog-second-level__grid');
    const allCards = document.querySelectorAll('.product-card');
    if (!productGrid) return;

    function iterateProductCards(cards) {
        cards.forEach((card, i) => {
            // const navElements = card.querySelectorAll('.product-card__nav-el');
            // const images = card.querySelectorAll('img');
            // const tabs = card.querySelectorAll('.product-card__tab');
            // navElements.forEach((el) => {
            //     el.addEventListener('mouseenter', () => {
            //         const index = el.dataset.index;
            //         images.forEach((img) => (index === img.dataset.index ? img.classList.add('is-active') : img.classList.remove('is-active')));
            //         tabs.forEach((tab) => (index === tab.dataset.index ? tab.classList.add('is-active') : tab.classList.remove('is-active')));
            //     });
            // });

            // Клик по кнопке 'Сделать заказ'
            // const BtnSendApplication = card.querySelector('.send-application');
            // BtnSendApplication.addEventListener('click', () => fillApplicationModal(card));

            // Клик по кнопке 'Добавить в корзину'
            const BtnsAddToBasket = card.querySelectorAll('.add-to-basket');
            BtnsAddToBasket.forEach((btn) =>
                btn.addEventListener('click', (event) => {
                    event.preventDefault();
                    addToBasket(card);
                })
            );
        });
    }

    // Отслеживаем изменения DOM элемента.
    // for(let mutation of mutations) {
    //     iterateProductCards(mutation.addedNodes)
    // }
    const observer = new MutationObserver((mutations) => iterateProductCards(mutations[0].addedNodes));
    observer.observe(productGrid, {
        childList: true,
    });

    iterateProductCards(allCards);

    // function fillApplicationModal(card) {
    //     // Заполняем модалку 'Сделать заказ'
    //     const modalApplication = document.querySelector('.modal-application');
    //     const modalImg = modalApplication.querySelector('.application-info__img');
    //     const modalProductName = modalApplication.querySelector('.application-info__product-name');
    //     const modalProductCost = modalApplication.querySelector('.application-info__product-cost span');
    //     const modalProductId = modalApplication.querySelector('.for-id input');

    //     const cardData = JSON.parse(card.dataset.product);

    //     const imgSrc = cardData.img;
    //     const productName = card.querySelector('.product-card__name').innerHTML;
    //     const productCost = card.querySelector('.product-card__cost span').innerHTML;
    //     const productId = cardData.id;

    //     modalImg.setAttribute('src', `${imgSrc}`);
    //     modalProductName.innerHTML = productName;
    //     modalProductCost.innerHTML = productCost;
    //     modalProductId.value = productId;
    // }

    function addToBasket(card) {
        if (!BASKET.add(card.dataset.product)) return;
        card.classList.add('basket-animation');
        setTimeout(() => {
            card.style.opacity = 0;
            card.classList.remove('basket-animation');
        }, 400);
        setTimeout(() => {
            card.style.opacity = 1;
        }, 700);
    }
});
