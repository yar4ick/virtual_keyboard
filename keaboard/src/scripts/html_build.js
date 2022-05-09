import HTML_DATA from './html_data';

function createElement(type, className, content = '') {
  const element = document.createElement(type);
  element.classList.add(className);
  element.innerHTML = content;

  return element;
}

function createTextArea(className) {
  const textarea = createElement('textarea', className);
  textarea.rows = 6;
  textarea.cols = 50;

  return textarea;
}

function buildInitialHTML() {
  const wrapper = document.body.appendChild(createElement('div', 'wrapper'));
  const main = wrapper.appendChild(createElement('div', 'main'));

  const header = main.appendChild(createElement('h1', 'h1', HTML_DATA.h1));
  const textArea = main.appendChild(createTextArea('textarea'));
  const keyboardWrapper = main.appendChild(createElement('div', 'keyboard-wrapper'));
  const desc = main.appendChild(createElement('p', 'description', HTML_DATA.description));
  const lang = main.appendChild(createElement('p', 'language', HTML_DATA.language));

  return { header, textArea, keyboardWrapper, desc, lang };
}

export default buildInitialHTML;
