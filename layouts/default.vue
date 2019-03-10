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
</style>
