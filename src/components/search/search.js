document.addEventListener('DOMContentLoaded', () => {
    const search = document.querySelector('.search');

    if (search) {
        const searchInput = search.querySelector('input');
        const btnClose = search.querySelector('.search__close');
        const mobileBtnSearch = document.getElementById('mobile-search');

        const openSearch = () => {
            search.classList.add('open');
            if (search.classList.contains('open')) {
                mobileBtnSearch.classList.add('is-active');
                noScroll.disableScroll();
                // searchInput.focus();
            }
        };

        const closeSearch = () => {
            search.classList.remove('open');
            searchInput.value = '';
            mobileBtnSearch.classList.remove('is-active');
            noScroll.enableScroll();
        };

        const toogleSearch = () => {
            if (search.classList.contains('open')) {
                closeSearch();
            } else {
                openSearch();
            }
        };

        // Открытие поиска
        searchInput.addEventListener('focus', () => {
            search.classList.add('open');
            search.querySelector('input').placeholder = 'Что хотите найти?';
        });

        searchInput.addEventListener('blur', () => {
            search.querySelector('input').placeholder = 'Поиск';
        });

        mobileBtnSearch.addEventListener('click', toogleSearch);

        // Закрытие поиска
        btnClose.addEventListener('click', closeSearch);
        document.addEventListener('click', (e) => {
            if (search.classList.contains('open') && !e.target.closest('.search') && !e.target.closest('#mobile-search')) {
                closeSearch();
            }
        });

        // Запросы
        // searchInput.addEventListener('input', function (e) {
        //     const inputValue = e.target.value;
        //     console.log(inputValue);
        //     if (inputValue.length > 2) {
        //         try {
        //             fetch('https://adress', {
        //                 method: 'POST',
        //                 headers: {
        //                     'Content-Type': 'application/json;charset=utf-8',
        //                 },
        //                 body: { q: inputValue },
        //             }).then((res) => {
        //                 console.log(res);
        //             });
        //         } catch (e) {
        //             console.log('error');
        //         }
        //     }
        // });
    }
});
