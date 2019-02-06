import Vue from 'vue';
import Vuex from 'vuex';
import plugins from './plugins';
import MessageStatus from '@/dictionaries/MessageStatus';
import RootState from '@/types/RootStore';
import MessageType from '@/types/MessageType';
import ContactType from '@/types/ContactType';

Vue.use(Vuex);

export const mutations = {
  CHANGE_IS_INIT_LOADED(state: RootState, value: boolean) {
    state.isInitLoaded = value;
  },
  SELECT_BOT(state: RootState, id: string) {
    state.botId = id;
  },
  CREATE_MESSAGE(state: RootState, message: MessageType) {
    state.messages.push(message);
  },
  ADD_MESSAGE(state: RootState, message: MessageType) {
    state.messages.push(message);
  },
  ADD_MESSAGES(state: RootState, messages: MessageType[]) {
    state.messages = messages;
  },
  CHANGE_STATUS_MESSAGES(
    state: RootState | null,
    payload: { messages: MessageType[], ids: string[], status: MessageStatus },
  ) {
    payload.messages
      .filter(m => payload.ids.includes(m.id))
      .forEach((m) => {
        m.status = payload.status;
      });
  }
};

export const getters = {
  contacts: (state: RootState): ContactType[] => {
    return state.contacts.filter(c => c.id !== state.userId)
  },
  currentChat: (state: RootState): MessageType[] => {
    return state.messages.filter(m => m.botId === state.botId).reverse()
  },
  pandingMessages: (state: RootState) => (): MessageType[] => {
    return state.messages.filter(m => m.status === MessageStatus.PENDING)
  }
};

export default new Vuex.Store({
  state: {
    isInitLoaded: false,
    userId: '1',
    botId: '2',
    contacts: [
      {
        id: '1',
        name: 'Dima',
      },
      {
        id: '2',
        name: 'Bot1',
      },
      {
        id: '3',
        name: 'Bot2',
      },
    ],
    messages: [],
  },
  getters,
  mutations,
  actions: {
    selectBot({ commit }, id: string) {
      commit('SELECT_BOT', id);
    },
    sendMessage({ commit, state }, content) {
      const message: MessageType = {
        id: Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36),
        botId: state.botId,
        fromId: state.userId,
        status: MessageStatus.PENDING,
        date: new Date().toDateString(),
        content,
      };

      commit('CREATE_MESSAGE', message);
    },
  },
  plugins,
});
