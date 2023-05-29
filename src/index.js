import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import VisBtn from './visualbutton';
import RequestRefuse from './requestrefuse';
import { createMarkup, lightbox } from './createmarkup';
export const form = document.getElementById('search-form');
export const divgal = document.querySelector('.gallery');
export const btnLoadMore = document.querySelector('.load-more');
const requestRefuse = new RequestRefuse();
const visBtn = new VisBtn({ selector: '.load-more', isHidden: true });

form.addEventListener('submit', onSearch);
btnLoadMore.addEventListener('click', onClick);
async function onSearch(evt) {
  evt.preventDefault();
  divgal.innerHTML = ` `;
  visBtn.hide();
  requestRefuse.removePage();
  requestRefuse.searchQuery = evt.currentTarget.elements.searchQuery.value;
  if (requestRefuse.searchQuery === ` `) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }
  try {
    const result = await requestRefuse.fetchPhoto();
    if (result.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    } else {
      createMarkup(result.hits);
      lightbox.refresh();
      if (result.hits.length < result.totalHits) {
        Notiflix.Notify.success(`Hooray! We found ${result.totalHits} images.`);
        visBtn.show();
      }
      if (result.hits.length >= result.totalHits) {
        Notiflix.Notify.success(`Hooray! We found ${result.totalHits} images.`);
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
        return;
      }
      visBtn.show();
    }
  } catch (error) {
    console.log(error);
  }
}
async function onClick() {
  try {
    visBtn.disable();
    const result = await requestRefuse.fetchPhoto();
    createMarkup(result.hits);
    lightbox.refresh();
    if (result.hits.length === 0) {
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
      visBtn.hide();
      return;
    }

    visBtn.enable();
    if (result.hits.length >= result.totalHits || result.hits.length < 40) {
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
      visBtn.hide();
      return;
    }
  } catch (error) {
    console.log(error);
  }
}
