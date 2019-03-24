<template>
  <transition name="liberia-head" :duration="15000" appear>
    <section class="liberia-head">
      <ImageCanvas class="liberia-head__figure luxy-el"  data-speed-y="8" :image="imageIntro" />
      <aside class="liberia-head__aside luxy-el"  data-speed-y="10" data-offset="0">
        <IconLiberia />
        <h1 class="liberia-head__title">Liberia</h1>
      </aside>
      <IconArrow  tabindex="0" @click="scrollToHistory"  />
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
  },
  methods: {
    scrollToHistory() {
      window.scrollbar.scrollIntoView(document.querySelector('#history', { duration: 1000 }))
    }
  }
}
</script>

<style lang="sass">
.liberia-head
  $root: &
  width: 100%
  height: 100vh
  position: relative
  display: flex
  align-items: center
  justify-content: center
  overflow: hidden

  .icon-liberia
    transition: getDuration(1) $ease
    &:hover, &:focus
      transform: scale(1.2)

  .icon-arrow
    position: absolute
    left: 50%
    bottom: 30px
    transform: translate(-50%, 0)
    cursor: pointer
    animation: arrowHover 3s $ease 0s infinite
    z-index: 3
    @media(min-width: 48em)
      bottom: 64px

  &__aside
    position: relative
    text-align: center
    z-index: 3

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
    &-active
      overflow: hidden
      &:before
        content: ''
        width: 100%
        height: 100%
        position: absolute
        top: 0
        left: 0
        background-color: white
        transform: translateY(0)
        z-index: 10
      #{$root}
        &__title
          transform: translateY(50px)
          opacity: 0
    &-to
      &:before
        transform: translateY(100%)
        transition: getDuration(4) $ease
      #{$root}
        &__title
          transform: translateY(0px)
          opacity: 1
        transition: getDuration(2) $ease .7s

  &-leave
    &-active
    &-to

@keyframes arrowHover
  0%, 100%
    transform: translate(-50%, -60px)
    opacity: 0
  20%, 79%
    transform: translate(-50%, 0px)
    opacity: 1
  99%
    opacity: 0
    transform: translate(-50%, 30px)

</style>
