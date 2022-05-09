import EventEmitter from './event_emitter';

export const KEY_STATE = {
  default: 'default',
  pressed: 'pressed',
};

class Key {
  constructor(keyCode, type, values, position, action) {
    this.keyCode = keyCode;
    this.type = type;
    this.values = values;
    this.position = position;
    this.currentValue = values.en.low;
    this.state = KEY_STATE.default;
    this.action = action;
    this.EVENT_EMITTER = new EventEmitter(this);
  }

  getPayload() {
    const { currentValue: value, keyCode, action, state } = this;
    return { value, keyCode, action, state };
  }

  changeValue(lang, keyCase) {
    this.currentValue = this.values[lang][keyCase];
  }

  buildHTML() {
    const cssClass = `key ${this.state === KEY_STATE.pressed ? 'pressed' : ''} ${this.type} ${this.keyCode.toLowerCase()}`;
    return `<button class="${cssClass}" type="button" data-keycode="${this.keyCode}">${this.currentValue}</button>`;
  }

  pressKey() {
    this.state = KEY_STATE.pressed;
    this.dispatch('pressKey', this.getPayload());
  }

  unpressKey() {
    this.state = KEY_STATE.default;
    this.dispatch('unpressKey', this.getPayload());
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
}

export default Key;
