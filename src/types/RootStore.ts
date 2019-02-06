import MessageType from './MessageType';
import ContactType from './ContactType';

export default interface RootState {
  isInitLoaded: boolean,
  userId: string,
  botId: string,
  contacts: ContactType[],
  messages: MessageType[]
};
