import { Store } from 'vuex';
import Chat from '@/services/Chat';
import RootStore from '@/types/RootStore';
import ChatMessageType from '@/types/ChatMessageType';
import MessageStatus from '@/dictionaries/MessageStatus';
import ChatCommands from '@/dictionaries/ChatCommands';
import Mutations from '@/dictionaries/Mutations';

const localStoragePlugin = (store: Store<RootStore>) => {
  const cacheMessages = localStorage.getItem('CHAT');

  if (cacheMessages != null) {
    store.commit(Mutations.ADD_MESSAGES, JSON.parse(cacheMessages));
  }

  store.subscribe((mutation, { messages }) => {
    localStorage.setItem('CHAT', JSON.stringify(messages));
  });
};

const socketPlugin = (store: Store<RootStore>) => {
  const chat = new Chat('ws://localhost:8081');

  chat.onopen = () => {
    const pendingData = store.getters.pandingMessages();
    const { isInitLoaded } = store.state;

    if (!isInitLoaded) {
      chat.send({
        type: ChatCommands.GET_ALL_MESSAGES,
        payload: pendingData
      });
    }

    if (pendingData.length !== 0 && isInitLoaded) {
      chat.send({
        type: ChatCommands.CREATE_MESSAGES,
        payload: pendingData,
      });
    }
  }

  chat.onmessage = (res: ChatMessageType) => {
    if (res.type === ChatCommands.NEW_MESSAGE) {
      store.commit(Mutations.ADD_MESSAGE, res.payload);
    }

    if (res.type === ChatCommands.ALL_MESSAGES) {
      store.commit(Mutations.ADD_MESSAGES, res.payload);
      store.commit(Mutations.CHANGE_IS_INIT_LOADED, true);
    }

    if (res.type === ChatCommands.SENT) {
      store.commit(Mutations.CHANGE_STATUS_MESSAGES, {
        ...res.payload,
        messages: store.getters.pandingMessages(),
        status: MessageStatus.SENT,
      });
    }
  };

  store.subscribe((mutation) => {
    if (mutation.type === Mutations.CREATE_MESSAGE) {
      chat.send({
        type: ChatCommands.CREATE_MESSAGE,
        payload: mutation.payload
      });
    }
  });
};

export default [
  localStoragePlugin,
  socketPlugin,
];
