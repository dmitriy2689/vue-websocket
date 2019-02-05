import MessageStatus from '@/dictionaries/MessageStatus';

export default interface MessageType {
  id: string,
  botId: string,
  fromId: string,
  status: MessageStatus,
  date: string,
  content: string
}
