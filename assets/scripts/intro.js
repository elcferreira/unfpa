import { isMobile, getMobile, setCanvasResponsive } from '~/assets/scripts/utils/responsive.js'

export const init = (elm, ZoomBlurFilter) => {

  // -------------------
  // canvas
  // -------------------
  const WIDTH = window.innerWidth
  const HEIGHT = window.innerHeight
  const app = new PIXI.Application(WIDTH, HEIGHT, { backgroundColor: 0xD99E94, autoResize: true })
  elm.appendChild(app.view)

  // -------------------
  // responsive
  // -------------------
  // const isMobile = !window.matchMedia('(min-width: 48em)').matches
  // const getMobile = (mobile, desktop) => isMobile ? mobile : desktop


  // -------------------
  // auto resize
  // -------------------
  setCanvasResponsive(app.renderer.view)


  // background
  // -------------------
  const backgroundSrc = isMobile ? require('~/assets/images/background-intro-mobile.jpg') : require('~/assets/images/background-intro.jpg')
  const backgroundSprite = new PIXI.Sprite.fromImage(backgroundSrc)
  backgroundSprite.alpha = 0
  backgroundSprite.anchor.set(0.5)
  backgroundSprite.position.set(app.renderer.width / 2, app.renderer.height / 2)
  backgroundSprite.scale.set(1)

  app.stage.addChild(backgroundSprite)

  backgroundSprite.texture.baseTexture.on('loaded', () => {
    var winratio = app.renderer.width / app.renderer.height
    var spratio = backgroundSprite.width / backgroundSprite.height
    var scale = 1
    var pos = { x:0, y:0 }
    if (winratio > spratio) {
        scale = app.renderer.width/backgroundSprite.width;
        pos.y = -((backgroundSprite.height * scale) - app.renderer.height) / 2
    } else {
        scale = app.renderer.height / backgroundSprite.height;
        pos.x = -((backgroundSprite.width * scale) - app.renderer.width) / 2
    }
    scale += 0.06
    // backgroundSprite.scale.set(scale)
    TweenMax.to(backgroundSprite, 2, { alpha: 1 })
    backgroundSprite.scale.set(scale)
    // TweenMax.to(backgroundSprite.scale, 1, {x: scale, y: scale})
  })

  // -------------------
  // Step 2 - container
  // -------------------
  const stepTwoContainer = new PIXI.Container()
  stepTwoContainer.alpha = 0
  app.stage.addChild(stepTwoContainer)


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
    TweenMax.to(displacementSprite, .5, { alpha: 1 })
  })


  // -------------------
  // Initial render
  // -------------------
  app.ticker.add(function( delta ) {
    displacementSprite.x += getMobile(0.3 * delta, 0.9 * delta)
    displacementSprite.y -= getMobile(0.4, 2)
  })

  // -------------------
  // Noise filter when user scroll
  // -------------------
  const noiseFilter = new PIXI.filters.NoiseFilter(0)
  const zoomFilter = new ZoomBlurFilter(0, [app.renderer.width/2, app.renderer.height/2], 340)
  backgroundSprite.filters = [noiseFilter, zoomFilter]
  // const zoomBlurFilter = new PIXI.filters.ZoomBlurFilter()

  let isScrolling;
  let scrollingStart = true

  const introMouseWheel = e => {
    e.preventDefault()

    // Detect if start scroll
    if (scrollingStart) {
      startIntroEvent()
    }
    scrollingStart = false

    // Detect if stop scroll
    window.clearTimeout( isScrolling )
    isScrolling = setTimeout(() => {
      endIntroEvent()
    }, 88)
  }


  const startIntroEvent = () => {
    TweenMax.to(noiseFilter, 0.2,{ noise: getMobile(0.3, 0.1) })
    TweenMax.to(zoomFilter, 0.4,{ innerRadius: getMobile(200, 340), strength: getMobile(0.2, 0.18) })
  }

  const endIntroEvent = () => {
    TweenMax.to(noiseFilter, 0.2,{ noise: 0 })
    TweenMax.to(zoomFilter, 0.2,{ strength: 0 })
    scrollingStart = true
  }



  // -------------------
  // Handle events
  // -------------------
  // document.addEventListener("mousewheel", mouseWheel, false);


  // -------------------
  // Transition step 2
  // -------------------
  const transitionEffect = new TimelineMax()

  const handleNextTwo = () => {

    transitionEffect
      .to(displacementSprite.scale, 0.5, { x: 1.2, y: 1.2 })
      .to(displacementSprite.scale, 0.5, { x: 2, y: 2 })

    if (isMobile) {
      TweenMax.to(stepTwoContainer, 1, { alpha: 1 })
    } else {
      TweenMax.to(backgroundSprite.scale, 1.6, { x: 3, y: 3,
        onComplete: () => {
          TweenMax.to(stepTwoContainer, 0.3, { alpha: 1 })
        }
      })
    }

    if (!isMobile) startStepTwo()
  }


  // -------------------
  // Create images step 2 - brush, background, sprite, texture, functions
  // -------------------
  const brush = new PIXI.Sprite.fromImage(require('~/assets/images/effect/brush.png'))
  brush.alpha = 0.2
  brush.anchor.set(0.4, 0.5)


  const stepTwoBackground = new PIXI.Graphics()
  stepTwoBackground.beginFill(0x0C1020)
  stepTwoBackground.drawRect(0, 0, app.renderer.width, app.renderer.height)
  stepTwoBackground.endFill()
  stepTwoBackground.scale.set(1.3)
  stepTwoContainer.addChild(stepTwoBackground)


  const stepTwoSrc = isMobile ? require('~/assets/images/background-step-two-mobile.jpg') : require('~/assets/images/background-step-two.jpg')
  const stepTwoSprite = new PIXI.Sprite.fromImage(stepTwoSrc)
  stepTwoSprite.anchor.set(0.5)
  stepTwoSprite.position.set(app.renderer.width / 2, app.renderer.height / 2)
  stepTwoSprite.texture.baseTexture.on('loaded', () => {
    var winratio = app.renderer.width / app.renderer.height
    var spratio = stepTwoSprite.width / stepTwoSprite.height
    var scale = 1
    var pos = { x:0, y:0 }
    if (winratio > spratio) {
        scale = app.renderer.width/stepTwoSprite.width;
        pos.y = -((stepTwoSprite.height * scale) - app.renderer.height) / 2
    } else {
        scale = app.renderer.height / stepTwoSprite.height;
        pos.x = -((stepTwoSprite.width * scale) - app.renderer.width) / 2
    }
    scale += 0.06
    stepTwoSprite.scale.set(scale)
  })
  stepTwoContainer.addChild(stepTwoSprite)


  const stepTwoTextureRender = PIXI.RenderTexture.create(app.screen.width, app.screen.height)
  const stepTwoTextureSprite = new PIXI.Sprite(stepTwoTextureRender)
  stepTwoContainer.addChild(stepTwoTextureSprite)

  stepTwoSprite.mask = isMobile ? '' : stepTwoTextureSprite


  // Start / end
  const startStepTwo = () => {
    app.stage.on('mousemove', mouseMoveStepTwo)
  }

  const mouseMoveStepTwo = e => {
    brush.position.copy(e.data.global)
    app.renderer.render(brush, stepTwoTextureRender, false, null, false)
  }


  // --------------
  // return
  // --------------
  return {
    handleNextTwo,
    introMouseWheel,
    endIntroEvent,
    startIntroEvent
  }
}


