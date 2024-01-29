import ForEventSource from './es';
import Fetcher from './fetch';
import ForWebSocet from './ws';
import getCurrentDate from './currentDate';

(async () => {
  let userName;

  const eventSource = new ForEventSource();
  eventSource.init();

  const fetcher = new Fetcher();

  const users = JSON.parse(await fetcher.getUsers());

  const popup = document.querySelector('.popup-container');
  const btn = popup.querySelector('.action-btn');
  const ul = document.querySelector('ul');

  const chat = document.getElementById('chat-window');
  const inputMessage = document.querySelector('.input-message');
  const chatSend = document.querySelector('.send-btn');

  ul.innerHTML = '';

for (const key in users) { // eslint-disable-line
    const li = document.createElement('li');
    li.id = key;

    li.innerHTML = `
        <div class="circle"></div>
        <div class="name">${users[key]}</div>
    `;
    document.querySelector('ul').appendChild(li);
  }

  btn.addEventListener('click', (event) => {
    event.preventDefault();
    userName = popup.querySelector('input').value;

  for (const key in users) { // eslint-disable-line
      if (users[key] === userName) {
        document.querySelector('.error').classList.remove('hidden');
        return;
      }
    }

    fetcher.sendUserName(eventSource.conectionId, userName);
  });

  const ws = new ForWebSocet(chat, eventSource.conectionId);
  ws.init();

  chatSend.addEventListener('click', (ev) => {
    ev.preventDefault();
    const message = inputMessage.value;

    if (!message) return;
    // console.log(message);
    ws.sendMessage(JSON.stringify({
      userName,
      conectionId: eventSource.conectionId,
      date: getCurrentDate(),
      message,
    }));

    inputMessage.value = '';
  });
})();
