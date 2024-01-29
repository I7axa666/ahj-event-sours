export default class ForEventSource {
  constructor() {
    this.eventSource = new EventSource('https://event-sours.onrender.com/sse');
    this.conectionId = null;
    this.userList = null;
    this.userName = null;
    this.init = this.init.bind(this);
    this.showUsers = this.showUsers.bind(this);
  }

  init() {
    // this.eventSource.addEventListener('open', (e) => {
    //     console.log('sse open');
    // });

    // this.eventSource.addEventListener('error', (e) => {
    //     console.log('sse error');
    // });

    this.eventSource.addEventListener('message', this.showUsers);
  }

  showUsers(e) {
    this.userList = JSON.parse(e.data);

    if (!this.userList.item) {
      this.conectionId = this.userList.conectionID;
      return;
    }

    if (this.userList.item.deleteId) {
      const deletedEl = document.getElementById(`${this.userList.item.deleteId}`);

      if (deletedEl) {
        deletedEl.remove();
      }
      return;
    }

    const ul = document.querySelector('ul');
    const li = document.createElement('li');
    li.id = this.userList.item.conectionID;

    this.userName = this.userList.item.chatName;

    li.innerHTML = `
            <div class="circle"></div>
            <div class="name">${this.userName}</div>
        `;

    ul.appendChild(li);

    document.querySelector('.popup-container').classList.add('hidden');

    document.querySelector('.btn-container').classList.remove('hidden');

    // console.log('sse message');
  }
}
