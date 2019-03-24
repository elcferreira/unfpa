<template>
  <transition
    appear
    name="intro-timer"
    :duration="2000" >
    <div class="intro-timer" v-show="!closeIntro">
      <figure class="intro-timer__icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 522 522">
          <path opacity=".269" fill="none" stroke="#D0D0D0" stroke-dasharray="4,5" d="M261 1C117.4 1 1 117.4 1 261s116.4 260 260 260 260-116.4 260-260S404.6 1 261 1"/>
          <linearGradient id="a" gradientUnits="userSpaceOnUse" y1="263" x2="522" y2="263" gradientTransform="matrix(1 0 0 -1 0 524)">
            <stop offset="0" stop-color="#f75f3c"/>
            <stop offset=".324" stop-color="#f0d956"/>
            <stop offset=".857" stop-color="#81f75d"/>
            <stop offset="1" stop-color="#6effbd"/>
          </linearGradient>
          <path fill="none" class="intro-timer__loader" stroke="url(#a)" stroke-dasharray="1800" :stroke-dashoffset="dashoffset.positionY" stroke-width="2" d="M261 1C117.4 1 1 117.4 1 261s116.4 260 260 260 260-116.4 260-260S404.6 1 261 1"/>
        </svg>
      </figure>
      <transition name="intro-timer__aside" :duration="1600">
      <aside class="intro-timer__aside" v-show="!closeIntro">
        <h1 class="intro-timer__title" >Every 2 minutes, a woman dies giving birth</h1>
        <div class="intro-timer__cursor">
          <IconMouse />
          <span class="intro-timer__cursor-text">scroll down</span>
        </div>
      </aside>
      </transition>
    </div>
  </transition>
</template>

<script>
import IconMouse from '~/assets/images/icons/icon-mouse.svg'

export default {
  props: ['dashoffset', 'closeIntro'],
  components: { IconMouse },
  mounted() {
  }
}
</script>

<stlye lang="sass">
.intro-timer
  $root: &;
  position: absolute
  z-index: 1
  left: 50%
  top: 50%
  pointer-events: none
  transform: translate3d(-50%, -50%, 0)

  &__icon
    width: 50vh
    height: 50vh
    max-width: 520px
    max-height: 520px
    display: block

  &__title
    color: white
    position: absolute
    width: 90vw
    text-align: center
    left: 50%
    top: 50%
    transform: translate3d(-50%, -75%, 0) scale(1)
    font-size: 50px
    @media(min-height: 37.25em)
      transform: translate3d(-50%, -65%, 0) scale(1)

  &__cursor
    position: absolute
    bottom: 5%
    left: 50%
    text-align: center
    transform: translate3d(-50%, 0, 0)
    @media(min-width: 48em)
      bottom: 12%
    &-text
      padding-top: 12px
      font-size: 11px
      color: rgba(white, .5)
      letter-spacing: 1px
      display: block

    .icon-mouse-scroll
      animation: mouseScroll 1.4s $ease 0s infinite

  &__loader
    //transition: .3s $ease

  &__aside
    &-leave
      &-active
        #{$root}
          &__title
            transform: translate3d(-50%, -65%, 0) scaleY(1)
            opacity: 1
          &__cursor
            transform: translate3d(-50%, 00px, 0) scaleY(1)
            opacity: 1
      &-to
        #{$root}
          &__title, &__cursor
            transition-property: transform, opacity
            will-change: transform, opacity
            backface-visibility: hidden
          &__title
            transform: translate3d(-50%, -125px, 0) scaleY(1.3)
            opacity: 0
            transition: getDuration(1) $ease
          &__cursor
            transform: translate3d(-50%, -50px, 0) scaleY(1.3)
            opacity: 0
            transition: getDuration(2) $ease

  &-leave
    &-active
      #{$root}
        &__icon
          opacity: 1
    &-to
      #{$root}
        &__icon
          opacity: 0
          transition: opacity getDuration(0.4) $ease

  &-enter
    &-active
      #{$root}
        &__title, &__icon, &__cursor
          will-change: transform, opacity
          backface-visibility: hidden
        &__title
          transform: translate3d(-50%, 60px, 0) scaleY(1.3)
          opacity: 0
        &__icon
          transform: scale(0)
        &__cursor
          transform: translate3d(-50%, 60px, 0)
          opacity: 0
    &-to
      #{$root}
        &__title
          opacity: 1
          transition: transform getDuration(2) $ease .2s, opacity getDuration(2) $ease .2s
          transform: translate3d(-50%, -75%, 0) scale(1)
          @media(min-height: 37.25em)
            transform: translate3d(-50%, -65%, 0) scale(1)
        &__icon
          transform: scale(1)
          transition: transform getDuration(1.5) $ease .2s
        &__cursor
          transform: translate3d(-50%, 00px, 0)
          opacity: 1
          transition: transform getDuration(4) $ease .2s, opacity getDuration(3) $ease .2s

@keyframes mouseScroll
  1%
    transform-origin: center bottom
    transform: scaleY(1)
  50%
    transform-origin: center bottom
    transform: scaleY(0)
  51%
    transform-origin: center top
    transform: scaleY(0)
  100%
    transform-origin: center top
    transform: scaleY(1)

</stlye>
