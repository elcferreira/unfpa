<template>
  <transition name="liberia-head" :duration="1500" appear>
    <section class="liberia-head">
      <ImageCanvas class="liberia-head__figure"  :image="imageIntro" />
      <aside class="liberia-head__aside js-rellax">
        <IconLiberia />
        <h1 class="liberia-head__title">Liberia</h1>
      </aside>
      <IconArrow class="js-rellax" data-rellax-speed="-3" />
    </section>
  </transition>
</template>


<script>
import ImageCanvas from '~/components/ImageCanvas/index.vue'
import IconLiberia from '~/assets/images/icons/icon-liberia.svg'
import IconArrow from '~/assets/images/icons/icon-arrow.svg'

export default {
  components: { ImageCanvas, IconLiberia, IconArrow },
  data() {
    return {
      imageIntro: {
        desktop: require('~/assets/images/liberia/liberia-head.jpg'),
        mobile: require('~/assets/images/liberia/mobile/liberia-head.jpg'),
      }
    }
  }
}
</script>

<style lang="sass">
.liberia-head
  $root: &
  width: 100%
  height: 90vh
  position: relative
  display: flex
  align-items: center
  justify-content: center
  overflow: hidden
  @media(min-width: 48em)
    height: 85vh

  .icon-arrow
    position: absolute
    left: 50%
    bottom: 30px
    transform: translate(-50%, 0)
    @media(min-width: 48em)
      bottom: 64px

  &__aside
    position: relative
    text-align: center

  &__title
    color: white
    font-size: 70px
    position: relative
    padding-top: 20px
    font-weight: 600
    @media(min-width: 48em)
      font-size: 8.5vw
      margin-bottom: 30px
    &:before
      content: ''
      width: 100%
      height: .09em
      background-color: white
      position: absolute
      bottom: 2px

  &-enter
    opacity: 0
    &-to
      opacity: 1
      transition: opacity getDuration(2) $ease
      will-change: opacity
      backface-visibility: hidden

  &-leave
    &-active
    &-to

</style>
