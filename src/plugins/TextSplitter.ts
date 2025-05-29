// Import debounce utility function.
import SplitType from 'split-type'
import { debounce } from './Utils'

export class TextSplitter {
  textElement: HTMLElement
  onResize: (() => void) | null
  splitText: SplitType
  splitTypes: Array<'lines' | 'words' | 'chars'> | undefined
  previousContainerWidth: number | null = null
  resizeObserver?: ResizeObserver

  // Constructor for TextScrollEffect which sets up the text animation.
  // Parameters:
  //   textElement: HTMLElement - The DOM element that contains the text to be animated.
  //   options: Object (optional) - Configuration options for the text splitting and callbacks.
  //     options.resizeCallback: Function - A function to call on window resize events.
  //     options.splitTypeTypes: String - Specifies the types of splits to perform on the text.
  //         Possible values are based on SplitType's configuration, such as 'lines', 'words', 'chars'.
  //         See SplitType documentation for more details: https://github.com/lukePeavey/SplitType
  // This constructor initializes the text splitting with specified options, sets up resize handling,
  // and prepares the text element for animation effects.
  constructor(
    textElement: HTMLElement,
    options: {
      resizeCallback?: () => void
      splitTypeTypes?: Array<'lines' | 'words' | 'chars'>
    } = {},
  ) {
    // Ensure the textElement is a valid HTMLElement.
    if (!textElement || !(textElement instanceof HTMLElement)) {
      throw new Error('Invalid text element provided.')
    }

    const { resizeCallback, splitTypeTypes } = options

    this.textElement = textElement
    // Assign the resize callback if provided and is a function, otherwise null.
    this.onResize = typeof resizeCallback === 'function' ? resizeCallback : null

    // Set options for SplitType based on provided splitTypeTypes or default to SplitType's default behavior.
    // The 'types' option allows customization of how text is split (e.g., into lines, words, characters).
    // Refer to SplitType documentation for possible values and updates: https://github.com/lukePeavey/SplitType
    const splitOptions = splitTypeTypes ? { types: splitTypeTypes } : {}
    this.splitText = new SplitType(this.textElement, splitOptions)

    // Initialize ResizeObserver to re-split text on resize events, if a resize callback is provided.
    if (this.onResize) {
      this.initResizeObserver() // Set up observer to detect resize events.
    }
  }

  // Sets up ResizeObserver to re-split text on element resize.
  initResizeObserver() {
    this.previousContainerWidth = null // Track element width to detect resize.

    this.resizeObserver = new ResizeObserver(
      debounce((...args: unknown[]) => this.handleResize(args[0] as ResizeObserverEntry[]), 100),
    )
    this.resizeObserver.observe(this.textElement) // Start observing the text element.
  }

  // Handles element resize, re-splitting text if width changes.
  handleResize(entries: ResizeObserverEntry[]) {
    this.splitText.split({ types: this.splitTypes }) // Re-split text for new width.
    if (this.onResize) this.onResize() // Execute the callback function.
    // If element width changed, re-split text and call resize callback.
    const width = this.textElement.offsetWidth
    if (this.previousContainerWidth && this.previousContainerWidth !== width) {
      this.splitText.split({ types: this.splitTypes }) // Re-split text for new width.
      if (this.onResize) this.onResize() // Execute the callback function.
    }
    this.previousContainerWidth = width // Update stored width.
  }

  // Reset text
  revert() {
    return this.splitText.revert()
  }

  // Returns the lines created by splitting the text element.
  getLines(): HTMLElement[] | undefined {
    return this.splitText.lines === null ? undefined : this.splitText.lines
  }

  // Returns the words created by splitting the text element.
  getWords(): HTMLElement[] | undefined {
    return this.splitText.words === null ? undefined : this.splitText.words
  }

  // Returns the chars created by splitting the text element.
  getChars(): HTMLElement[] | undefined {
    return this.splitText.chars === null ? undefined : this.splitText.chars
  }
}
