## koa-proxying

Just a very simple HTTP proxying tool for koa, wrapping [http-proxy](https://www.npmjs.com/package/http-proxy) but easier to use in koa.

```javascript
const proxy = require('koa-proxying')
const Koa = require('koa')
const app = new Koa()

app.use(async ctx => {
  const path = ctx.request.path

  if (path.startsWith('/common-user')) {
    await proxy(ctx, { target: 'https://user-service:8080' })
    return
  }

  if (ctx.state.user.isAdmin) {
    await proxy(ctx, { target: 'https://admin-service:8080' })
    return
  }

  ctx.body = 'forbiden'
})

```

### Install
```
npm install koa-proxying --save
```

### How to use

```javascript
await proxy(ctx, option)

await proxy(ctx, { target: 'target service url' })
```
The option will be passed to `http-proxy`, see [more details](https://www.npmjs.com/package/http-proxy#options)

### Some advanced cases

Set response headers previous:
```javascript
ctx.set('by-proxy', 'true')
await proxy(ctx, { target: 'https://target-service' })
```

Modify headers and query (request to target service):
```javascript
ctx.query = { pkg_name: 'koa-proxying' }
ctx.request.header = { 'x-real-ip': ctx.ip, ...ctx.request.header }
await proxy(ctx, { target: 'https://target-service' })
```

Set proxy request path:
```javascript
if (ctx.path === '/user/account-center') {
  ctx.path = '/account'
  await proxy(ctx, { target: 'https://target-service', prependPath: false })
}
// https://proxy-service/user/account-center
// --> 
// https://target-service/account
```

Load balance:
```javascript
await proxy(ctx, { target: getUrlFromLoadBalancer() })
```

### NOTE

If target service is a koa application, it is recommended to set `app.proxy = true` on target service.

If you wants more features about proxying, it is `http-proxy`. By the way, this package `koa-proxying` is just a simple wrapping version of `http-proxy`, but easier to use in some cases.
