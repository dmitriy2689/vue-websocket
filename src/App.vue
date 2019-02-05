<template>
  <div id="app">
    <main class="main">
    <div class="container">
      <div class="row">
        <div class="col-9">
          <div class="chat-wrap">
            <BotMenu></BotMenu>
            <Chat></Chat>
          </div>
        </div>
        <div class="col-3" style="color: white;">
          <img src="https://static.wixstatic.com/media/803fd3_60fb86fb945a4b7bab2d88f9624fbac5~mv2.png/v1/fill/w_586,h_114,al_c,q_80,usm_0.66_1.00_0.01/803fd3_60fb86fb945a4b7bab2d88f9624fbac5~mv2.webp" alt="" style="width: 100%; padding: 5px">
        </div>
      </div>
    </div>
</main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BotMenu from '@/components/BotMenu.vue';
import Chat from '@/components/Chat.vue';

@Component({
  components: {
    BotMenu,
    Chat,
  },
})
export default class App extends Vue {}
</script>
