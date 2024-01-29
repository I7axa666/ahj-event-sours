const chatChistory = {
  data: [],
  listeners: [],
  users: {},

  add(item) {
    this.data.push(item);

    this.listeners.forEach((handler) => handler(item));
  },

  listen(handler) {
    this.listeners.push(handler);
  },

  addUser(id, chatName) {
    this.users[id] = chatName;

    this.listeners.forEach((handler) => handler({
      conectionID: id,
      chatName,
    }));
  },

  deleteUser(id) {
    delete this.users[id];

    this.listeners.forEach((handler) => handler({ deleteId: id }));
  },
};

module.exports = chatChistory;
