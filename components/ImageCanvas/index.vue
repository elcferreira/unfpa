<template>
  <figure class="image-canvas" ref="figure" />
</template>

<script>
import imageCanvas from '~/assets/scripts/imageCanvas.js'
import { isMobile, getMobile } from '~/assets/scripts/utils/responsive.js'

export default {
  data() {
    return {
      started: false
    }
  },
  methods: {
    getMobile,
    activeCanvas() {
      if (this.$refs.figure) {
        if (!this.started && window.innerHeight + 300 > this.$refs.figure.getBoundingClientRect().top ) {
          if (process.browser && window && !!this.image.desktop && !!this.image.mobile) {
            this.started = true
            window.removeEventListener('scroll', this.activeCanvas, false)
            imageCanvas(this.$refs.figure, this.image)
          }
        }
      }
    }
  },
  props: {
    image: {
      default: () => ({ desktop: '', mobile: '' })
    }
  },
  mounted() {
    if (process.browser) {
      this.activeCanvas()
      this.$root.$on('scrollbar', this.activeCanvas)
    }
  },
  destroyed() {
    this.$root.$off('scrollbar', this.activeCanvas)
  }
}
</script>

<style lang="sass">
.image-canvas
  width: 100%
  height: 100%
  position: absolute
  top: 0
  left: 0
  background-size: cover
  background-position: center center
  background-color: white
  z-index: 0
</style>
