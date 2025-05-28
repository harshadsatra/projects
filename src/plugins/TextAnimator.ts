// @ts-ignore
import { TextSplitter } from './textSplitter.js'
import { gsap } from 'gsap'

const lettersAndSymbols = 'abcdefghijklmnopqrstuvwxyz!@#$%^&*-_=+;:<>,'.split('')

export function createTextAnimator(textElement: HTMLElement): {
  animate: () => void
  reset: () => void
} {
  if (!textElement || !(textElement instanceof HTMLElement)) {
    throw new Error('Invalid text element provided.')
  }

  const splitter: TextSplitter = new TextSplitter(textElement, {
    splitTypeTypes: 'words, chars',
  })

  const originalChars: string[] = splitter.getChars().map((char: HTMLElement) => char.innerHTML)

  function animate(): void {
    reset() // cancel any ongoing tweens

    const chars: HTMLElement[] = splitter.getChars()

    chars.forEach((char: HTMLElement, position: number) => {
      const initialHTML = char.innerHTML

      gsap.fromTo(
        char,
        {
          opacity: 0,
        },
        {
          duration: 0.03,
          onComplete: () => {
            gsap.set(char, { innerHTML: initialHTML })
          },
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

  function reset(): void {
    const chars: HTMLElement[] = splitter.getChars()

    chars.forEach((char: HTMLElement, index: number) => {
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
