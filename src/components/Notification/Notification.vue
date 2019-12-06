<template>
  <div class="wp-notification" @click="onClickHandler">
    <div class="wp-notification__title">
      {{ title }}
    </div>

    <div class="wp-notification__message">
      {{ message }}
    </div>

    <button
      v-if="showClose"
      class="wp-notification__close-button"
      @click="onCloseHandler"
    ></button>
  </div>
</template>
<script>
export default {
  props: {
    duration: {
      type:Number,
      default: 4.5
    },
    title: {
      type: String,
      default: ''
    },
    message: {
      type: String,
      default: ''
    },
    showClose: {
      type: Boolean,
      default: true
    },
    onClose: {
      type: Function,
      default: () => {}
    },
    onClick: {
      type: Function,
      default: () => {}
    }
  },
  methods: {
    onCloseHandler() {
      this.onClose();
    },

    onClickHandler() {
      this.onClick();
    }
  }
};
</script>

<style lang="scss" scoped>
.wp-notification {
  position: fixed;
  right: 10px;
  top: 50px;
  width: 330px;
  padding: 14px 26px 14px 13px;
  border-radius: 8px;
  border: 1px solid #ebeef5;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;
}
</style>
