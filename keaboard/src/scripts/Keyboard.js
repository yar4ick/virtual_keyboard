import EventEmitter from './event_emitter';

class Keyboard {
  constructor(keys) {
    this.keys = keys;
    this.currentLang = 'en';
    this.currentCase = 'low';
    this.EVENT_EMITTER = new EventEmitter(this);
    this.init();
  }

  buildHTML() {
    const keysHTML = this.keys.map((key) => key.buildHTML());
    return `<div class="keyboard">${keysHTML.join('')}</div>`;
  }

  changeLang(lang) {
    this.currentLang = lang;
    this.updateKeysValue();
  }

  changeCase(keyCase) {
    this.currentCase = keyCase;
    this.updateKeysValue();
  }

  updateKeysValue() {
    this.keys.forEach((key) => {
      key.changeValue(this.currentLang, this.currentCase);
    });
  }

  pressKeys(pressedKeys) {
    const filteredKeys = this.keys.filter((key) => pressedKeys.includes(key.keyCode));
    filteredKeys.forEach((key) => {
      key.pressKey();
    });
  }

  unpressKeys(pressedKeys) {
    const filteredKeys = this.keys.filter((key) => pressedKeys.includes(key.keyCode));
    filteredKeys.forEach((key) => {
      key.unpressKey();
    });
  }

  on(event, func) {
    this.EVENT_EMITTER.on(event, func);
  }

  off(event, func) {
    this.EVENT_EMITTER.off(event, func);
  }

  dispatch(event, payload) {
    this.EVENT_EMITTER.dispatch(event, payload);
  }

  init() {
    this.keys.forEach((key) => {
      key.on('pressKey', (payload) => {
        this.dispatch('pressKey', payload);
      });
      key.on('unpressKey', (payload) => {
        this.dispatch('unpressKey', payload);
      });
    });
  }
}

export default Keyboard;
