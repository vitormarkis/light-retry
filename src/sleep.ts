export function sleep(ms: number, signal?: AbortSignal): Promise<boolean> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      return reject(new Error("Sleep aborted"))
    }

    const timeoutId = setTimeout(() => {
      cleanup()
      resolve(true)
    }, ms)

    const onAbort = (e: { target: EventTarget | null }) => {
      clearTimeout(timeoutId)
      cleanup()
      reject(e.target)
    }

    const cleanup = () => {
      if (!signal) return
      signal.removeEventListener("abort", onAbort)
    }

    if (!signal) return
    signal.addEventListener("abort", onAbort)
  })
}
