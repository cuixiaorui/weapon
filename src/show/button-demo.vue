<template>
    <div class="demo-container">
        <Button @click="onclick">你好</Button>
        <Button round>圆形</Button>
        <Button type="success">成功</Button>
        <Button type="error">错误</Button>
        <Button disabled>禁用</Button>
        <Button round size="medium">圆形</Button>
        <Button round size="small">圆形</Button>
        <Button round size="mini">圆形</Button>
    </div>
</template>
<script>
import Button from '../components/Button/Button.vue';
export default {
  components: {
    Button
  },
  methods: {
    onclick() {
      console.log('click');
    }
  }
}
</script>
