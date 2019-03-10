import { isMobile, getMobile, setCanvasResponsive } from '~/assets/scripts/utils/responsive.js'

const init = (elm, { desktop: imagesDesktop, mobile: imagesMobile }) => {

  // -------------
  // start
  // -------------
  const WIDTH = elm.offsetWidth
  const HEIGHT = elm.offsetHeight
  const app = new PIXI.Application(WIDTH, HEIGHT, { transparent: true, autoResize: true })
  elm.appendChild(app.view)


  // -----------------
  // set responsive canvas
  // -----------------
  setCanvasResponsive(app.renderer.view)
  app.renderer.plugins.interaction.autoPreventDefault = false
  app.renderer.view.style.touchAction = 'auto'


  // -----------------
  // Create slide
  // -----------------
  const slides = []
  const images = getMobile(imagesMobile, imagesDesktop)
  let currentSlide = 0

  images.map((image, i) => {
    const imageSprite = new PIXI.Sprite.fromImage(image)
    imageSprite.alpha = 0
    imageSprite.anchor.set(0.5)
    imageSprite.position.set(app.renderer.width / 2, app.renderer.height / 2)
    imageSprite.scale.set(1)

    app.stage.addChild(imageSprite)
    slides.push(imageSprite)

    imageSprite.texture.baseTexture.on('loaded', () => {
      let winratio = app.renderer.width / app.renderer.height
      let spratio = imageSprite.width / imageSprite.height
      let scale = 1
      let pos = { x:0, y:0 }
      if (winratio > spratio) {
          scale = app.renderer.width/imageSprite.width;
          pos.y = -((imageSprite.height * scale) - app.renderer.height) / 2
      } else {
          scale = app.renderer.height / imageSprite.height;
          pos.x = -((imageSprite.width * scale) - app.renderer.width) / 2
      }
      scale += 0.06
      imageSprite.scale.set(scale)
    })
  })

  // set current slide
  TweenMax.to(slides[currentSlide], 1, {alpha: 1})


  const changeOver = (status) => {
    currentSlide = status ? 0 : 1
    TweenMax.to(slides, 1.5, {alpha: 0})
    TweenMax.to(slides[currentSlide], 2.4, {alpha: 1})
    TweenMax.to(displacementSprite.scale, .3, { x: 1, y: 1, ease: Power2.easeOut, onComplete: () => {
      TweenMax.to(displacementSprite.scale, .7, { x:2 , y:2, ease: Power1.easeIn })
    }}, )
  }


  // -------------------
  // filter
  // -------------------
  const displacementSrc = isMobile ? require('~/assets/images/effect/512x512/clouds.jpg') : require('~/assets/images/effect/2048x2048/clouds.jpg')
  const displacementSprite = new PIXI.Sprite.fromImage(displacementSrc)
  const displacementFilter = new PIXI.filters.DisplacementFilter( displacementSprite )

  app.stage.interactive = true

  displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT
  app.stage.filters = [ displacementFilter ]

  displacementSprite.alpha = 0
  displacementSprite.anchor.set(0.5);
  displacementSprite.x = app.renderer.width / 2
  displacementSprite.y = app.renderer.height / 2
  displacementSprite.scale.x = 2
  displacementSprite.scale.y = 2

  app.stage.addChild(displacementSprite)

  displacementSprite.texture.baseTexture.on('loaded', () => {
    TweenMax.to(displacementSprite, .8, { alpha: 1 })
  })


  // -------------------
  // Initial render
  // -------------------
  app.ticker.add(function( delta ) {
    displacementSprite.x += getMobile(0.07 * delta, 0.9 * delta)
    displacementSprite.y -= getMobile(0.1, 1.2)
  })

  return {
    changeOver
  }
}

export default init
