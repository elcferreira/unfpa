import Vue from 'vue'
import VueObserveVisibility from 'vue-observe-visibility'

if (process.browser && !('IntersectionObserver' in window))
  require('intersection-observer')

Vue.use(VueObserveVisibility)
