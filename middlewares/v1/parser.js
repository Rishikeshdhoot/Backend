// Custom middleware to parse JSON strings in FormData before validation
module.exports.parseJsonStringsMiddleware = (req, res, next) => {
    // console.log("req.body", req.body);
    for (const key in req.body) {
        try {
            // Attempt to parse each field as JSON
            req.body[key] = JSON.parse(req.body[key]);
        } catch (error) {
            // Ignore errors (fields that are not JSON strings)
        }
    }
    next();
};
