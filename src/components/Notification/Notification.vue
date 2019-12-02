<template>
  <div class="wp-notification">
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
    }
  },
  methods: {
    onCloseHandler() {
        this.onClose();
    }
  }
};
</script>
