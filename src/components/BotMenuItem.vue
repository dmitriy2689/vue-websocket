<template>
  <div class="contact-user"
    v-bind:class="{ active: isActive }"
    v-on:click="selectBot($event)">

    <div class="contact-user-foto">
      <a href=""><img src="" alt=""></a>
    </div>

    <div class="contact-user-info">
      <div class="contact-user-top">
        <a href="" class="contact-user-name">
          {{bot.name}}
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Actions from '@/dictionaries/Actions';
import ContactType from '@/types/ContactType';

@Component({
  computed: {
    isActive() {
      return this.$props.bot.id === this.$store.state.botId;
    },
  },
})
export default class BotMenuItem extends Vue {
  @Prop() private bot!: ContactType;

  selectBot($event: any) {
    this.$store.dispatch(Actions.selectBot, this.bot.id);

    $event.preventDefault();
  }
}
</script>
