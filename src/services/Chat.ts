export default class Chat {

  private socket!: WebSocket;

  constructor(
    private url: string,
    private autoReconnectInterval: number = 1000,
  ) {
    this.open();
    this.subscribe();
  }

  public onmessage!: Function;
  public onopen!: Function;

  public send = (data: any) => {
    try {
      this.socket.send(JSON.stringify(data));
    } catch (e) {
      console.log(e);
    }
  }

  private open = () => {
    try {
      this.socket = new WebSocket(this.url);
    } catch (e) {
      console.log(e);
    }
  }

  private reopen = () => {
    setTimeout(
      () => {
        this.open();
        this.subscribe();
      },
      this.autoReconnectInterval,
    );
  }

  private subscribe = () => {
    this.socket.onopen = () => {
      try {
        this.onopen();
      } catch (e) {
        console.log(e);
      }
    };

    this.socket.onmessage = (event) => {
      try {
        this.onmessage(JSON.parse(event.data));
      } catch (e) {
        console.log(e);
      }
    };

    this.socket.onerror = (event) => {
      if (event.type === 'ECONNREFUSED') {
        this.reopen();
      }
    };

    this.socket.onclose = (event) => {
      if (event.code === 1000) {
        return;
      }

      this.reopen();
    };
  }
}
