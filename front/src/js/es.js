import v4 from 'uuid';

export default class ForEventSource {
    constructor() {
        this.eventSource = new EventSource('http://localhost:3000/sse');
        this.conectionId = null;  
        
    }

    init = () => {
        // this.eventSource.addEventListener('open', (e) => {
        //     console.log('sse open');
        // });
        
        // this.eventSource.addEventListener('error', (e) => {
        //     console.log('sse error');
        // });
        
        this.eventSource.addEventListener('message', this.showUsers);
    }

    showUsers = (e) => {        
        const userList = JSON.parse(e.data);
        // console.log(userList);
        
        if(!userList.item) {
            this.conectionId = userList.conectionID
            // console.log(this.conectionId);
            return;
        };

        if(userList.item.deleteId) {
            const deletedEl = document.getElementById(`${userList.item.deleteId}`);

            if(deletedEl) {
                deletedEl.remove();
            }
            return;
        }
        

        const ul = document.querySelector('ul');
        const li = document.createElement('li');
        li.id = userList.item['conectionID'];
             
        li.innerHTML = `
            <div class="circle"></div>
            <div class="name">${userList.item['chatName']}</div>
        `
            

        ul.appendChild(li);

        document.querySelector('.popup-container').classList.add('hidden');
        
        document.querySelector('.btn-container').classList.remove('hidden');

        // console.log('sse message');
    }
    
}