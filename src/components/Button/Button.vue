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
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classList() {
      return {
        [`wp-button--${this.type}`]: true,
        [`wp-button--${this.size}`]: Boolean(this.size),
        'is-round': this.round,
        'is-disabled': this.disabled
      };
    }
  },
  methods: {
    onClick() {
      if (this.disabled) return;
      this.$emit('click');
    }
  }
};
</script>

<style lang="scss" scoped>
$errorColor: #f56c6c;
$successColor: #67c23a;

.wp-button {
  padding: 12px 20px;
  border-radius: 4px;
  outline: none;
  cursor: pointer;

  &--default {
    background: #fff;
    border: 1px solid #dcdfe6;

    &:hover {
      background-color: rgb(236, 245, 266);
    }
    &:active {
      border: 1px solid blue;
    }
  }

  &--error {
    background-color: $errorColor;
    border-color: $errorColor;
    &:hover {
      background-color: lighten($errorColor, 5%);
    }
  }

  &--success {
    background-color: $successColor;
    border-color: $successColor;
    &:hover {
      background-color: lighten($successColor, 5%);
    }
  }

  &--medium {
    padding: 10px 20px;
    font-size: 14px;
    border-radius: 4px;
  }

  &--small {
    padding: 9px 15px;
    font-size: 12px;
    border-radius: 3px;
  }

  &--mini {
    padding: 7px 15px;
    font-size: 12px;
    border-radius: 3px;
  }
}
.is-round {
  border-radius: 20px;
}

.is-disabled {
  color: #c0c4cc;
  border-color: #ebeef5;
  cursor: not-allowed;
  &:hover {
    background-color: #fff;
  }

  &:active {
    border: 1px solid #ebeef5;
  }
}
</style>
