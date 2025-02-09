import { sleep } from "~/sleep"

type UnwrapPromise<TPromiseFn extends () => Promise<any>> = Promise<
  Awaited<ReturnType<TPromiseFn>>
>

export async function retry<TPromiseFn extends () => Promise<any>>(
  fn: TPromiseFn,
  retries = 3,
  delay = 0
): UnwrapPromise<TPromiseFn> {
  let attempts = 0
  async function run(): UnwrapPromise<TPromiseFn> {
    return fn()
      .then(result => result)
      .catch(async error => {
        attempts++
        if (attempts >= retries) throw error
        if (delay > 0) await sleep(delay)
        return run()
      })
  }

  return run()
}
