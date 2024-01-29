export default class Fetcher {
  constructor() {
      this.url = 'https://event-sours.onrender.com/';
    // this.url = 'http://localhost:3000/';
  }

  async sendUserName(id, name) {
    const body = JSON.stringify({
      conectionID: id,
      chatName: name,
    });

    await fetch(`${this.url}chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,

    });

    // const result = await request;
    // const text = await result.text();
    // console.log(text);
  }

  async getUsers() {
    const request = fetch(`${this.url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await request;
    const text = result.text();
    return text;
  }
}
