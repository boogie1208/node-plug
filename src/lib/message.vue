<template>
  <div>
    <div v-if="show" :style="{'border': '1px solid #ccc'}">
      <span>{{type}}</span>
      <div>{{message}}</div>
    </div>
  </div>
</template>

<script>
const typeMap = {
  success: 'success',
  info: 'info',
  warning: 'warning',
  error: 'error'
};
export default {
  props: {
    message: {
      type: String,
      default: ''
    },
    position: {
      type: String,
      default: 'top'
    },
    type: {
      type: String,
      default: 'info'
    },
    title: {
      type: String,
      default: '提示'
    },
    clostTime: {
      type: Number,
      default: 3000
    },
    autoClose: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      show: false
    }
  },
  mounted() {
    this.show = true
    this.close()
  },
  methods: {
    close () {
      if (this.autoClose) {
        setTimeOut(() => {
          this.show = false
        }, this.clostTime)
      }
    }
  },
}
</script>

<style lang="scss">
</style>
