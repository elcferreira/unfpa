<template>
  <div class="liberia-video">
    <div class="liberia-video__container">
      <transition name="liberia-video">
        <div v-if="!showVideo" >
          <ImageCanvas :image="imageVideo" />
          <IconPlay @click="startVideo" />
        </div>
        <iframe v-else width="560" height="315" src="https://www.youtube.com/embed/FgMv9j13oIE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </transition>
    </div>
  </div>
</template>

<script>
import ImageCanvas from '~/components/ImageCanvas/index.vue'
import IconPlay from '~/assets/images/icons/icon-play.svg'

export default {
  components: { ImageCanvas, IconPlay },
  data() {
    return {
      showVideo: false,
      imageVideo: {
        desktop: require('~/assets/images/liberia/liberia-video.jpg'),
        mobile: require('~/assets/images/liberia/mobile/liberia-video.jpg')
      }
    }
  },
  methods: {
    startVideo() {
      this.showVideo = true
    }
  }
}
</script>

<style lang="sass">
.liberia-video
  padding: 0 5% 40px
  @media(min-width: 48em)
    padding: 0 40px 200px
    max-width: 1283px
    margin: 0 auto

  &__container
    position: relative
    padding-bottom: 56.25%
    padding-top: 25px
    height: 0
    background-color: black
    overflow: hidden

  iframe
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%

  .icon-play
    position: absolute
    top: 50%
    left: 50%
    z-index: 2
    cursor: pointer
    transform: translate3d(-50%, -50%, 0)

  &-enter
    &-active
      opacity: 0
    &-to
      opacity: 1
      transition: opacity getDuration(1) $ease

  &-leave
    &-active
      opacity: 1
    &-to
      opacity: 0
      transition: opacity getDuration(1) $ease

</style>
