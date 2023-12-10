// hint - подсказка при наведении на точку.

ymaps.ready(init);

function init() {
    const myMap = new ymaps.Map(
        'yandex-map',
        {
            center: [47.222078, 39.720358],
            zoom: 6,
            controls: [],
        },
        { suppressMapOpenBlock: true }
    );

    const OFFICES = [
        {
            city: 'Ростов-На-Дону',
            coordinate: [47.22208, 39.720353],
            addres: 'г. Ростов-На-Дону, ул. Пушкинская,\n д. 23а, офис 005, цокольный этаж',
        },
        {
            city: 'Москва',
            coordinate: [55.755864, 37.617698],
            addres: 'г. Москва, ул. Пушкинская,\n д. 23а, офис 005, цокольный этаж',
        },
    ];

    function createOfficePoint(coordinate, addres) {
        const officePoint = new ymaps.Placemark(
            coordinate,
            {
                balloonContent: `<p class='ballon-title'>Магазин</p> <p class='ballon-addres'>${addres}</p>`,
            },
            {
                // Стили для метки
                iconLayout: 'default#image',
                iconImageHref: '../img/yandex-map/map-pin.svg',
                iconImageSize: [44, 44],
                iconImageOffset: [-22, -44],
            }
        );
        return officePoint;
    }

    // Добавление объектов на карту
    OFFICES.map((office) => {
        myMap.geoObjects.add(createOfficePoint(office.coordinate, office.addres));
    });
}
