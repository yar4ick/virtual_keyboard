class BrowserStore {
  static setValue(key, value) {
    window.localStorage.setItem(key, value);
  }

  static getValue(key) {
    return window.localStorage.getItem(key);
  }
}

export default BrowserStore;
