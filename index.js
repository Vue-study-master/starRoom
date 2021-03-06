const Koa = require('koa');
const koaBody = require('koa-body');
const koaValidate = require('koa-validate');
const router = require('./routers/index');
const middlewares = require('./middlewares/index');
const xmlParser = require('koa-xml-body');
const path = require('path');
const staticServer = require('koa-static');
const staticPath = './static';
const app = new Koa();
middlewares.forEach((middleware) => {
    app.use(middleware);
});
app.use(xmlParser({
    xmlOptions: {
        explicitArray: false
    },
    key: 'xmlBody', // lib will check ctx.request.xmlBody & set parsed data to it.
}));
app.use(staticServer(
    path.join( __dirname,  staticPath)
));
app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 50 * 1024 * 1024
    }
}));

koaValidate(app);
app.use(router.routes());

module.exports = app;
