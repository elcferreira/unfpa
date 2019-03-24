<template>
  <div class="intro">
    <section ref="intro" class="intro__background" />
    <IntroTimer :dashoffset={positionY} :closeIntro="closeIntro"  />
    <transition name="intro-motion" :duration="1200" appear>
      <img class="intro__brand-unfpa" src="~/assets/images/icons/brand-unfpa.png" alt="Brand UNFPA" v-if="!closeIntro">
    </transition>
    <transition name="intro-motion" :duration="1200" appear>
      <IntroCredits v-show="!closeIntro" />
    </transition>
    <transition name="step-two" :duration="2000">
      <IntroStepTwo v-if="closeIntro" />
    </transition>
  </div>
</template>

<script>
import IntroTimer from '~/components/IntroTimer/index.vue'
import IntroCredits from '~/components/IntroCredits/index.vue'
import IntroStepTwo from '~/components/IntroStepTwo/index.vue'
import { init } from '~/assets/scripts/intro.js'

export default {
  transition: {
    name: 'intro',
    mode: 'out-in',
    duration: 700
  },
  components: { IntroCredits, IntroTimer, IntroStepTwo },
  head () {
    return {
      title: 'UNFPA',
      meta: [
        { hid: 'description', name: 'description', content: 'Every 2 minutes, a woman dies giving birth' }
      ]
    }
  },
  data () {
    return {
      introMouseWheel: () => null,
      handleNextTwo: () => null,
      startIntroEvent: () => null,
      endIntroEvent: () => null,
      positionY: 1900,
      closeIntro: false,
      touchInit: 0
    }
  },
  methods: {
    nextStep() {
      this.closeIntro = true
      this.handleNextTwo()
    },
    getPosition(status) {
      switch (status) {
        case 'less':
          if (this.positionY >= 1900)
            this.positionY -= 17 * 3.8
          break
        default:
          if (this.positionY <= 3600)
            this.positionY += 17 * 3.8
          break
      }
    },
    mouseWheel(e) {
      e.preventDefault()
      this.introMouseWheel(e)

      if (e.deltaY < 0 || e.detail < 0)
        this.getPosition('less')

      if (e.deltaY > 0 || e.detail > 0)
        this.getPosition()

      if (this.positionY > 3600 && !this.closeIntro)
        this.nextStep()
    },
    touchStart(e) {
      this.touchInit = e.touches[0].pageY
      this.startIntroEvent()
    },
    touchMove(e) {
      let contact = e.touches
      let end = contact[0].pageY
      let distance = end - this.touchInit

      if (distance < -30)
        this.getPosition()

      if (distance > 30)
        this.getPosition('less')

      if (this.positionY > 3600 && !this.closeIntro)
        this.nextStep()
    },
    touchEnd(e) {
      this.endIntroEvent()
    }
  },
  mounted() {
    if (process.browser && window) {
      import(/* webpackChunkName: "zoom-filter" */ '@pixi/filter-zoom-blur/lib/filter-zoom-blur.js').then(e=> {
        const { ZoomBlurFilter } = e
        const { handleNextTwo, introMouseWheel, endIntroEvent, startIntroEvent } = init(this.$refs.intro, ZoomBlurFilter)

        this.introMouseWheel = introMouseWheel
        this.handleNextTwo = handleNextTwo
        this.startIntroEvent = startIntroEvent
        this.endIntroEvent = endIntroEvent
      })

      document.addEventListener("touchstart", this.touchStart, false)
      document.addEventListener("touchmove", this.touchMove, false)
      document.addEventListener("touchend", this.touchEnd, false)
      document.addEventListener("mousewheel", this.mouseWheel, false)
      document.addEventListener("DOMMouseScroll", this.mouseWheel, false)

    }
  },
  destroyed() {
    document.removeEventListener("touchend", this.touchEnd, false)
    document.removeEventListener("touchstart", this.touchStart, false)
    document.removeEventListener("touchmove", this.touchMove, false)
    document.removeEventListener("mousewheel", this.mouseWheel, false)
    document.removeEventListener("DOMMouseScroll", this.mouseWheel, false)
  }
}
</script>


<style lang="sass">

.intro
  &__background
    width: 100%
    height: 100%
    position: fixed
    top: 0
    left: 0
    background-color: #D99E94
    z-index: 0

  &__brand-unfpa
    position: fixed
    top: 40px
    right: 40px
    width: 72px
    height: 34px
    z-index: 3


canvas
  position: absolute

.intro-motion
  &-enter
    &-active
      transform: translate3d(0, 50px, 0) scaleY(1.3)
      opacity: 0
    &-to
      transition: transform .54s $ease .2s, opacity .48s $ease .2s
      transform: translate3d(0, 0px, 0) scaleY(1)
      opacity: 1
  &-leave
    &-active
      transform: translate3d(0, 0px, 0) scaleY(1)
      opacity: 1
    &-to
      transition: transform .54s $ease, opacity .48s $ease
      transform: translate3d(0, -50px, 0) scaleY(1.3)
      opacity: 0
</style>
