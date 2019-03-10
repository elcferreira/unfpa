let ZoomBlurFilter
if (process.browser) {
  ZoomBlurFilter = { ZoomBlurFilter } = require('@pixi/filter-zoom-blur')
}

export default ZoomBlurFilter
