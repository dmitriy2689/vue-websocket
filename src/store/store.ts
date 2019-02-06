import Vue from 'vue';
import Vuex from 'vuex';
import plugins from './plugins';
import MessageStatus from '@/dictionaries/MessageStatus';
import Mutations from '@/dictionaries/Mutations';
import Actions from '@/dictionaries/Actions';
import RootState from '@/types/RootStore';
import MessageType from '@/types/MessageType';
import ContactType from '@/types/ContactType';

Vue.use(Vuex);

export const mutations = {
  [Mutations.CHANGE_IS_INIT_LOADED](state: RootState, value: boolean) {
    state.isInitLoaded = value;
  },
  [Mutations.SELECT_BOT](state: RootState, id: string) {
    state.botId = id;
  },
  [Mutations.CREATE_MESSAGE](state: RootState, message: MessageType) {
    state.messages.push(message);
  },
  [Mutations.ADD_MESSAGE](state: RootState, message: MessageType) {
    state.messages.push(message);
  },
  [Mutations.ADD_MESSAGES](state: RootState, messages: MessageType[]) {
    state.messages = messages;
  },
  [Mutations.CHANGE_STATUS_MESSAGES](
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
    [Actions.selectBot]({ commit }, id: string) {
      commit(Mutations.SELECT_BOT, id);
    },
    [Actions.sendMessage]({ commit, state }, content) {
      const message: MessageType = {
        id: Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36),
        botId: state.botId,
        fromId: state.userId,
        status: MessageStatus.PENDING,
        date: new Date().toDateString(),
        content,
      };

      commit(Mutations.CREATE_MESSAGE, message);
    },
  },
  plugins,
});
