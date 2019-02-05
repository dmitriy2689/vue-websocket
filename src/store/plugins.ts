import { Store } from 'vuex';
import RootStore from '@/types/RootStore';
import Chat from '@/services/Chat';
import MessageStatus from '@/dictionaries/MessageStatus';

const localStoragePlugin = (store: Store<RootStore>) => {
  const cacheMessages = localStorage.getItem('CHAT');

  if (cacheMessages != null) {
    store.commit('ADD_MESSAGES', JSON.parse(cacheMessages));
  }

  store.subscribe((mutation, { messages }) => {
    localStorage.setItem('CHAT', JSON.stringify(messages));
  });
};

const socketPlugin = (store: Store<RootStore>) => {
  const chat = new Chat(
    'ws://localhost:8081',
    store.getters.pandingMessages,
  );

  chat.onmessage = (res: any) => {
    if (res.type === 'NEW_MESSAGE') {
      store.commit('ADD_MESSAGE', res.payload);
    }

    if (res.type === 'ALL_MESSAGES') {
      store.commit('ADD_MESSAGES', res.payload);
    }

    if (res.type === 'SENT') {
      store.commit('CHANGE_STATUS_MESSAGES', {
        ...res.payload,
        messages: store.getters.pandingMessages(),
        status: MessageStatus.SENT,
      });
    }
  };

  store.subscribe((mutation) => {
    if (mutation.type === 'CREATE_MESSAGE') {
      chat.send(mutation.payload);
    }
  });
};

export default [
  localStoragePlugin,
  socketPlugin,
];
