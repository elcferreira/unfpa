import { isMobile, getMobile, setCanvasResponsive } from '~/assets/scripts/utils/responsive.js'

const imageCanvas = (elm, { desktop, mobile }) => {
  // -------------
  // start
  // -------------
  const WIDTH = elm.offsetWidth
  const HEIGHT = elm.offsetHeight

  const app = new PIXI.Application(WIDTH, HEIGHT, { transparent: true, autoResize: true })
  elm.appendChild(app.view)


  // -------------------
  // auto resize
  // -------------------
  setCanvasResponsive(app.renderer.view)
  app.renderer.plugins.interaction.autoPreventDefault = false
  app.renderer.view.style.touchAction = 'auto'

  // -------------------
  // load first image
  // -------------------
  const imageSrc = isMobile ? mobile : desktop
  const imageSprite = new PIXI.Sprite.fromImage(imageSrc)
  imageSprite.alpha = 0
  imageSprite.anchor.set(0.5)
  imageSprite.position.set(app.renderer.width / 2, app.renderer.height / 2)
  imageSprite.scale.set(1)

  app.stage.addChild(imageSprite)

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
    TweenMax.to(imageSprite, 1.4, { alpha: 1 })
  })

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
    displacementSprite.x += getMobile(0.2 * delta, 0.9 * delta)
    displacementSprite.y -= getMobile(0.3, 1.2)
  })


  return {}
}

export default imageCanvas
