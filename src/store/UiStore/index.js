// @flow
import {
  decorate,
  observable,
  action,
} from 'mobx';

class UiStore {
  constructor() {
    this.theme = localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light';
    document.documentElement.classList.add(`theme-${this.theme}`);
  }

  changeTheme(e) {
    this.theme = e.target.checked ? 'dark' : 'light';
    localStorage.setItem('theme', this.theme);
    document.documentElement.className = '';
    document.documentElement.classList.add(`theme-${this.theme}`);
  }
}

decorate(UiStore, {
  theme: observable,
  changeTheme: action,
});

export default UiStore;
