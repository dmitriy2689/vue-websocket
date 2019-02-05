export default class Chat {
  private socket!: WebSocket;

  private isInitLoaded = false;

  constructor(
    private url: string,
    private pendingData: Function,
    private autoReconnectInterval: number = 1000,
  ) {
    this.open();
    this.subscribe();
  }

  public onmessage!: Function;

  public send = (data: any) => {
    try {
      this.socket.send(JSON.stringify({
        type: 'CREATE_MESSAGE',
        payload: data,
      }));
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
        const pendingData = this.pendingData();

        if (!this.isInitLoaded) {
          this.socket.send(JSON.stringify({
            type: 'GET_ALL_MESSAGES',
          }));
        }

        if (pendingData.length !== 0) {
          this.socket.send(JSON.stringify({
            type: 'CREATE_MESSAGES',
            payload: this.pendingData(),
          }));
        }
      } catch (e) {
        console.log(e);
      }
    };

    this.socket.onmessage = (event) => {
      const response = JSON.parse(event.data);

      if (response.type === 'ALL_MESSAGES') {
        this.isInitLoaded = true;
      }

      this.onmessage(response);
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
