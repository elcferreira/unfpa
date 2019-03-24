<template>
  <div>
    <nuxt />
  </div>
</template>

<script>
if (process.browser) {
    let TweenMax = require('gsap/TweenMax');
    // let TweenMax = require( /* webpackChunkName: "gsap" */ 'gsap/TweenMax');
}

export default {}
</script>

<style lang="sass">
$font-title: 'Newzald Test', serif
$font-body: 'Muli', sans-serif

body
  font-family: $font-body

h1, h2, h3, h4
  font-family: $font-title
  font-weight: 600

*,
*:before,
*:after
  box-sizing: border-box
  margin: 0
  padding: 0


.intro
  &-leave
    &-active
      &:before
        content: ''
        position: fixed
        width: 100%
        height: 100%
        top: 0
        left: 0
        background-color: white
        transform: translateY(-100%)
        z-index: 10
    &-to
      &:before
        transform: translateY(0)
        will-change: transform
        transition: getDuration(1) $ease

  &-enter
    &-active
      &:before
        content: ''
        position: fixed
        width: 100%
        height: 100%
        top: 0
        left: 0
        background-color: white
        transform: translateY(0)
        z-index: 10
    &-to
      &:before
        transform: translateY(100%)
        will-change: transform
        transition: getDuration(3) $ease
</style>
