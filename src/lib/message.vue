<template>
  <div>
    <div v-if="show">
      <span>{{title}}</span>
      {{message}}
    </div>
  </div>
</template>

<script>
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
      default: ''
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
