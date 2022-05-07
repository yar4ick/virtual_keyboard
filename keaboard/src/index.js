import './style.css';

function component() {
  const { document } = window;
  const element = document.createElement('div');

  // Lodash, now imported by this script
  element.innerHTML = ['Hello', 'webpack'].join();
  element.classList.add('hello');

  return element;
}

// const temp = '';

document.body.appendChild(component());
