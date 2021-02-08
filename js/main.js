// Создай галерею с возможностью клика по ее элементам
// и просмотра полноразмерного изображения в модальном окне.

// Разбей задание на несколько подзадач:

// - Создание и рендер разметки по массиву данных и предоставленному шаблону.
// - Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
// - Открытие модального окна по клику на элементе галереи.
// - Подмена значения атрибута src элемента img.lightbox__image.
// - Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
// - Очистка значения атрибута src элемента img.lightbox__image.Это необходимо для того,
// чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.

// Разметка элемента галереи

// Ссылка на оригинальное изображение должна храниться в data - атрибуте source на элементе img,
// и указываться в href ссылки(это необходимо для доступности).

// {/* <li class="gallery__item">
//   <a
//     class="gallery__link"
//     href="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
//   >
//     <img
//       class="gallery__image"
//       src="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546__340.jpg"
//       data-source="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
//       alt="Tulips"
//     />
//   </a>
// </li> */}

// Закрытие модального окна по клику на div.lightbox__overlay.
// Закрытие модального окна по нажатию клавиши ESC.
// Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо".

import galleryItemsList from "./gallery-items.js";

const galleryRef = document.querySelector('.gallery');
const modalRef = document.querySelector('.lightbox');
const modalImageRef = document.querySelector('.lightbox__image');


function createGalleryItems() {
    galleryItemsList.forEach(item => {
        const galleryItem = document.createElement('li');
        galleryItem.classList.add('gallery__item');

        const link = document.createElement('a');
        link.classList.add('gallery__link');
        link.setAttribute('href', `${item.original}`);
        galleryItem.append(link);

        const image = document.createElement('img');
        image.classList.add('gallery__image');
        image.setAttribute('src', `${item.preview}`);
        image.setAttribute('data-source', `${item.original}`);
        image.setAttribute('alt', `${item.description}`);
        link.append(image);

        return galleryRef.append(galleryItem);
    });
};

createGalleryItems();

const imagesRef = document.querySelectorAll('.gallery__image');

const openModal = event => {
    event.preventDefault();

    if (!event.target.classList.contains('gallery__image')) return;

    modalImageRef.src = event.target.dataset.source;
    modalImageRef.alt = event.target.alt;
    modalRef.classList.add('is-open');
    window.addEventListener('keydown', closeModalbyKeyboard);
    window.addEventListener('keydown', switchImageByKeyboard);
};

const closeModalbyClick = event => {
    // закрытие только кликом по кнопке
    // if (!event.target.classList.contains('lightbox__button')) return;
    // modalRef.classList.remove('is-open');
    // modalImageRef.src = '';

    if (event.target.classList.contains('lightbox__image')) return;
    modalRef.classList.remove('is-open');
    modalImageRef.alt = '';
    modalImageRef.src = '';
    window.removeEventListener('keydown', closeModalbyKeyboard);
    window.removeEventListener('keydown', switchImageByKeyboard);
};

const closeModalbyKeyboard = event => {
    event.preventDefault();
    
    if (event.code === 'Escape') {
        modalRef.classList.remove('is-open');
        modalImageRef.alt = '';
        modalImageRef.src = '';
        window.removeEventListener('keydown', closeModalbyKeyboard);
        window.removeEventListener('keydown', switchImageByKeyboard);
    };
};

const switchImageByKeyboard = event => {
    event.preventDefault();

    const arrayImagesSrc = [];
    imagesRef.forEach(image => {
        arrayImagesSrc.push(image.dataset.source);
    });

    const arrayImagesAlt = [];
    imagesRef.forEach(image => {
        arrayImagesAlt.push(image.alt);
    });

    let currentIndex = arrayImagesSrc.indexOf(modalImageRef.src);
    let currentAltIndex = arrayImagesAlt.indexOf(modalImageRef.alt);

    if (event.code === 'ArrowLeft') {
        currentIndex -= 1;
        currentAltIndex -= 1;

        if (currentIndex >= 0) {
            modalImageRef.src = arrayImagesSrc[currentIndex];
            modalImageRef.alt = arrayImagesAlt[currentAltIndex];
        };
    };
    
    if (event.code === 'ArrowRight') {
        currentIndex += 1;
        currentAltIndex += 1;

        if (currentIndex < arrayImagesSrc.length) {
            modalImageRef.src = arrayImagesSrc[currentIndex];
            modalImageRef.alt = arrayImagesAlt[currentAltIndex];
        };
    };
};

galleryRef.addEventListener('click', openModal);
modalRef.addEventListener('click', closeModalbyClick);