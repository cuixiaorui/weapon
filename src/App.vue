<template>
  <div id="app">
    <button-demo></button-demo>
  </div>
</template>

<script>
import ButtonDemo from './show/button-demo.vue';
import "./components/Notification/index"

export default {
  name: 'app',
  components: {
    ButtonDemo
  }
};
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.demo-container{
  margin: 20px 0;
}
</style>
