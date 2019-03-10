<template>
  <transition name="intro-credits" :duration="1200">
    <footer class="intro-credits">
      <span class="intro-credits__text">safe birth even here ® 2018 . Privacy Policy and Terms of Use . Sponsored by <BrandJohnson /></span>
    </footer>
  </transition>
</template>

<script>
import BrandJohnson from '~/assets/images/icons/brand-johnson.svg'

export default {
  components: { BrandJohnson }
}
</script>

<style lang="sass">
.intro-credits
  position: fixed
  bottom: 5%
  width: 100%
  z-index: 2
  display: block
  text-align: center
  padding: 0 15px

  &__text
    color: rgba(white, .35)
    font-size: 10px

  .brand-johnson
    width: 100px
    height: 18px
    top: 7px
    position: relative
    margin-left: 4px
    opacity: .55
</style>
