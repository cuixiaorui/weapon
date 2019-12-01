<template>
  <div id="app">
    <div>
      <div class="button-container">
        <Button @click="onclick">你好</Button>
        <Button round>圆形</Button>
        <Button type="success">成功</Button>
        <Button type="error">错误</Button>
        <Button disabled>禁用</Button>
        <Button round size="medium">圆形</Button>
        <Button round size="small">圆形</Button>
        <Button round size="mini">圆形</Button>
      </div>
    </div>
  </div>
</template>

<script>
import Button from './components/Button/Button.vue';

export default {
  name: 'app',
  components: {
    Button
  },
  methods: {
    onclick() {
      console.log('click');
    }
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
</style>
