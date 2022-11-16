export const throttle = (cb: (...args: unknown[]) => void, ms: number) => {
  let shouldWait = false
  let waitingArgs: unknown[] | null

  const timeoutFunc = () => {
    if (waitingArgs == null) {
      shouldWait = false
    } else {
      cb(...waitingArgs)
      waitingArgs = null
      setTimeout(timeoutFunc, ms)
    }
  }

  return (...args: unknown[]) => {
    if (shouldWait) {
      waitingArgs = args
      return
    }

    cb(...args)
    shouldWait = true

    setTimeout(timeoutFunc, ms)
  }
}
