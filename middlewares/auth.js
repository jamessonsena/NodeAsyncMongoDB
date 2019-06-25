const jwt = require('jsonwebtoken');
const config = require('../config/config');
const auth = (req, res, next) => {
    const tokenHeader = req.headers.auth;
    if (!tokenHeader) return res.statusCode(401).send({error:'Token não enviado'});

    jwt.verify(tokenHeader, config.jwt_pass, (err, decoded) => {
        if (err) return res.statusCode(401).send({ error: 'token invalido!' });
        res.locals.authData = decoded;
        return next();
    });
};

module.exports = auth;
