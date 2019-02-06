import { mutations, getters } from '@/store/store';
import MessageStatus from '@/dictionaries/MessageStatus';

describe('Store', () => {
  describe('Mutations', () => {
    it('SELECT_BOT should change botId', () => {
      const state = {
        isInitLoaded: false,
        userId: '1',
        botId: '2',
        contacts: [],
        messages: []
      };
      mutations.SELECT_BOT(state, '3');
      expect(state.botId).toBe('3');
    });

    it('CREATE_MESSAGE should add new message', () => {
      const state = {
        isInitLoaded: false,
        userId: '1',
        botId: '2',
        contacts: [],
        messages: []
      };
      const message = {
        id: '1',
        botId: state.botId,
        fromId: state.userId,
        status: MessageStatus.PENDING,
        date: new Date().toDateString(),
        content: 'Hello',
      }
      expect(state.messages.length).toBe(0);
      mutations.ADD_MESSAGE(state, message);
      expect(state.messages.length).toBe(1);
    });

    it('ADD_MESSAGES should add new messages', () => {
      const state = {
        isInitLoaded: false,
        userId: '1',
        botId: '2',
        contacts: [],
        messages: []
      };
      const message = {
        id: '1',
        botId: state.botId,
        fromId: state.userId,
        status: MessageStatus.PENDING,
        date: new Date().toDateString(),
        content: 'Hello',
      }
      expect(state.messages.length).toBe(0);
      mutations.ADD_MESSAGES(state, [message]);
      expect(state.messages.length).toBe(1);
    });

    it('CHANGE_STATUS_MESSAGES should change status to "SEND"', () => {
      const messages = [{
        id: '1',
        botId: '2',
        fromId: '1',
        status: MessageStatus.PENDING,
        date: '01.02.2019',
        content: 'Hello'
      }];
      mutations.CHANGE_STATUS_MESSAGES(null, {
        ids: ['1'],
        messages,
        status: MessageStatus.SENT
      });
      expect(messages[0].status).toBe(MessageStatus.SENT);
    });
  });

  describe('Getters', () => {
    it('contacts should return contacts without current user', () => {
      const state = {
        isInitLoaded: false,
        userId: '1',
        botId: '2',
        contacts: [{ id: '1', name: 'Dima'}, { id: '2', name: 'Bot1' }],
        messages: []
      };
      const result = getters.contacts(state);
      expect(result.length).toBe(1);
      expect(result[0].id).toBe('2');
      expect(result[0].name).toBe('Bot1');
    });

    it('currentChat should return messages from current bot', () => {
      const state = {
        isInitLoaded: false,
        userId: '1',
        botId: '2',
        contacts: [{ id: '1', name: 'Dima'}, { id: '2', name: 'Bot1' }],
        messages: [
          {
            id: '1',
            botId: '2',
            fromId: '2',
            status: MessageStatus.SENT,
            date: '01.03.2019',
            content: 'Hello Dima'
          },
          {
            id: '1',
            botId: '3',
            fromId: '3',
            status: MessageStatus.SENT,
            date: '01.03.2019',
            content: 'Hello Dima'
          }
        ]
      };
      let result = getters.currentChat(state);
      expect(result.length).toBe(1);
      expect(result[0].botId).toBe('2');
      state.botId = '3';
      result = getters.currentChat(state);
      expect(result.length).toBe(1);
      expect(result[0].botId).toBe('3');
    });

    it('pandingMessages should return pending messages', () => {
      const state = {
        isInitLoaded: false,
        userId: '1',
        botId: '2',
        contacts: [{ id: '1', name: 'Dima'}, { id: '2', name: 'Bot1' }],
        messages: [
          {
            id: '1',
            botId: '2',
            fromId: '2',
            status: MessageStatus.PENDING,
            date: '01.03.2019',
            content: 'Hello Dima'
          },
          {
            id: '1',
            botId: '3',
            fromId: '3',
            status: MessageStatus.SENT,
            date: '01.03.2019',
            content: 'Hello Dima'
          }
        ]
      };
      let result = getters.pandingMessages(state)();
      expect(result.length).toBe(1);
      expect(result[0].status).toBe(MessageStatus.PENDING);
    });
  });
});