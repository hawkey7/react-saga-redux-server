export const EventEmitter = {
  callbacks: {},
  on: function (tag: string, callback: any) {
    this.callbacks[tag] = callback
  },
  emit: function (tag: string, args: any) {
    if (!args) {
      return this.callbacks[tag]()
    }
    return this.callbacks[tag].call(null, args)
  }
}
