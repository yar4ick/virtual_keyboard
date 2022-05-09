import EventEmitter from './event_emitter';

class Keyboard {
  constructor(keys, wrap) {
    this.keys = keys;
    this.currentLang = 'en';
    this.currentCase = 'low';
    this.EVENT_EMITTER = new EventEmitter(this);
    this.wrap = wrap;
    this.init();
  }

  buildHTML() {
    const keysHTML = this.keys.map((key) => key.buildHTML());
    this.wrap.innerHTML = `<div class="keyboard">${keysHTML.join('')}</div>`;
    return this.wrap;
  }

  getCase() {
    return this.currentCase;
  }

  getLang() {
    return this.currentLang;
  }

  changeLang(lang) {
    this.currentLang = lang;
    this.updateKeysValue();
  }

  changeCase(keyCase) {
    this.currentCase = keyCase;
    this.updateKeysValue();
  }

  toggleCase() {
    const newCase = this.currentCase === 'low' ? 'up' : 'low';
    this.changeCase(newCase);
  }

  updateKeysValue() {
    this.keys.forEach((key) => {
      key.changeValue(this.currentLang, this.currentCase);
    });
    this.buildHTML();
  }

  pressKeys(pressedKeys) {
    const filteredKeys = this.keys.filter((key) => pressedKeys.includes(key.keyCode));
    filteredKeys.forEach((key) => {
      key.pressKey();
    });
    this.buildHTML();
  }

  unpressKeys(pressedKeys) {
    const filteredKeys = this.keys.filter((key) => pressedKeys.includes(key.keyCode));
    filteredKeys.forEach((key) => {
      key.unpressKey();
    });
    this.buildHTML();
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
    this.keys.sort((key1, key2) => key1.position - key2.position);
    this.keys.forEach((key) => {
      key.on('pressKey', (payload) => {
        this.dispatch('pressKey', payload);
      });
      key.on('unpressKey', (payload) => {
        this.dispatch('unpressKey', payload);
      });
    });

    this.buildHTML();
  }
}

export default Keyboard;
