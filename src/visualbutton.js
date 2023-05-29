export default class VisBtn {
  static classes = {
    hidden: 'hidden',
  };
  constructor({ selector, isHidden }) {
    this.button = this.getButton(selector);
    if (isHidden) this.hide();
  }
  getButton(selector) {
    return document.querySelector(selector);
  }
  hide() {
    this.button.classList.add(VisBtn.classes.hidden);
  }
  show() {
    this.button.classList.remove(VisBtn.classes.hidden);
  }
  disable() {
    this.button.disabled = true;
    this.button.textContent = 'Loading...';
  }
  enable() {
    this.button.disabled = false;
    this.button.textContent = 'Load more';
  }
}
