export const isMobile = process.browser ? !window.matchMedia('(min-width: 48em)').matches : true

export const getMobile = (mobile, desktop) => isMobile ? mobile : desktop

export const setCanvasResponsive = (view, touchAction = false) => {
  view.style.objectFit = 'cover';
  view.style.width     = '100%';
  view.style.height    = '100%';
  view.style.top       = '50%';
  view.style.left      = '50%';
  view.style.webkitTransform = 'translate( -50%, -50% ) scale(1)';
  view.style.transform = 'translate( -50%, -50% ) scale(1)';
  view.style.position = 'absolute';
}
