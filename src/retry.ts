import { sleep } from "~/sleep"

type UnwrapPromise<TPromiseFn extends () => Promise<any>> = Promise<
  Awaited<ReturnType<TPromiseFn>>
>

export type RetryOptions = {
  retries?: number
  delayFn?: (attempts: number) => number
  signal?: AbortSignal
}

export async function retry<TPromiseFn extends () => Promise<any>>(
  fn: TPromiseFn,
  options?: RetryOptions
): UnwrapPromise<TPromiseFn> {
  let attempts = 0
  const { delayFn = () => 500, retries = 3, signal } = options ?? {}

  async function run(): UnwrapPromise<TPromiseFn> {
    if (signal?.aborted) throw new Error("Aborted")

    return fn()
      .then(result => {
        if (signal?.aborted) throw new Error("Aborted")
        return result
      })
      .catch(async error => {
        attempts++
        if (attempts >= retries) throw error
        if (signal?.aborted) throw new Error("Aborted")

        const delay = delayFn(attempts)
        if (delay > 0) await sleep(delay, signal)
        if (signal?.aborted) throw new Error("Aborted")
        return run()
      })
  }

  return run()
}
