import HTML_DATA from './html_data';

function createElement(type, className, content = '') {
  const element = document.createElement(type);
  element.classList.add(className);
  element.innerHTML = content;

  return element;
}

function buildInitialHTML() {
  const wrapper = document.body.appendChild(createElement('div', 'wrapper'));
  const main = wrapper.appendChild(createElement('div', 'main'));

  const header = main.appendChild(createElement('h1', 'h1', HTML_DATA.h1));
  const textareaWrapper = main.appendChild(createElement('div', 'textarea-wrapper'));
  const keyboardWrapper = main.appendChild(createElement('div', 'keyboard-wrapper'));
  const desc = main.appendChild(createElement('p', 'description', HTML_DATA.description));
  const lang = main.appendChild(createElement('p', 'language', HTML_DATA.language));

  return { header, textareaWrapper, keyboardWrapper, desc, lang };
}

export default buildInitialHTML;
