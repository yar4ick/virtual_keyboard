import './styles/style.css';
import buildInitialHTML from './scripts/html_build';
import KEYS_DATA from './scripts/keys_data';
import Keyboard from './scripts/Keyboard';
import Key, { KEY_STATE } from './scripts/Key';
import Textarea from './scripts/Textarea';
import ActiveKey from './scripts/ActiveKey';

function createKey({ keyCode, type, values, position, action }) {
  if (type === 'active-control') return new ActiveKey(keyCode, type, values, position, action);
  return new Key(keyCode, type, values, position, action);
}

function createKeys(data) {
  return data.map(createKey);
}

function getButtonKeycode(e) {
  const keyButton = e.target.closest('[data-keycode]');
  if (!keyButton) return -1;
  const keyCode = parseInt(e.target.dataset.keycode, 10);

  return keyCode;
}

function init() {
  const { keyboardWrapper, textareaWrapper } = buildInitialHTML();
  const keys = createKeys(KEYS_DATA);
  const keyboard = new Keyboard(keys, keyboardWrapper);
  const textarea = new Textarea(textareaWrapper);

  document.body.addEventListener('keydown', (e) => {
    keyboard.pressKeys([e.keyCode]);
  });

  document.body.addEventListener('keyup', (e) => {
    keyboard.unpressKeys([e.keyCode]);
  });

  document.body.addEventListener('mousedown', (e) => {
    const keyCode = getButtonKeycode(e);
    keyboard.pressKeys([keyCode]);
  });

  document.body.addEventListener('mouseup', (e) => {
    const keyCode = getButtonKeycode(e);
    keyboard.unpressKeys([keyCode]);
  });

  let pressedKeys = [];

  keyboard.on('pressKey', (payload) => {
    pressedKeys.push(payload.keyCode);

    switch (payload.action) {
      case 'add':
        textarea.add(payload.value);
        break;

      case 'shift':
        keyboard.toggleCase();
        break;

      case 'backspace':
        textarea.backspace();
        break;

      case 'del':
        textarea.del();
        break;

      case 'tab':
        textarea.tab();
        break;

      case 'space':
        textarea.space();
        break;

      case 'enter':
        textarea.enter();
        break;

      case 'caps':
        keyboard.changeCase(payload.state === KEY_STATE.pressed ? 'up' : 'low');
        break;

      case 'alt':
        //  17 is ctrl keycode
        if (pressedKeys.includes(17)) {
          keyboard.changeLang(keyboard.getLang() === 'uk' ? 'en' : 'uk');
        }
        break;

      case 'ctrl':
        //  18 is alt keycode
        if (pressedKeys.includes(18)) {
          keyboard.changeLang(keyboard.getLang() === 'uk' ? 'en' : 'uk');
        }
        break;

      default:
        break;
    }
  });

  keyboard.on('unpressKey', (payload) => {
    pressedKeys = pressedKeys.filter((keyCode) => keyCode !== payload.keyCode);

    switch (payload.action) {
      case 'shift':
        keyboard.toggleCase();
        break;

      default:
        break;
    }
  });
}

init();
