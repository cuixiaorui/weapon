<template>
  <button class="wp-button" :class="classList" @click="onClick">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'default'
    },
    round: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classList() {
      return {
        [`wp-button--${this.type}`]: true,
        'is-round': this.round
      };
    }
  },
  methods: {
    onClick() {
      this.$emit('click');
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
.is-round {
  border-radius: 20px;
}
</style>
