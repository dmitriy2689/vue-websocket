<template>
  <div class="chat-block">
    <div class="blocked-wrap">
      <div style="position: relative">
        <div class="chat">
          <Message
            v-for="message in this.$store.getters.currentChat"
            v-bind:key="message.id"
            v-bind:message="message">
          </Message>
        </div>
      </div>

      <div class="chat-form">
        <form action="">
          <div class="textarea-wrap">
            <textarea placeholder="Text"
              v-model="content"
              v-on:keyup.enter="sendMessage">
            </textarea>
          </div>

          <div class="textarea-count-wrap">
            <div class="checkbox-wrap">
              Press Enter to send
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Message from './Message.vue';

@Component({
  components: {
    Message,
  },
})
export default class Chat extends Vue {
  content = '';

  sendMessage() {
    this.$store.dispatch('sendMessage', this.content)
      .catch(() => {
        console.log('Error');
      });
    this.content = '';
  }
}
</script>
