const jwt = require("jsonwebtoken");

const config = process.env;

const auth = (req, res, next) => {
    try {
        if (['/department', '/bank', '/user/login', '/user/register', '/user/forgotPassword'].includes(req.originalUrl)
            || req.originalUrl.startsWith('/user/verify/')
            || req.originalUrl.startsWith('/user/validateResetPassword')
            || req.originalUrl.startsWith('/user/resetPassword')) {
            next()
        } else {
            let token = req.body.token || req.query.token || req.headers["authorization"];

            token = token.replace("Bearer ", "");
            const decoded = jwt.verify(token, config.TOKEN_KEY);

            req.user = decoded;
            next();
        }

    } catch (e) {
        res.status(401).json({ message: 'Unauthorized!' });
    }
}

const decodeToken = (req, res, next) => {
    try {
        let token = req.body.token || req.query.token || req.headers["authorization"];

        token = token.replace("Bearer ", "");
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        req.user = decoded;
        return decoded;
    } catch (e) {
        if (e.name == 'TokenExpiredError') {
            e.status = 401;
            throw e;
        }
    }
};

const decodeGeneralToken = (token) => {
    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        return decoded;
    } catch (e) {
        if (e.name == 'TokenExpiredError') {
            e.status = 401;
            throw e;
        }
    }
}

module.exports = {
    decodeToken,
    decodeGeneralToken,
    auth
};