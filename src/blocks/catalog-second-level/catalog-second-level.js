import ItcCustomSelect from '../../components/itc-custom-select/itc-custom-select';
const catalogBlock = document.querySelector('#catalog-select');
const productsWrapper = document.querySelector('.catalog-second-level__grid');
if (catalogBlock) {
    const catalogSelect = new ItcCustomSelect(catalogBlock);

    const observer = new MutationObserver(() => filterProducts(catalogSelect));
    observer.observe(catalogSelect._elToggle, { attributes: true, attributeFilter: ['value'] });
}

function filterProducts(select) {
    const products = document.querySelectorAll('.product-card');
    let sortProducts;
    if (select.value === 'low-cost') {
        sortProducts = [...products].sort(function (product1, product2) {
            if (JSON.parse(product1.dataset.product).price < JSON.parse(product2.dataset.product).price) {
                return -1;
            }
            if (JSON.parse(product1.dataset.product).price > JSON.parse(product2.dataset.product).price) {
                return 1;
            }
            return 0;
        });
    } else if (select.value === 'high-cost') {
        sortProducts = [...products].sort(function (product1, product2) {
            if (JSON.parse(product1.dataset.product).price < JSON.parse(product2.dataset.product).price) {
                return 1;
            }
            if (JSON.parse(product1.dataset.product).price > JSON.parse(product2.dataset.product).price) {
                return -1;
            }
            return 0;
        });
    }
    sortProducts.forEach((product) => productsWrapper.append(product));
}
