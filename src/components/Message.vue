<template>
  <div class="chat-message"
    v-bind:class="{ 'user-message': isUserMessage(message.fromId) }">

    <div class="chat-message-foto">
      <a href=""><img src="" alt=""></a>
    </div>

    <div class="chat-message-text">
      {{message.content}}
    </div>

    <div class="chat-message-time">
      {{message.date}}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import MessageType from '@/types/MessageType';

@Component({
  methods: {
    isUserMessage(id: string) {
      return this.$store.state.botId !== id;
    },
  },
})
export default class Message extends Vue {
  @Prop() private message!: MessageType;
}
</script>
