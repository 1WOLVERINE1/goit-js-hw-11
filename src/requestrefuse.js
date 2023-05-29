import axios from 'axios';
import Notiflix from 'notiflix';
import { form, btnLoadMore } from './index.js';

export default class RequestRefuse {
  constructor() {
    this.page = 1;
    this.totalPages = 0;
    this.searchQuery = '';
  }
  async fetchPhoto() {
    try {
      const query = encodeURIComponent(this.searchQuery);
      const response = await axios.get(
        `https://pixabay.com/api/?key=35924143-9020fc77f3274be39114409f4&q=${query}&orientation=horizontal&page=${this.page}&per_page=40&image_type=photo&safesearch=true`
      );
      this.updatePage();
      return response.data;
    } catch {
      console.log('Error!');
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
      btnLoadMore.classList.add('is-hidden');
    }
  }
  updatePage() {
    this.page += 1;
  }
  removePage() {
    this.page = 1;
  }
  removeHits() {
    this.endOfHits = false;
  }
  setTotal(total) {
    return (this.totalPages = total);
  }
  getQuery() {
    return this.searchQuery;
  }
  setQuery(newQuery) {
    return (this.searchQuery = newQuery);
  }
}
