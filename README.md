### How to use

```js
function main() {
  const options = {
    retries: 3,
    retryStrategy: exponentialBackoff
  }
  const result = await retry(() => fetch('https://jsonplaceholder.typicode.com/todos/1'), options)
}
```
