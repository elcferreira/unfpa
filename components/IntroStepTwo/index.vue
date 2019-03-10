<template>
  <div class="step-two">
    <figure class="step-two__figure" ref="figure">
      <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
          viewBox="0 0 536 536" enable-background="new 0 0 536 536" xml:space="preserve">
        <path fill="none" stroke="#F4F4F4" stroke-width="3" d="M268,1C120.5,1,1,120.5,1,268s119.5,267,267,267s267-119.5,267-267
          S415.5,1,268,1"/>
        <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="5.5" y1="-286" x2="530.5" y2="-286" gradientTransform="matrix(1 0 0 -1 0 -18)">
          <stop  offset="0" style="stop-color:#F75F3C"/>
          <stop  offset="0.324" style="stop-color:#F0D956"/>
          <stop  offset="0.857" style="stop-color:#81F75D"/>
          <stop  offset="1" style="stop-color:#6EFFBD"/>
        </linearGradient>
        <path fill="none" stroke="url(#SVGID_1_)" stroke-dasharray="1800" :stroke-dashoffset="dashoffset" stroke-width="7" d="M268,8C124.4,8,8,124.4,8,268s116.4,260,260,260s260-116.4,260-260
          S411.6,8,268,8"/>
      </svg>
    </figure>
    <span class="step-two__timer">{{ minutes + ':' + seconds }}</span>
    <h1 class="step-two__title">That’s 830 women every day.</h1>
    <nuxt-link to="/liberia" class="step-two__button">Next</nuxt-link>
  </div>
</template>
// 1700
// 3600

<script>
export default {
  data() {
    return {
      duration: 120,
      timer: 120,
      minutes: '02',
      seconds: '00',
      dashoffset: 1900
    }
  },
  methods: {
    startTimer() {
      const $this = this
      setInterval(function () {
        $this.minutes = parseInt($this.timer / 60, 10)
        $this.seconds = parseInt($this.timer % 60, 10)

        $this.minutes = $this.minutes < 10 ? "0" + $this.minutes : $this.minutes
        $this.seconds = $this.seconds < 10 ? "0" + $this.seconds : $this.seconds

        $this.timer = $this.timer - 1

        const duration = $this.duration
        const timer = $this.timer
        $this.dashoffset = 1900 + (((duration - timer) * 1700) / duration)

        if ($this.timer <= 0) $this.$router.push('/liberia')

      }, 1000);
    }
  },
  mounted() {
    TweenMax.to(this.$refs.figure, 1, {
      width: 80,
      height: 80,
      top: 56,
      ease: Power3.easeInOut
    })
    this.startTimer(), 500
  }
}
</script>

<style lang="sass">
.step-two
  $root : &
  position: absolute
  z-index: 1
  // pointer-events: none

  &__title
    color: white
    letter-spacing: -0.66
    width: 100%
    position: fixed
    font-size: 40px
    top: 50%
    text-align: center
    transform: translate3d(0, -50%, 0)
    @media (min-width: 48em)
      font-size: 6vw

  &__button
    font-family: $font-title
    font-size: 40px
    font-weight: 600
    color: white
    position: fixed
    left: 50%
    top: 70%
    text-decoration: none
    transform: translate3d(-50%, 0, 0)
    &:hover
      &:before
        transform-origin: right center
        transform: scaleX(0)
    &:before
      content: ''
      width: 100%
      height: 1px
      background-color: white
      position: absolute
      bottom: 0
      left: 0
      transform-origin: left center
      transition: transform getDuration(1) $ease

  &__figure
    width: 50vh
    height: 50vh
    max-width: 520px
    max-height: 520px
    display: block
    position: fixed
    z-index: 1
    left: 50%
    top: 50%
    transform: translate3d(-50%, -50%, 0)

  &__timer
    font-size: 14px
    color: white
    position: fixed
    top: 48px
    left: 50%
    transform: translateX(-50%)

  &-enter
    &-active
      #{$root}
        &__title
          transform: translate3d(0, 40px, 0) scaleY(1.3)
          opacity: 0
        &__button
          transform: translate3d(-50%, 35px, 0) scaleY(1.2)
          opacity: 0
        &__figure
          opacity: 0
        &__timer
          opacity: 0

    &-to
      #{$root}
        &__title
          transform: translate3d(0, -50%, 0) scaleY(1)
          opacity: 1
          transition: transform getDuration(2) $ease .5s, opacity getDuration(2) $ease .5s
        &__button
          transform: translate3d(-50%, 0, 0) scale(1)
          opacity: 1
          transition: transform getDuration(4) $ease .6s, opacity getDuration(4) $ease .5s
        &__figure
          opacity: 1
          transition: opacity getDuration(1) $ease
        &__timer
          opacity: 1
          transition: opacity getDuration(1) $ease .5s

  &-leave
    &-active
      #{$root}
        &__title
          transform: translate3d(0, -50%, 0) scaleY(1)
          opacity: 1
        &__button
          transform: translate3d(-50%, 0, 0) scaleY(1)
          opacity: 1
    &-to
      #{$root}
        &__title
          transform: translate3d(0, -130px, 0) scaleY(1.3)
          opacity: 0
          transition: transform .63s $ease, opacity .63s $ease
        &__button
          transform: translate3d(-50%, -30px, 0) scaleY(1.3)
          opacity: 0
          transition: transform .75s $ease, opacity .75s $ease

</style>
