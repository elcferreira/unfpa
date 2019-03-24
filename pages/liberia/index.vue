<template>
  <main class="liberia" ref="smooth">
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
    mode: 'out-in',
    duration: 700,
    appear: true
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
  methods: {
    Scrollbar: () => null
  },
  mounted() {
    if (process.browser) {
      const scrollbarEmmit = () => this.$root.$emit('scrollbar')

      import(/* webpackChunkName: "smooth" */ 'smooth-scrollbar').then(e=> {
        const Scrollbar = e.default
        this.Scrollbar = Scrollbar
        window.scrollbar = Scrollbar.init(document.body, {
          alwaysShowTracks: false
        })

        window.scrollbar.addListener( scrollbarEmmit )
      })
    }
  },
  destroyed() {
    window.scrollbar.destroy()
  }
}
</script>

<style lang="sass">
body
  height: 100vh

.scroll-content
  will-change: transform
  transform-style: preserve-3d
  backface-visibility: hidden

</style>
