<template>
  <transition name="liberia-history" :duration="1500" appear>
    <section class="liberia-history" >
      <div class="liberia-history__row">
        <aside class="liberia-history__aside" >
          <div
            v-observe-visibility="{callback: status => wrapperVisible = status, once: true, intersection: { threshold: 0.5 }}"
            class="liberia-history__wrapper"
            :class="{'liberia-history__wrapper--show': wrapperVisible}">
            <h2 class="liberia-history__title-2 animation-y-reset" >I can work to<br> save my people.</h2>
            <span class="liberia-history__description animation-y-reset" >Yamah, a midwife and supervisor of a maternal health clinic</span>
          </div>
        </aside>
        <ImageCanvas
          class="liberia-history__image-one animation-image"
          id="history"
          :image="imageOne"
          :class="{'animation-image--show': imageOneVisible}"
          v-observe-visibility="{callback: status => imageOneVisible = status, once: true, intersection: { threshold: 0.8 }}"
          />
      </div>
      <div class="liberia-history__full" >
        <div class="liberia-history__full-line " />
        <ImageCanvas
          class="liberia-history__full-image animation-image"
          :image="imageTwo"
          :class="{'animation-image--show': imageFullVisible}"
          v-observe-visibility="{callback: status => imageFullVisible = status, once: true, intersection: { threshold: 0.8 }}"
          />
        <h2 class="liberia-history__title-3 luxy-el" data-speed-y="-4" data-offset="180">Yamah risked her own life to deliver babies during the Ebola outbreak.</h2>
      </div>
      <div class="liberia-history__slide">
        <h2 class="liberia-history__title-3 luxy-el" data-speed-y="-4" data-offset="200">The epidemic devastated Liberia’s fragile healthcare system. Maternal deaths surged. But <span class="liberia-history__title-3--rose">even here</span>, midwives like Yamah persevered in tending to mothers and their newborns.</h2>
        <LiberiaSlide
          class="animation-image"
          :class="{'animation-image--show': slideVisible}"
          v-observe-visibility="{callback: status => slideVisible = status, once: true, intersection: { threshold: 0.5 }}"
        />
      </div>
      <LiberiaVideo
        class="liberia-history__video animation-image"
        :class="{'animation-image--show': videoVisible}"
        v-observe-visibility="{callback: status => videoVisible = status, once: true, intersection: { threshold: 0.3 }}"
      />
    </section>
  </transition>
</template>

<script>
import ImageCanvas from '~/components/ImageCanvas/index.vue'
import LiberiaSlide from '~/components/Liberia/LiberiaSlide.vue'
import LiberiaVideo from '~/components/Liberia/LiberiaVideo.vue'

export default {
  components: { ImageCanvas, LiberiaVideo, LiberiaSlide },
  data() {
    return {
      wrapperVisible: false,
      imageOneVisible: false,
      imageFullVisible: false,
      slideVisible: false,
      videoVisible: false,
      imageOne: {
        desktop: require('~/assets/images/liberia/liberia-i-can-work.jpg'),
        mobile: require('~/assets/images/liberia/mobile/liberia-i-can-work.jpg')
      },
      imageTwo: {
        desktop: require('~/assets/images/liberia/liberia-yamah-risked.jpg'),
        mobile: require('~/assets/images/liberia/mobile/liberia-yamah-risked.jpg')
      }
    }
  },
  methods: {
    visibilityChanged(isVisible, entry) {
      console.log(isVisible, entry)
    }
  }
}
</script>

<style lang="sass">
$delay: .32s

.liberia-history
  $root: &
  &__row
    position: relative
    padding: 80px 20px 600px
    @media(min-width: 48em)
      padding: 624px 40px 534px


  &__image-one
    width: 80%
    height: 250px
    position: absolute
    top: auto
    bottom: 250px
    right: 0
    left: auto
    overflow: hidden
    @media(min-width: 48em)
      height: 740px
      width: calc(50% + 255px)
      bottom: auto
      top: 50%
      transform: translateY(-50%)


    &--show
      &:before


  &__aside
    position: relative
    z-index: 1
    @media(min-width: 48em)
      max-width: 1260px
      width: 100%
      margin: 0 auto

  &__full
    width: 100%
    position: relative
    padding: 30vh 0
    @media(min-width: 48em)
      padding: 330px 0

    &-line
      z-index: 3
      position: absolute
      top: 0
      left: 50%
      &:before, &:after
        content: ''
        position: absolute
        z-index: 2
      &:before
        width: 1px
        height: 300px
        background-color: $color-rose
        left: 50%
        top: -243px
        @media(min-width: 48em)
          height: 540px
          top: -295px
      &:after
        border: 1px solid $color-rose
        top: 57px
        left: 50%
        width: 53px
        height: 53px
        border-radius: 100%
        transform: translateX(-50%)
        @media(min-width: 48em)
          top: 245px


    #{$root}
      &__title-3
        position: relative
        padding: 0 20px
        color: white
        text-align: center
        @media(min-width: 48em)
          max-width: 770px
          margin: 0 auto

  &__slide
    padding: 0 0 80px 0
    @media(min-width: 48em)
      padding: 0 0 200px 0

    #{$root}
      &__title-3
        padding: 60px 20px 60px 21%
        @media(min-width: 48em)
          padding-top: 150px
          padding-bottom: 150px
          padding-left: calc(50% - 160px)
          padding-right: calc(50% - 610px)

  &__wrapper
    visibility: hidden
    &--show
      visibility: visible

      #{$root}
        &__title-2, &__description
          transform: translateY(0)
          opacity: 1

  &__title-2
    font-size: 40px
    letter-spacing: -.01em
    line-height: 1em
    transition: getDuration(1) $ease $delay
    @media(min-width: 48em)
      font-size: 80px

  &__title-3
    font-size: 30px
    line-height: 1.4em
    @media(min-width: 48em)
      font-size: 50px
    &--rose
      color: $color-rose

  &__description
    font-size: 14px
    max-width: 230px
    display: block
    padding: 20px 0 0 0
    transition: getDuration(2) $ease $delay

  &__video
    position: relative

  &-enter
    opacity: 0
    &-to
      opacity: 1
      transition: opacity getDuration(2) $ease
      will-change: opacity
      backface-visibility: hidden

.animation-image
  overflow: hidden
  &:before
    content: ''
    width: 100%
    height: 100%
    background-color: white
    top: 0
    left: 0
    position: absolute
    transition: getDuration(9) $ease
    z-index: 10
    will-change: transform
    backface-visibility: hidden
    transform-style: preserve-3d
  &--show
    &:before
      transform: translateX(100%)

.animation-y-reset
  transform: translateY(50px)
  opacity: 0
</style>
