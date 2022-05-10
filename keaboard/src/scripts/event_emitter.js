class EventEmitter {
  constructor(instanse) {
    this.INSTANSE = instanse;
    this.LISTENERS = {};
  }

  on(event, func) {
    if (this.LISTENERS[event]) this.LISTENERS[event].push(func);
    else this.LISTENERS[event] = [func];
  }

  off(event, func) {
    this.LISTENERS[event] = this.LISTENERS[event].filter((cb) => cb !== func);
    if (this.LISTENERS[event].length <= 0) delete this.LISTENERS[event];
  }

  dispatch(event, payload) {
    if (this.LISTENERS[event]) {
      this.LISTENERS[event].forEach((func) => func(payload));
    }
  }

  destroy() {
    this.LISTENERS = null;
    this.INSTANSE = null;
  }
}

export default EventEmitter;
