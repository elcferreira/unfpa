<template>
  <figure class="image-canvas" ref="figure" />
</template>

<script>
import imageCanvas from '~/assets/scripts/imageCanvas.js'
import { isMobile, getMobile } from '~/assets/scripts/utils/responsive.js'

export default {
  methods: {
    getMobile
  },
  props: {
    image: {
      default: () => ({ desktop: '', mobile: '' })
    }
  },
  mounted() {
    if (process.browser && window && !!this.image.desktop && !!this.image.mobile) {
      imageCanvas(this.$refs.figure, this.image)
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
