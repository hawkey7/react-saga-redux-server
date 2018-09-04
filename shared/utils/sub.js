export default class Sub {
  constructor() {
    this.space = {}
  }

  on(key, fn) {
    this.space[key] = this.space[key] || []
    this.space[key].push(fn)
  }

  emit(key, ...args) {
    // console.warn('emit sth---->', key, ...args);
    // console.warn('space', this.space);
    if (!this.space[key] || !this.space[key].length) return
    for (let i = 0; i < this.space[key].length; i++) {
      this.space[key][i].apply(this, args)
    }
  }
}
