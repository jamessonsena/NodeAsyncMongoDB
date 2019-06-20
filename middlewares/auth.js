const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const tokenHeader = req.headers.auth;
    if (!tokenHeader) return res.statusCode(401).send({error:'Token não enviado'});

    jwt.verify(tokenHeader, 'senhaTopJames', (err, decoded) => {
        if (err) return res.statusCode(401).send({ error: 'token invalido!' });
        res.locals.authData = decoded;
        return next();
    });
};

module.exports = auth;
