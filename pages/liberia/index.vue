<template>
  <main class="liberia" id="luxy">
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
    Luxy: () => null,
    Rellax: () => null
  },
  mounted() {
    if (!isMobile) {
      import(/* webpackChunkName: "luxy" */ 'luxy.js').then(e=> {
        this.Luxy = e.default
        this.Luxy.init()
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
