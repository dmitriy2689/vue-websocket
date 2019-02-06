import ChatCommands from '@/dictionaries/ChatCommands';

export default interface ChatMessageType {
  type: ChatCommands,
  payload: any
};