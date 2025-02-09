### How to use
```js
function main() {
  const result = await retry(() => fetch('/todos'), {
    retries: 3,
    retryStrategy: exponentialBackoff
  })
}
```
