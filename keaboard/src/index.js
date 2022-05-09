import './styles/style.css';
import buildInitialHTML from './scripts/html_build';
import KEYS_DATA from './scripts/keys_data';
import Keyboard from './scripts/Keyboard';
import Key from './scripts/Key';

function createKey({ keyCode, type, values, position, action }) {
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
  const keys = createKeys(KEYS_DATA);
  const keyboard = new Keyboard(keys);
  const { keyboardWrapper, textArea } = buildInitialHTML();

  function rebuildKeyboard() {
    keyboardWrapper.innerHTML = keyboard.buildHTML();
  }

  rebuildKeyboard();

  // window.changeLang = (lang) => {
  //   keyboard.changeLang(lang);
  //   rebuildKeyboard();
  // };

  // window.changeCase = (keyCase) => {
  //   keyboard.changeCase(keyCase);
  //   rebuildKeyboard();
  // };

  document.body.addEventListener('keydown', (e) => {
    keyboard.pressKeys([e.keyCode]);
    rebuildKeyboard();
  });

  document.body.addEventListener('keyup', (e) => {
    keyboard.unpressKeys([e.keyCode]);
    rebuildKeyboard();
  });

  document.body.addEventListener('mousedown', (e) => {
    const keyCode = getButtonKeycode(e);
    keyboard.pressKeys([keyCode]);
    rebuildKeyboard();
  });

  document.body.addEventListener('mouseup', (e) => {
    const keyCode = getButtonKeycode(e);
    keyboard.unpressKeys([keyCode]);
    rebuildKeyboard();
  });

  keyboard.on('pressKey', (payload) => {
    switch (payload.action) {
      case 'add':
        textArea.value += payload.value;
        break;

      case 'shift':
        keyboard.changeCase('up');
        rebuildKeyboard();
        break;

      default:
        break;
    }
  });

  keyboard.on('unpressKey', (payload) => {
    switch (payload.action) {
      case 'shift':
        keyboard.changeCase('low');
        rebuildKeyboard();
        break;

      default:
        break;
    }
  });
}

init();
