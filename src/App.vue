<template>
  <div id="app-content">
    <ShipInventory />
    <FieldMap />
  </div>
  
</template>
import ShipInventory from './components/ShipInventory.vue';

<script lang="ts">
import { defineComponent } from 'vue';
import FieldMap from './components/FieldMap.vue';
import ShipInventory from './components/ShipInventory.vue';

export default defineComponent({
  name: 'App',
  components: {
    FieldMap,
    ShipInventory
}
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
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
</style>
