// NAV BAR
let heroSection = document.getElementById('main-section'),
  menuIcon = heroSection.querySelector('.icon'),
  mainNav = heroSection.querySelector('#main-nav'),
  links_list = mainNav.querySelector('.links')

menuIcon.addEventListener('click', () => {
  menuIcon.classList.contains('fa-bars')
    ? menuIcon.classList.replace('fa-bars', 'fa-close')
    : menuIcon.classList.replace('fa-close', 'fa-bars')

  mainNav.classList.toggle('hidden')
})

// SMOOTH SCROLL
function smoothScroll(target, duration, linkHash) {
  let start = window.scrollY,
    end = target.getBoundingClientRect().top,
    time = null,
    EaseInOut = function (t, b, c, d) {
      t /= d / 2
      if (t < 1) return (c / 2) * t * t * t + b
      t -= 2
      return (c / 2) * (t * t * t + 2) + b
    }

  function animation(currentTime) {
    if (time === null) time = currentTime
    let Elapse = currentTime - time,
      moveBy = EaseInOut(Elapse, start, end, duration)
    window.scrollTo(0, moveBy)
    if (Elapse < duration) {
      requestAnimationFrame(animation)
    } else {
      window.location.hash = linkHash
    }
  }

  requestAnimationFrame(animation)
}
let smoothingAnchors = document.querySelectorAll('a[href^="#"]')
smoothingAnchors.forEach((Arrow) => {
  Arrow.addEventListener('click', (e) => {
    e.preventDefault()
    if (!Arrow.getAttribute('href') === '#') return
    if (window.innerWidth < 700) {
      menuIcon.classList.replace('fa-close', 'fa-bars')
      mainNav.classList.remove('hidden')
    }
    target = document.querySelector(Arrow.getAttribute('href'))
    smoothScroll(target, 1000, Arrow.getAttribute('href'))
  })
})

// HIDING TO TOP BUTTON IF SCROLLED FROM MAIN
let toTopArrow = document.querySelector('.toTopArrow')
let mainSection = document.querySelector('#main-section')
let toTopChecker = new IntersectionObserver(
  (e) => {
    if (e[0].isIntersecting) {
      toTopArrow.classList.add('toTopFadeIn')
    } else {
      toTopArrow.classList.remove('toTopFadeIn')
    }
  },
  { rootMargin: `-10px 0px 0px 0px` },
)

toTopChecker.observe(mainSection)
