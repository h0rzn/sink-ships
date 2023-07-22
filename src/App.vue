<template>
  <div id="app-content">
    <ShipGame v-if="devBtnClicked"/>
    <HomeScreen v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ShipGame from './components/ShipGame.vue';
import HomeScreen from './components/HomeScreen.vue';

export default defineComponent({
  name: 'App',
  components: {
    ShipGame,
    HomeScreen
  },
  data() {
      return {
        devBtnClicked: false,
      }
  },
});
</script>

<style>
html, body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  background-color: #242424;
}

#app-content {
  width: 100%;
  height: 100vh;
}
</style>
