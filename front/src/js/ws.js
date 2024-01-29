export default class ForWebSocet {
  constructor(chat, connectionId) {
    this.ws = new WebSocket('ws://localhost:3000/ws');
    this.chat = chat;
    this.connectionId = connectionId;
    this.createMessage = this.createMessage.bind(this);
    this.init = this.init.bind(this);
    this.showMessage = this.showMessage.bind(this);
  }

  init() {
    // this.ws.addEventListener('open', (e) => {
    //     console.log('ws open');
    // });

    // this.ws.addEventListener('close', (e) => {
    //     console.log('ws close');
    // });

    // this.ws.addEventListener('error', (e) => {
    //     console.log('ws error');
    // });

    this.ws.addEventListener('message', this.showMessage);
  }

  showMessage(e) {
    // console.log(e);

    const data = JSON.parse(e.data);
    const { chat: messages } = data;

    messages.forEach((message) => {
      // console.log(this.connectionId)
      const newMessage = this.createMessage(
        message.message,
        message.userName,
        message.date,
        message.conectionId,
      );
      this.chat.appendChild(newMessage);
      newMessage.scrollIntoView();
    });

    // console.log('ws message');
  }

  sendMessage(msg) {
    this.ws.send(msg);
  }

  createMessage(msg, sender, date, id) {
    let senderName = 'NoName';

    if (sender) { senderName = sender; }

    const divMessage = document.createElement('div');
    divMessage.classList.add('message');

    if (id !== this.connectionId) {
      divMessage.classList.add('participant-message');
    } else {
      divMessage.classList.add('user-message');
    }

    const srtong = document.createElement('strong');
    srtong.textContent = senderName;
    const span = document.createElement('span');
    span.textContent = date;
    const p = document.createElement('p');
    p.textContent = msg;

    divMessage.appendChild(srtong);
    divMessage.appendChild(span);
    divMessage.appendChild(p);

    return divMessage;
  }
}
