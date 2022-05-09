class Textarea {
  constructor(wrap) {
    this.wrap = wrap;
    this.textarea = null;
    this.init();
  }

  buildHTML() {
    this.wrap.innerHTML = `<textarea class='textarea' cols='50' rows='6'></textarea>`; // eslint-disable-line
    this.textarea = this.wrap.querySelector('textarea');
    return this.wrap;
  }

  getCursorPosition() {
    const pos = {
      start: this.textarea.selectionStart || this.textarea.value.length,
      end: this.textarea.selectionEnd || this.textarea.value.length,
    };
    return pos;
  }

  init() {
    this.buildHTML();
    this.textarea.addEventListener('keydown', (e) => {
      e.preventDefault();
    });
  }

  add(char, offset = 1) {
    const cursorPos = this.getCursorPosition();
    const { value } = this.textarea;
    const newValue = `${value.slice(0, cursorPos.start)}${char}${value.slice(cursorPos.start)}`;
    this.textarea.value = newValue;
    this.textarea.setSelectionRange(cursorPos.start + offset, cursorPos.end + offset);
  }

  backspace() {
    const cursorPos = this.getCursorPosition();
    const { value } = this.textarea;
    this.textarea.value = `${value.slice(0, cursorPos.start - 1)}${value.slice(cursorPos.start)}`;
    this.textarea.setSelectionRange(cursorPos.start - 1, cursorPos.end - 1);
  }

  del() {
    const cursorPos = this.getCursorPosition();
    const { value } = this.textarea;
    this.textarea.value = `${value.slice(0, cursorPos.start)}${value.slice(cursorPos.start + 1)}`;
    this.textarea.setSelectionRange(cursorPos.start, cursorPos.end);
  }

  tab() {
    this.add('    ', 4);
  }

  space() {
    this.add(' ');
  }

  enter() {
    this.add('\n');
  }
}

export default Textarea;
