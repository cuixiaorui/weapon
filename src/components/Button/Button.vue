<template>
  <button class="wp-button" :class="classList">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'default'
    }
  },
  computed: {
    classList() {
      return {
        [`wp-button--${this.type}`]: true
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.wp-button {
  padding: 12px 20px;
  outline: none;
  cursor: pointer;

  &--default {
    background: #fff;
    border: 1px solid #dcdfe6;
  }

  &--error {
    background-color: #f56c6c;
    border-color: #f56c6c;
  }

  &--success {
    background-color: #67c23a;
    border-color: #67c23a;
  }
}
</style>
