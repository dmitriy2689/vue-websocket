<template>
  <div class="contacts-wrap">
    <div class="contact">
      <BotMenuItem
        v-for="bot in $store.getters.contacts"
        v-bind:key="bot.id"
        v-bind:bot="bot"
      ></BotMenuItem>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import BotMenuItem from './BotMenuItem.vue';

@Component({
  components: {
    BotMenuItem,
  },
})
export default class BotMenu extends Vue {}
</script>
