import Key, { KEY_STATE } from './Key';

class ActiveKey extends Key {
  pressKey() {
    const newState = this.state === KEY_STATE.pressed ? KEY_STATE.default : KEY_STATE.pressed;
    this.state = newState;
    this.dispatch('pressKey', this.getPayload());
  }

  unpressKey() {
    this.dispatch('unpressKey', this.getPayload());
  }
}

export default ActiveKey;
