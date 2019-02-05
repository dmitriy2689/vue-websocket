const WebSocketServer = new require('ws');
const webSocketServer = new WebSocketServer.Server({
  port: 8081
});
const items = [
  'How is it going?', 'How\'s life?', 'What are you up to?', 'Good luck!', 'I believe so',
  'Very well', 'Deal!', 'It’s a great idea!', 'Not a very good idea', 'Don’t mention it!',
  'Things happen.', 'Hello'
];
const messages = [
  {
    id: '1',
    botId: '2',
    fromId: '2',
    status: 'SENT',
    date: new Date().toDateString(),
    content: 'Hello Dima'
  },
  {
    id: '2',
    botId: '2',
    fromId: '1',
    status: 'SENT',
    date: new Date().toDateString(),
    content: 'Hello bot!'
  },
];

webSocketServer.on('connection', (ws) => {
  ws.on('message', (request) => {
    const data = JSON.parse(request);

    if (data.type === 'GET_ALL_MESSAGES') {
      ws.send(JSON.stringify({
        type: 'ALL_MESSAGES',
        payload: messages
      }));
    }

    if (data.type === 'CREATE_MESSAGES') {
      data.payload.forEach(m => m.status = 'SENT');
      messages.concat(data.payload);

      ws.send(JSON.stringify({
        type: 'SENT',
        payload: { ids: data.payload.map(m => m.id) }
      }));

      data.payload.forEach((message) => {
        sendMessage(message);
      });
    }

    if (data.type === 'CREATE_MESSAGE') {
      data.payload.status = 'SENT';

      messages.push(data.payload);

      ws.send(JSON.stringify({
        type: 'SENT',
        payload: { ids: [data.payload.id] }
      }));

      sendMessage(data.payload);
    }
  });

  function sendMessage(message) {
    setTimeout(() => {
      const newMessage = {
        id: Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36),
        botId: message.botId,
        fromId: message.botId,
        status: 'NEW',
        date: new Date().toDateString(),
        content: items[Math.floor(Math.random()*items.length)]
      };

      messages.push(newMessage);

      ws.send(JSON.stringify({
        type: 'NEW_MESSAGE',
        payload: newMessage
      }));
    }, 2000);
  }

  ws.on('close', () => {
    ws = null;
  });
});

