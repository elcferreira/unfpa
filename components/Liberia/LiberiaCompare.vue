<template>
  <section
    class="liberia-hover animation-image"
    :class="{'animation-image--show': compareVisible}"
    v-observe-visibility="{callback: status => compareVisible = status, once: true, intersection: { threshold: 0.3 }}"
    >
    <figure ref="compare" />
    <aside class="liberia-hover__aside js-rellax" data-rellax-percentage="0.5">
      <h3 class="liberia-hover__title-4">With support from Johnson Johnson, UNFPA is working to equip midwives with the skills they need to ensure safe birth.</h3>
      <ul class="liberia-hover__options">
        <li
          @mouseover="mouseOver"
          :class="{'liberia-hover__option--current': showEquipped}"
          class="liberia-hover__option">
          equipped
        </li>
        <li
          @mouseover="mouseOver"
          :class="{'liberia-hover__option--current': !showEquipped}"
          class="liberia-hover__option">
          unequipped<br> clinic
        </li>
        <li class="liberia-hover__current" />
      </ul>
    </aside>
  </section>
</template>

<script>
import compare from '~/assets/scripts/compare.js'

export default {
  data() {
    return {
      showEquipped: true,
      compareVisible: false,
      images: {
        desktop: [
          require('~/assets/images/liberia/liberia-hover-1.jpg'),
          require('~/assets/images/liberia/liberia-head.jpg')
        ],
        mobile: [
          require('~/assets/images/liberia/mobile/liberia-hover-1.jpg'),
          require('~/assets/images/liberia/mobile/liberia-head.jpg')
        ]
      },
      changeOver: () => null,
      started: false
    }
  },
  methods: {
    mouseOver() {
      this.showEquipped = !this.showEquipped ? true : false
      this.changeOver(this.showEquipped)
    },
    activeCanvas() {
      if (window.innerHeight + 200 > this.$refs.compare.getBoundingClientRect().top && !this.started) {
        if (process.browser && window) {
          this.started = true
          // window.removeEventListener('scroll', this.activeCanvas, false)
          const { changeOver } = compare(this.$refs.compare, this.images)
          this.changeOver = changeOver
        }
      }
    }
  },
  mounted () {
    if (process.browser && window) {
      this.activeCanvas()
      this.$root.$on('scrollbar', this.activeCanvas)
      // window.addEventListener('scroll', this.activeCanvas, false)
    }
  },
  destroyed() {
    this.$root.$off('scrollbar', this.activeCanvas)
  }
}
</script>

<style lang="sass">
.liberia-hover
  $root: &
  position: relative
  padding: 200px 20px
  color: white
  overflow: hidden
  background-color: black
  @media(min-width: 48em)
    195px 20px 294px

  &__title-4
    font-size: 24px
    line-height: 1.46em
    text-align: center
    max-width: 648px
    margin: 0 auto

  &__aside
    position: relative
    z-index: 3

  &__options
    display: flex
    justify-content: center
    padding: 30px 0 0 0
    position: relative
    @media(min-width: 48em)
      padding-top: 102px

  &__option
    width: 100px
    height: 100px
    font-size: 16px
    list-style: none
    border-radius: 50%
    display: flex
    align-items: center
    justify-content: center
    text-align: center
    border: 1px solid #979797
    cursor: pointer
    margin: 0
    padding: 0
    opacity: .47
    @media(min-width: 48em)
      width: 150px
      height: 150px
      font-size: 18px

    & + &
      margin-left: 20px
      @media(min-width: 48em)
        margin-left: 50px

    &--current
      opacity: 1

      &:nth-child(1) ~ #{$root}__current
        transform: translateX(calc(-50% - 10px))
        @media(min-width: 48em)
          transform: translateX(calc(-50% - 25px))
      &:nth-child(2) ~ #{$root}__current
        transform: translateX(calc(50% + 10px))
        @media(min-width: 48em)
          transform: translateX(calc(50% + 25px))

  &__current
    width: 100px
    height: 100px
    border: 3px solid white
    border-radius: 50%
    position: absolute
    list-style: none
    pointer-events: none
    transition: getDuration(1) $ease
    @media(min-width: 48em)
      width: 150px
      height: 150px
</style>
