### How to use
```js
import { retry, exponentialBackoff } from 'light-retry'

function main() {
  const result = await retry(() => fetch('/todos'), {
    retries: 3,
    retryStrategy: exponentialBackoff
  })
}
```
