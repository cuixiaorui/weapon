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
    },
    size: {
      type: String,
      default: '',
    }
  },
  computed: {
    classList() {
      return {
        [`wp-button--${this.type}`]: true,
        [`wp-button--${this.size}`]: Boolean(this.size),
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

  &--medium{
    padding: 10px 20px;
    font-size: 14px;
    border-radius: 4px;
  }

  &--small{
    padding: 9px 15px;
    font-size: 12px;
    border-radius: 3px;
  }

  &--mini{
    padding: 7px 15px;
    font-size: 12px;
    border-radius: 3px;
  }
}
.is-round {
  border-radius: 20px;
}
</style>
