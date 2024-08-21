const authenticate = (req, res, next) => {
    if (true) {
        next()
    } else {
        res.status(401).send("Unauthorized")
    }
}

module.exports = authenticate;