const eventSource = new EventSource('http://localhost:3000/sse');

eventSource.addEventListener('message', (e) => {
    
})

const popup = document.querySelector('.popup-container');
const btn = popup.querySelector('.action-btn')

btn.addEventListener('click', () => {
    
})



// const ws = new WebSocket('ws://localhost:3000');

// const chat = document.querySelector('.chat');
// const chatMessage = document.querySelector('.chat-message');
// const chatSend = document.querySelector('.chat-send');

// // const eventSource = new EventSource('http://localhost:3000/sse');

// // eventSource.addEventListener('open', (e) => {
// //     console.log(e);

// //     console.log('sse open');
// // });

// // eventSource.addEventListener('error', (e) => {
// //     console.log(e);

// //     console.log('sse error');
// // });

// // eventSource.addEventListener('message', (e) => {
// //     console.log(e);

// //     console.log('sse message');
// // });

// chatSend.addEventListener('click', (ev) => {
//     ev.preventDefault();
//     const message = chatMessage.value;

//     if(!message) return;
//     console.log(message);
//     ws.send(message);

//     chatMessage.value = '';
// })

// ws.addEventListener('open', (e) => {
//     console.log(e);

//     console.log('ws open');
// });

// ws.addEventListener('close', (e) => {
//     console.log(e);

//     console.log('ws close');
// });

// ws.addEventListener('error', (e) => {
//     console.log(e);

//     console.log('ws error');
// });

// ws.addEventListener('message', (e) => {
//     console.log(e);

//     const data = JSON.parse(e.data);
//     const { chat: messages } = data;
//     // console.log(messages[0]);

//     messages.forEach(message => {
//         chat.appendChild(document.createTextNode(message + '\n'))
//     })

//     console.log('ws message');
// });