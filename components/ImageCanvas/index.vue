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
      if (window.innerHeight + 300 > this.$refs.figure.getBoundingClientRect().top && !this.started) {
        if (process.browser && window && !!this.image.desktop && !!this.image.mobile) {
          this.started = true
          window.removeEventListener('scroll', this.activeCanvas, false)
          imageCanvas(this.$refs.figure, this.image)
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
      // window.scrollbar.addListener(this.activeCanvas)
      // window.addEventListener('scroll', this.activeCanvas, false)
    }
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
  background-color: black
  z-index: 0
</style>
