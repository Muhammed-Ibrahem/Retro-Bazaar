// Animating elements on scroll
let theElements = document.querySelectorAll('.sukaar')
let options = {
  root: null,
  rootMargin: `0px 0px -50px 0px`,
  threshold: 0,
}
function animation(elements, observer) {
  elements.forEach((element) => {
    if (element.isIntersecting) {
      element = element.target
      let data = element.dataset
      element.style.cssText = `
            animation: ${data.sName} ${data.sTime || 0.5}s ${
        data.sEase || 'ease-in-out'
      } ${data.sDelay || 0}s forwards
        `
    }
  })
}
let animationObserver = new IntersectionObserver(animation, options)

window.addEventListener('DOMContentLoaded', () => {
  theElements.forEach((Element) => animationObserver.observe(Element))
})
