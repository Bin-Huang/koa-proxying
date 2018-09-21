## koa-proxying

Just a very simple HTTP proxying tool for koa, bases on http-proxy.

```javascript
const proxy = require('koa-proxying')
const Koa = require('koa')
const app = new Koa()

app.use(async ctx => {
  const path = ctx.request.path

  if (path.startsWith('/user')) {
    await proxy(ctx, { target: 'https://user-service:8080' })
    return
  }

  if (path.startsWith('/admin') && ctx.state.isAdmin) {
    await proxy(ctx, { target: 'https://admin-service:8080' })
    return
  }

  ctx.body = 'forbiden'
})

```

If your target service is a koa application, it is recommended to set `app.proxy = true` on target koa application.
