import { TextSplitter } from './textSplitter.js'
import { gsap } from 'gsap'

const lettersAndSymbols = 'abcdefghijklmnopqrstuvwxyz!@#$%^&*-_=+;:<>,'.split('')

export function createTextAnimator(textElement) {
  if (!textElement || !(textElement instanceof HTMLElement)) {
    throw new Error('Invalid text element provided.')
  }

  const splitter = new TextSplitter(textElement, {
    splitTypeTypes: 'words, chars',
  })

  const originalChars = splitter.getChars().map((char) => char.innerHTML)

  function animate() {
    reset() // cancel any ongoing tweens

    const chars = splitter.getChars()

    chars.forEach((char, position) => {
      const initialHTML = char.innerHTML

      gsap.fromTo(
        char,
        {
          opacity: 0,
        },
        {
          duration: 0.03,
          onComplete: () => gsap.set(char, { innerHTML: initialHTML }),
          repeat: 2,
          repeatRefresh: true,
          repeatDelay: 0.05,
          delay: (position + 1) * 0.04,
          innerHTML: () => lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)],
          opacity: 1,
        },
      )
    })

    gsap.fromTo(
      textElement,
      {
        '--anim': 0,
      },
      {
        duration: 1,
        ease: 'expo',
        '--anim': 1,
      },
    )
  }

  function reset() {
    const chars = splitter.getChars()

    chars.forEach((char, index) => {
      gsap.killTweensOf(char)
      char.innerHTML = originalChars[index]
    })

    // Animate background reset smoothly
    gsap.to(textElement, {
      duration: 0.6,
      ease: 'power4.out',
      '--anim': 0,
    })
  }

  return {
    animate,
    reset,
  }
}
