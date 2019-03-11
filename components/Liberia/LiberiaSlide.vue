<template>
  <div class="liberia-slide">
    <figure class="liberia-slide__container "  ref="slide" />
    <button type="button" class="liberia-slide__next" @click="nextSlide">
      <span class="liberia-slide__text">Next image</span>
    </button>
  </div>
</template>

<script>
import slide from '~/assets/scripts/slide.js'

export default {
  data() {
    return {
      images: {
        desktop: [
          require('~/assets/images/liberia/liberia-slide-1.jpg'),
          require('~/assets/images/liberia/liberia-slide-2.jpg'),
          require('~/assets/images/liberia/liberia-slide-3.jpg')
        ],
        mobile: [
          require('~/assets/images/liberia/mobile/liberia-slide-1.jpg'),
          require('~/assets/images/liberia/mobile/liberia-slide-2.jpg'),
          require('~/assets/images/liberia/mobile/liberia-slide-3.jpg')
        ]
      },
      nextSlide: () => null
    }
  },
  mounted() {
    if (process.browser && window) {
      const { nextSlide } = slide(this.$refs.slide, this.images)
      this.nextSlide = nextSlide
    }
  }
}
</script>

<style lang="sass">
.liberia-slide
  position: relative

  &__container
    width: 80%
    height: 52vw
    background-color: black
    position: relative
    @media(min-width: 48em)
      width: calc(50% + 206px)
      height: 48vw

  &__next
    position: absolute
    left: 17%
    bottom: 40px
    font-family: $font-title
    appearance: none
    border: 0
    border-radius: 0
    background-color: transparent
    padding: 70px 10px 10px
    cursor: pointer

    &:before, &:after
      content: ''
      width: 30px
      height: 1px
      top: 30%
      left: 50%
      background-color: white
      position: absolute
      transition: getDuration(1) $ease
    &:before
      transform: translate(-65%, -13px) rotate(45deg)
    &:after
      transform: translate(-65%, 8px) rotate(-45deg)

    &:hover
      &:before
        transform: translate(-50%, -11px) rotate(36deg)
      &:after
        transform: translate(-50%, 5px) rotate(-36deg)

  &__text
    font-weight: 600
    font-size: 18px
    color: white
    @media(min-width: 48em)
      font-size: 24px
</style>
