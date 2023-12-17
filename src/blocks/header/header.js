const aboutCompanyBtn = document.querySelector('.header__about-company');
if (aboutCompanyBtn) {
    const aboutSection = document?.querySelector('.about-company');
    aboutCompanyBtn.addEventListener('click', () => aboutSection.scrollIntoView({ behavior: 'smooth', block: 'center' }));
}
