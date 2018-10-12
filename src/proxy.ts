import * as httpProxy from 'http-proxy'
import { IncomingMessage, ServerResponse } from 'http';
import { Context } from 'koa'

const proxyClient = new httpProxy()

export default async function proxy(ctx: Context, option: httpProxy.ServerOptions) {
  return new Promise<{ msg: IncomingMessage, res: ServerResponse }>((resolve, reject) => {
    proxyClient.web(ctx.req, ctx.res, option, (error, msg, res, url) => {
      if (error) {
        reject(error)
      } else {
        resolve({msg, res})
      }
    })
  })
}

module.exports = proxy
