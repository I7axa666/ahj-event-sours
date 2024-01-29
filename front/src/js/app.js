import ForEventSource from "./es";
import Fetcher from "./fetch";
import ForWebSocet from './ws';
const getCurrentDate = require('./currentDate');
let userName = undefined;

const eventSource = new ForEventSource();
eventSource.init();

const fetcher = new Fetcher();
const users = JSON.parse(await fetcher.getUsers());

// console.log(users);

const popup = document.querySelector('.popup-container');
const btn = popup.querySelector('.action-btn');
const participants = document.querySelector('#participants-list');
const ul = document.querySelector('ul');

const chat = document.getElementById('chat-window');
const chatMessage = chat.querySelector('.message');
const inputMessage = document.querySelector('.input-message');
const chatSend = document.querySelector('.send-btn');

ul.innerHTML = '';

for (let key in users) {
    const li = document.createElement('li');
    li.id = key;
    
    li.innerHTML = `
        <div class="circle"></div>
        <div class="name">${users[key]}</div>
    `
    document.querySelector('ul').appendChild(li);
};

btn.addEventListener('click', (event) => {
    event.preventDefault();
    userName = popup.querySelector('input').value;

    for (let key in users) {
        if(users[key] === userName) {
            document.querySelector('.error').classList.remove('hidden');
            return;
        }   
    }

    fetcher.sendUserName(eventSource.conectionId, userName);

})

const ws = new ForWebSocet(chat, eventSource.conectionId);
ws.init();

chatSend.addEventListener('click', (ev) => {
    ev.preventDefault();
    const message = inputMessage.value;

    if(!message) return;
    // console.log(message);
    ws.sendMessage(JSON.stringify({
        userName: userName,
        conectionId: eventSource.conectionId,
        date: getCurrentDate(),
        message: message,
    }));

    inputMessage.value = '';
})