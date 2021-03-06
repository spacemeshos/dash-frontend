// @flow
import {
  observable,
  action,
  computed, makeAutoObservable,
} from 'mobx';
import { ERROR_STATUS, SYNCING_STATUS } from '../../config/constants';

class UiStore {
  constructor() {
    this.theme = localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light';
    document.documentElement.classList.add(`theme-${this.theme}`);

    makeAutoObservable(this, {
      theme: observable,
      color: observable,
      changeTheme: action,
      setNetworkStatus: action,
      networkStatusColor: computed,
    });
  }

  color = 'orange';

  changeTheme(e) {
    this.theme = e.target.checked ? 'dark' : 'light';
    localStorage.setItem('theme', this.theme);
    document.documentElement.className = '';
    document.documentElement.classList.add(`theme-${this.theme}`);
  }

  get networkStatusColor() {
    return this.color;
  }

  setNetworkStatus(status) {
    if (status === ERROR_STATUS) {
      this.color = 'red';
    } else if (status === SYNCING_STATUS) {
      this.color = 'orange';
    } else {
      this.color = 'green';
    }
  }
}

export default UiStore;
