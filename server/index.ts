import next from 'next';
import express, { Request, Response, Express } from 'express';
import { parse } from 'url';
import { graphqlHTTP } from 'express-graphql';
import { GQLMockServerSchema } from './mockGQLServer';
// import { GQLMockServerSchema } from './myMockGQLServer';

/** MyNextServer 建構子參數 */
export interface MyNextServerOption {
  /**
   * HTTP Server 要監聽的 port
   * @default 3000
   */
  port?: number;
}

/**
 * Next.js 整合 Express
 * @link https://levelup.gitconnected.com/set-up-next-js-with-a-custom-express-server-typescript-9096d819da1c
 */
export class MyNextServer implements MyNextServerOption {
  readonly port: number | undefined;

  /** Express server */
  protected server: Express | undefined;

  constructor (option?: MyNextServerOption) {
    this.port = option?.port || 3000;
  }

  /**
 * 啟動伺服器
 * @returns 啟動時間
 */
  async start (): Promise<number> {
  /** 開始時間 */
    const startAt = Date.now();
    const handle = await this.initNextApp();
    this.server = express();
    console.log('\x1b[45m%s\x1b[0m', '啟用 GQL Mock Server');
    // 允許跨域存取
    this.server.use('/graphql', function (req, res, next) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization, Content-Length, X-Requested-With'
      );
      if (req.method === 'OPTIONS') res.sendStatus(200);
      else next();
    });
    this.server.use(
      '/graphql',
      graphqlHTTP({
        schema: GQLMockServerSchema,
        graphiql: true
      })
    );
    this.server.all('*', (req: Request, res: Response) => {
      const parsedUrl = parse(req.url, true);
      return handle(req, res, parsedUrl);
    });
    return new Promise((resolve, reject) => {
      this.server?.listen(this.port, (err?: Error) => {
        if (err) return reject(err);
        console.log(`next.js 啟動花費 ${Date.now() - startAt} 毫秒 http://localhost:${this.port}`);
        return resolve(Date.now() - startAt);
      });
    });
  }

  /** 初始化 next.js */
  protected async initNextApp () {
    /** next.js server */
    const app = next({ dev: true });
    /** next.js request handler */
    const handle = app.getRequestHandler();
    /** init next.js */
    await app.prepare();
    return handle;
  }
}

const myServer = new MyNextServer({ port: 3000 });

(async () => {
  await myServer.start();
  console.log('NextServer 完成啟動');
})();
