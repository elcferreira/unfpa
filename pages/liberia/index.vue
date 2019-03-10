<template>
  <main class="liberia">
    <LiberiaHead />
    <LiberiaHistory />
    <LiberiaCompare />
    <LiberiaRelated />
  </main>
</template>

<script>
import LiberiaHead from '~/components/Liberia/LiberiaHead.vue'
import LiberiaHistory from '~/components/Liberia/LiberiaHistory.vue'
import LiberiaCompare from '~/components/Liberia/LiberiaCompare.vue'
import LiberiaRelated from '~/components/Liberia/LiberiaRelated.vue'
import { isMobile } from '~/assets/scripts/utils/responsive.js'

export default {
  transition: {
    name: 'intro',
    mode: 'in-out'
  },
  components: { LiberiaHead, LiberiaHistory, LiberiaCompare, LiberiaRelated },
  head () {
    return {
      title: 'Liberia - UNFPA',
      meta: [
        { hid: 'description', name: 'description', content: 'I can work to save my people. Yamah, a midwife and supervisor of a maternal health clinic' }
      ]
    }
  },
  data() {
    return {
      parallax: null
    }
  },
  methods: {
    Rellax: () => null
  },
  mounted() {
    if (!isMobile) {
      import(/* webpackChunkName: "rellax" */ 'rellax').then(e=> {
        this.Rellax = e.default
        this.parallax = new this.Rellax('.js-rellax')
      })
    }
  }
}
</script>

<style lang="sass">
.js-rellax
  will-change: transform
  backface-visibility: hidden
  transform-style: preserve-3d
</style>
