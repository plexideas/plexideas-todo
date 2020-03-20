// const proxy = require('http-proxy-middleware')
    
// export const setupProxy = (app) => {
//     app.use(proxy('/api', { target: 'http://localhost:5000/' }))
// }

import { createProxyMiddleware }  from 'http-proxy-middleware';

export const setupProxy = (app: any) => {
    app.use(
        createProxyMiddleware(['/api'], { target: 'http://localhost:5000' })
    );
};
