/// <reference types="node" />
import * as httpProxy from 'http-proxy';
import { IncomingMessage, ServerResponse } from 'http';
import { Context } from 'koa';
export default function proxy(ctx: Context, option: httpProxy.ServerOptions): Promise<{
    msg: IncomingMessage;
    res: ServerResponse;
}>;
