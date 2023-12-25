// html счётчика
{
    /* <div class='element-counter'>
    <button class='circle-btn element-counter__minus ${amount <= 1 ? 'disabled' : ''}'>
        <img src='./img/icons/bx-minus.svg' alt='Minus'>
    </button>
    <div class='element-counter__value'>${amount}</div>
    <button class='circle-btn element-counter__plus'>
        <img src='./img/icons/bx-plus.svg' alt='Plus'>
    </button>
</div> */
}

class Product {
    product;
    name = '';
    amount = 1;
    totalCost = 0;

    static createProductHtml({ img, name, amount, totalCost, id }) {
        const product = document.createElement('div');
        product.classList.add('basket-element');
        product.dataset.productId = id;
        product.innerHTML = `
        <div class='basket-element__info'>
            <img src="${img}", alt="" class='basket-element__image'>
            <div class='basket-element__name'>${name}</div>
        </div>
        <div class='basket-element__right'>
            <div class='basket-element__price'>
                <span class='value'>${totalCost}</span>&nbsp;₽
            </div>
            <button class='basket-element__delete'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"/><path d="M9 10h2v8H9zm4 0h2v8h-2z"/></svg>
            </button>
        </div>
        `;

        return product;
    }

    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.price = data.price;
        this.img = data.img;
        this.amount = data.amount;
        this.totalCost = this.price * this.amount;

        this.product = Product.createProductHtml({
            name: this.name,
            img: data.img,
            amount: this.amount,
            totalCost: this.totalCost,
            id: this.id,
        });
        const removeBtn = this.product.querySelector('.basket-element__delete');
        removeBtn.addEventListener('click', () => BASKET.remove(this.id));
        // this._initCounter();
    }

    createCounter() {
        const counterValue = this.counterElement.querySelector('.element-counter__value');
        return {
            increaseCount: function () {
                if (this.amount + 1 < 1) return;
                this.amount = this.amount + 1;
                if (this.amount > 1) {
                    const btnMinus = this.counterElement.querySelector('.element-counter__minus');
                    btnMinus.classList.remove('disabled');
                }
                counterValue.innerHTML = this.amount;
                this.recalculatePrice();
            },
            decreaseCount: function () {
                if (this.amount - 1 < 1) return;
                this.amount = this.amount - 1;
                if (this.amount === 1) {
                    const btnMinus = this.counterElement.querySelector('.element-counter__minus');
                    btnMinus.classList.add('disabled');
                }
                counterValue.innerHTML = this.amount;
                this.recalculatePrice();
            },
        };
    }

    _initCounter() {
        this.counterElement = this.product.querySelector('.element-counter');
        this.counter = this.createCounter.bind(this)();

        this.counterElement.addEventListener('click', (event) => {
            if (event.target.closest('.element-counter__minus')) {
                this.counter.decreaseCount.bind(this)();
            } else if (event.target.closest('.element-counter__plus')) {
                this.counter.increaseCount.bind(this)();
            }
        });
    }

    recalculatePrice() {
        const priceEl = this.product.querySelector('.basket-element__price .value');
        this.totalCost = this.amount * this.price;
        priceEl.innerHTML = this.totalCost;
        BASKET.countTotalSum({ id: this.id, totalCost: this.totalCost });
    }
}

class ProductBasket {
    total = 0;
    basketCounter = document.querySelector('.basket-btn__counter');
    products = [];

    constructor(element) {
        this.basket = element;
        this.products = JSON.parse(localStorage.getItem('products'))?.map((product) => new Product(product)) || [];

        this._correctBasketCounter();

        if (this.basket) {
            this.productWrapper = element.querySelector('.basket__wrapper');
        }
    }

    get count() {
        return this.products.length;
    }

    _correctBasketCounter() {
        if (this.products.length) {
            this.basketCounter.textContent = this.products.length;
            this.basketCounter.style.display = 'flex';
        } else {
            this.basketCounter.style.display = 'none';
        }
    }

    add(productData) {
        let product;
        if (typeof productData === 'string') {
            product = JSON.parse(productData);
        } else {
            product = productData;
        }

        if (this.products.find((el) => el.id === product.id)) {
            return false;
        }

        this.products.push(new Product(product));
        this.setItemInLocalStorage();

        this._correctBasketCounter();

        return true;
    }

    // Заменил id на строки!
    remove(productId) {
        this.products.forEach((el) => {
            if (el.id === productId) {
                el.product.remove();
            }
        });
        this.products = this.products.filter((el) => el.id !== productId);
        this.countTotalSum();
        this.setItemInLocalStorage();
        this._correctBasketCounter();

        if (!this.products.length) {
            this.basket.querySelector('#make-order').classList.add('disabled');
            this.productWrapper?.insertAdjacentHTML('beforeend', '<div class="basket__empty">В корзине<br> ничего нет :(</div>');
        }
    }

    fillBasket() {
        if (!this.products.length) {
            this.productWrapper?.insertAdjacentHTML('beforeend', '<div class="basket__empty">В корзине<br> ничего нет :(</div>');
        }

        this.products.forEach((item) => {
            this.productWrapper?.append(item.product);
        });
    }

    countTotalSum(changedProduct) {
        if (changedProduct) {
            // console.log(changedProduct);
            this.products = this.products.map((product) => {
                if (product.id === changedProduct.id) {
                    return { ...product, totalCost: changedProduct.totalCost };
                } else {
                    return product;
                }
            });
            this.setItemInLocalStorage();
        }
        this.total = 0;
        this.products.forEach((product) => {
            this.total += product.totalCost;
        });
        this.basket.querySelector('.basket__sum-value').innerText = this.total;
    }

    setItemInLocalStorage() {
        const storageArr = this.products.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            amount: item.amount,
            img: item.img,
        }));

        localStorage.setItem('products', JSON.stringify(storageArr));
    }
}

const BASKET = new ProductBasket(document.querySelector('.basket'));

if (BASKET.basket) {
    BASKET.fillBasket();
    BASKET.countTotalSum();
    const makeOrderBtn = BASKET.basket.querySelector('#make-order');

    if (!BASKET.products.length) {
        makeOrderBtn.classList.add('disabled');
    }

    makeOrderBtn.addEventListener('click', makeOrder);

    // BASKET.basket.addEventListener('click', (event) => {
    //     if (event.target.closest('.basket-element__delete')) {
    //         const removedProduct = event.target.closest('.basket-element');
    //         BASKET.remove(removedProduct.dataset.productId);
    //     }
    // });
}

function makeOrder() {
    if (!BASKET.count) return;

    console.log(BASKET.count);
}

export { Product, BASKET };
