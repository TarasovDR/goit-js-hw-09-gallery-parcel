import galleryItems from './gallery-items.js';
import makeGalleryList from './markup.js';

const refs = {
  gallery: document.querySelector('.js-gallery'),
  lightbox: document.querySelector('.js-lightbox'),
  lightboxImage: document.querySelector('.lightbox__image'),
  lightboxOverlay: document.querySelector('.lightbox__overlay'),
  lightboxCloseBtn: document.querySelector('button[data-action="close-lightbox"]'),
};

const galleryMarkup = makeGalleryList(galleryItems);
refs.gallery.insertAdjacentHTML('afterbegin', galleryMarkup);
refs.gallery.addEventListener('click', onModalOpen);
refs.lightbox.addEventListener('click', onModalClose);
refs.lightboxOverlay.addEventListener('click', onModalClose);
window.addEventListener('keydown', onChangeArrow);

function onModalOpen(e) {
  e.preventDefault();

  if (e.target.nodeName !== 'IMG') {
    return;
  }

  addLightboxClass(e);
  setOriginalImage(e);

  window.addEventListener('keydown', onModalClose);

  console.log(e.target.dataset.source);
  console.log(e.target.alt);
}

function addLightboxClass() {
  refs.lightbox.classList.add('is-open');
}

function setOriginalImage(e) {
  const originalImageSrc = e.target.dataset.source;
  const originalImageAlt = e.target.alt;
  changingSrcAndAlt(originalImageSrc, originalImageAlt);
}

function onModalClose(e) {
  const isCloseBtn = e.target.classList.contains('lightbox__button');
  const isCloseOverlay = e.target.classList.contains('lightbox__overlay');
  const isCloseEscBtn = e.code === 'Escape';

  if (isCloseBtn || isCloseOverlay || isCloseEscBtn) {
    removeLightboxClass(e);
    changingSrcAndAlt('', '');
  }
  window.removeEventListener('keydown', onModalClose);
}

function removeLightboxClass() {
  refs.lightbox.classList.remove('is-open');
}

function changingSrcAndAlt(src, alt) {
  refs.lightboxImage.src = src;
  refs.lightboxImage.alt = alt;
}

function onChangeArrow(e) {
  let currentImage = refs.lightboxImage.src;
  let currentIndex = 0;
  const nextImage = e.code === 'ArrowRight';
  const prevImage = e.code === 'ArrowLeft';

  galleryItems.forEach((item, index) => {
    const originalImage = item.original;

    if (currentImage === originalImage) {
      currentIndex = index;
    }
  });

  if (nextImage && currentIndex < galleryItems.length - 1) {
    currentIndex += 1;
    changingSrcAndAlt(galleryItems[currentIndex].original, galleryItems[currentIndex].description);
    return;
  }

  if (prevImage && currentIndex > 0) {
    currentIndex -= 1;
    changingSrcAndAlt(galleryItems[currentIndex].original, galleryItems[currentIndex].description);
    return;
  }

  if (nextImage && currentIndex === galleryItems.length - 1) {
    currentIndex = 0;
    changingSrcAndAlt(galleryItems[currentIndex].original, galleryItems[currentIndex].description);
    return;
  }

  if (prevImage && currentIndex === 0) {
    currentIndex = galleryItems.length - 1;
    changingSrcAndAlt(galleryItems[currentIndex].original, galleryItems[currentIndex].description);
    return;
  }
}
