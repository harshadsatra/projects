// Defines a debounce function to limit the rate at which a function can fire.
export const debounce = <T extends (...args: unknown[]) => unknown>(func: T, delay: number) => {
  let timerId: ReturnType<typeof setTimeout> | undefined // Holds a reference to the timeout between calls.
  return (...args: Parameters<T>): void => {
    if (timerId !== undefined) {
      clearTimeout(timerId) // Clears the current timeout, if any, to reset the debounce timer.
    }
    timerId = setTimeout(() => {
      func(...args) // Calls the passed function after the specified delay with the correct context and arguments.
    }, delay)
  }
}
