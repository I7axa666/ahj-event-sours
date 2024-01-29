export default class Fetcher {
    constructor() {
    //   this.url = 'https://ahj-http-back.onrender.com/';
      this.url = 'http://localhost:3000/';
    }
   
    async sendUserName(id, name) {
      const body =  JSON.stringify({
        conectionID: id,
        chatName: name,
      });

      const request = await fetch(`${this.url}chat`, {
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
        const request = await fetch(`${this.url}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
          },            
        });
      
        const result = await request.text();
        //   console.log(result);
        return result
          
    };
}