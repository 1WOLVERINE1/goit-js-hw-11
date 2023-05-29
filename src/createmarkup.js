import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { divgal } from './index.js';

export function createMarkup(hits) {
  const markup = hits
    .map(hit => {
      return `<div class="photo-card">
      <a href ="${hit.webformatURL}">
      <img src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes:</b>${hit.likes}
        </p>
        <p class="info-item">
          <b>Views:</b>${hit.views}
        </p>
        <p class="info-item">
          <b>Comments:</b>${hit.comments}
        </p>
        <p class="info-item">
          <b>Downloads:</b>${hit.downloads}
        </p>
      </div>
    </div>`;
    })
    .join('');
  divgal.insertAdjacentHTML('beforeend', markup);
}

export const lightbox = new SimpleLightbox(`.photo-card a`, {});
