const fs = require('fs')
const moment = require("moment")

const asyncTryCatchMiddleware = (handler) => {
    return async (req, res, next) => {
        const OBJECT = Object.assign({});
        OBJECT.BODY = req.body;
        OBJECT.METHOD = req.method;
        OBJECT.PATH = req.originalUrl;
        OBJECT.PARAMS = req.params;
        OBJECT.QUERY = req.query;
        OBJECT.HEADERS = req.headers;
        OBJECT.DATE = new Date();
        const LINE = '--------------------------------------------------------------------------'

        fs.appendFile('logs/request.txt', `${JSON.stringify(OBJECT)}\n${LINE}\n\n`, () => {});
        setTimeout(async ()=>{
            try { await handler(req, res) }
            catch (err) {
                const errObject = {message: err.message, stack: err.stack, date: new Date(), body: req.body, url: req.originalUrl}
                fs.appendFile('logs/crash.txt', `${new Date()} : ${JSON.stringify(errObject)}\n${LINE}\n\n`, () => {});
                console.error("caught inside error", err)
                next(err)
            }
        }, 0)
    }
}

module.exports = { asyncTryCatchMiddleware}
