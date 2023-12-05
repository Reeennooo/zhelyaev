document.addEventListener('DOMContentLoaded', () => {
    const tabletWidthQuery = window.matchMedia('(max-width: 991px)');
    const footerMob = document.querySelector('.footer-mob');
    const wrapper = document.querySelector('.wrapper');
    if (footerMob && tabletWidthQuery.matches) {
        wrapper.style.paddingBottom = `${footerMob.offsetHeight}px`;
    }
    if (footerMob) {
        tabletWidthQuery.addEventListener('change', (e) => {
            if (e.matches) {
                wrapper.style.paddingBottom = `${footerMob.offsetHeight}px`;
            } else {
                wrapper.style.paddingBottom = 'initial';
            }
        });
    }
});
