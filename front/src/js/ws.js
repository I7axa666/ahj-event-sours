export default class ForWebSocet {
    constructor(chat) {
        this.ws = new WebSocket('ws://localhost:3000/ws');
        this.chat = chat;        
    }

    init = () => {
        this.ws.addEventListener('open', (e) => {
            console.log('ws open');
        });
        
        this.ws.addEventListener('close', (e) => {
            console.log('ws close');
        });

        this.ws.addEventListener('error', (e) => {
            console.log('ws error');
        });
        
        this.ws.addEventListener('message', this.showMessage);
    }

    showMessage = (e) => {
        console.log(e);

        const data = JSON.parse(e.data);
        const { chat: messages } = data;
       
        messages.forEach(message => {

            this.chat.appendChild(this.createMessage(message));
        })

        // console.log('ws message');
    }

    sendMessage(msg) {
        this.ws.send(msg);
    }

    createMessage = (msg, sender="bot") => {
        const divMessage = document.createElement('div');
        divMessage.classList.add('message', 'participant-message');

        const srtong = document.createElement('strong');
        srtong.textContent = sender;
        const span = document.createElement('span');
        span.textContent = 'Date Now';
        const p = document.createElement('p');
        p.textContent = msg;
    
        divMessage.appendChild(srtong);
        divMessage.appendChild(span);
        divMessage.appendChild(p);

        return divMessage;
    }

}
