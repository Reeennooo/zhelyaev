// hint - подсказка при наведении на точку.

ymaps.ready(init);

function init() {
    const myMap = new ymaps.Map(
        'yandex-map',
        {
            center: [53.746785, 83.776856],
            zoom: 6,
            controls: [],
        },
        { suppressMapOpenBlock: true }
    );

    const OFFICES = [
        {
            city: 'Барнаул',
            coordinate: [53.337317, 83.678473],
            addres: 'г. Барнаул, ул. Шумакова,\n д. 23а, офис 005, цокольный этаж',
        },
        {
            city: 'Новосибирск',
            coordinate: [55.030204, 82.92043],
            addres: 'г. Новосибирск, ул. Шумакова,\n д. 23а, офис 005, цокольный этаж',
        },
        {
            city: 'Новокузнецк',
            coordinate: [53.75757, 87.136043],
            addres: 'г. Новокузнецк, ул. Шумакова,\n д. 23а, офис 005, цокольный этаж',
        },
    ];

    function createOfficePoint(coordinate, addres) {
        const officePoint = new ymaps.Placemark(
            coordinate,
            {
                balloonContent: `<p class='ballon-title'>Офис</p> <p class='ballon-addres'>${addres}</p>`,
            },
            {
                // Стили для метки
                iconLayout: 'default#image',
                iconImageHref: '../img/yandex-map/map-pin-black.svg',
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
