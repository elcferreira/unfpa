<template>
  <section
    class="liberia-related animation-image"
    :class="{'animation-image--show': relatedVisible}"
    v-observe-visibility="{callback: status => relatedVisible = status, once: true, intersection: { threshold: 0.3 }}"
    >
    <hgroup class="liberia-related__intro">
      <i class="liberia-related__circle" />
      <i class="liberia-related__circle" />
      <i class="liberia-related__circle" />
      <i class="liberia-related__circle" />
      <h4 class="liberia-related__title">safe birth<br> starts here</h4>
    </hgroup>
    <span class="liberia-related__flag">See other stories</span>
    <ul class="liberia-related__list">
      <li v-for="item in menu" class="liberia-related__item">
        <nuxt-link :to="item.link" class="liberia-related__link" :title="item.title">
          <ImageCanvas class="liberia-related__image" :image="item.image" />
          <span class="liberia-related__text">{{item.title}}</span>
        </nuxt-link>
      </li>
    </ul>
  </section>
</template>

<script>
import ImageCanvas from '~/components/ImageCanvas/index.vue'

export default {
  components: { ImageCanvas },
  data() {
    return {
      relatedVisible: false,
      menu: [
        {
          link: '/',
          title: 'Kenya',
          image: {
            desktop: require('~/assets/images/liberia/liberia-related-1.jpg'),
            mobile:  require('~/assets/images/liberia/mobile/liberia-related-1.jpg')
          }
        },
        {
          link: '/lieria',
          title: 'Liberia',
          image: {
            desktop: require('~/assets/images/liberia/liberia-related-2.jpg'),
            mobile:  require('~/assets/images/liberia/mobile/liberia-related-2.jpg')
          }
        }
      ]
    }
  }
}
</script>

<style lang="sass">
.liberia-related
  position: relative
  $root : &
  &__intro
    padding: 250px 0
    text-align: center
    position: relative
    @media(min-width: 48em)
      padding: 432px 0 415px

  &__title
    font-size: 25px
    @media(min-width: 48em)
      font-size: 40px

  &__circle
    width: 170px
    height: 170px
    border: 1px solid #AFAFAF
    display: block
    position: absolute
    left: 50%
    top: 50%
    transform: translate3d(-50%, -50%, 0)
    border-radius: 50%
    &:nth-child(1)
      animation: circleBounce 4s linear 0s infinite
    &:nth-child(2)
      animation: circleBounce 4s linear 2s infinite
    &:nth-child(3)
      animation: circleBounce 4s linear 4s infinite

    @media(min-width: 48em)
      width: 310px
      height: 310px

  &__flag
    display: block
    text-align: center
    color: #A4A4A4
    padding: 0 0 80px 0
    font-size: 16px
    position: relative
    @media(min-width: 48em)
      font-size: 18px

    &:before
      content: ''
      width: 1px
      height: 50px
      position: absolute
      left: 50%
      bottom: 16px
      background-color: #979797

  &__list
    @media(min-width: 48em)
      display: flex

  &__item
    @media(min-width: 48em)
      width: 50%

  &__link
    display: block
    position: relative
    padding: 70px 10px
    text-align: center
    background-color: #0C1020
    text-decoration: none
    overflow: hidden
    &:hover, &:focus
      #{$root}__image
        opacity: .8
        transform: scale(1.2)

    @media(min-width: 48em)
      padding: 347px 10px

  &__text
    position: relative
    color: white
    font-family: $font-title
    font-size: 24px
    @media(min-width: 48em)
      font-size: 40px

  &__image
    opacity: 0.28
    transition: opacity getDuration(1) $ease, transform 10s linear



@keyframes circleBounce
  1%
    transform: translate3d(-50%, -50%, 0) scale(1)
    opacity: .9
  100%
    transform: translate3d(-50%, -50%, 0) scale(1.6)
    opacity: 0


</style>
