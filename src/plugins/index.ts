import { TextAnimator } from './TextAnimator'

const init = () => {
  document.querySelectorAll('.list__item').forEach((item) => {
    const cols = Array.from(item.querySelectorAll('.hover-effect')) as HTMLElement[]
    const animators = cols.map((col) => new TextAnimator(col))

    item.addEventListener('mouseenter', () => {
      animators.forEach((animator) => animator.animate())
    })
    item.addEventListener('mouseleave', () => {
      animators.forEach((animator) => animator.animateBack())
    })
  })

  // Same for all links
  document.querySelectorAll('a.hover-effect').forEach((item) => {
    const animator = new TextAnimator(item as HTMLElement)
    item.addEventListener('mouseenter', () => {
      animator.animate()
    })
    item.addEventListener('mouseleave', () => {
      animator.animateBack()
    })
  })
}

init()
