export default function makeGalleryList(imagesGallery) {
  return imagesGallery
    .map(({ preview, original, description }) => {
      return `
      <li class="gallery__item">
        <a 
          class="gallery__link"
          href=${original}
        >
            <img 
              src=${preview}
              data-source=${original}
              class="gallery__image"
              alt=${description}
              loading="lazy"
            />
        </a>
      </li>    
      `;
    })
    .join('');
}
