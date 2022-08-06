import { galleryItems } from './gallery-items.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryEl = document.querySelector('.gallery');

galleryEl.insertAdjacentHTML('beforeend', renderGalleryItems());

galleryEl.addEventListener('click', onImageClick);

function renderGalleryItems() {
  return galleryItems
    .map(
      ({ original, preview, description }) =>
        `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
  </div>
`
    )
    .join('');
}

function onImageClick(event) {
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  event.preventDefault();

  const markup = `<img
      class="gallery__image"
      src="${event.target.dataset.source}"
      alt="${event.target.description}"
    />`;

  const modal = SimpleLightbox.create(markup, {
    onShow: () => {
      addEventListener('keydown', closeOnHotKey);
    },
    onClose: () => {
      removeEventListener('keydown', closeOnHotKey);
    },
  });

  modal.show();

  function closeOnHotKey(event) {
    if (event.code === 'Escape') {
      modal.close();
    }
  }
}
