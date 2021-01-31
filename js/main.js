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

function createGalleryItems() {
    galleryItemsList.forEach(item => {
        const galleryItemRef = document.createElement('li');
        galleryItemRef.classList.add('gallery__item');

        const linkRef = document.createElement('a');
        linkRef.classList.add('gallery__link');
        linkRef.setAttribute('href', `${item.original}`);
        galleryItemRef.append(linkRef);

        const imageRef = document.createElement('img');
        imageRef.classList.add('gallery__image');
        imageRef.setAttribute('src', `${item.preview}`);
        imageRef.setAttribute('data-source', `${item.original}`);
        imageRef.setAttribute('alt', `${item.description}`);
        linkRef.append(imageRef);

        return galleryRef.append(galleryItemRef);
    });
};

createGalleryItems();

const modalRef = document.querySelector('.lightbox');
const modalImageRef = document.querySelector('.lightbox__image');

function keyboardСontrolModal() {
    window.addEventListener('keydown', event => {
        if (event.code === 'Escape') {
            modalRef.classList.remove('is-open');
            modalImageRef.src = '';
        };
    });
};

galleryRef.addEventListener('click', event => {
    event.preventDefault();

    if (!event.target.classList.contains('gallery__image')) return;

    modalImageRef.src = event.target.dataset.source;
    modalImageRef.alt = event.target.alt;
    modalRef.classList.add('is-open');

    keyboardСontrolModal(modalImageRef);
});

modalRef.addEventListener('click', event => {
    // закрытие только кликом по кнопке
    // if (!event.target.classList.contains('lightbox__button')) return;
    // modalRef.classList.remove('is-open');
    // modalImageRef.src = '';

    if (event.target.classList.contains('lightbox__image')) return;

    modalRef.classList.remove('is-open');
    modalImageRef.src = '';
});