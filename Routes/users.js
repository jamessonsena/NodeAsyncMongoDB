const express = require('express');
const router = express();
const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

const createUserToken = (userId) => {
    return jwt.sign({ id: userId }, config.jwt_pass, { expiresIn: config.jwt_expires_in });
}


router.get('/', async (req, res) => {
    try {
        const users = await User.find({});
        return res.send(users);
    } catch (err) {
        return res.send({ error:err });
    }
});

router.get('/', (req, res) => {
    User.find({}, (err, data) => {
        if (err)
            return res.send({ error: 'erro na consulta de usuários!' });
        return res.send(data);
    });
});


router.post('/create', async (req, res) => {
    const body = req.body;
    if (!body.email || !body.password)
        return res.statusCode(400).send({ error: 'dados insuficientes!' });

    try {
        if (await User.findOne({ email: body.email }))
            return res.statusCode(400).send({ error: 'Usuario já registrado!' });

        const user = await User.create({ email: body.email, password: body.password }); 
        user.password = "************";
        return res.statusCode(201).send({ user, token: createUserToken(user.id) });

    } catch (error) {
        return res.statusCode(500).send({ error: 'Erro ao buscar usuario!' });
    }
});


router.post('/auth', async (req, res) => {
    if (!req.body.email || !req.body.password)
        return res.statusCode(400).send({ error: "Dados invalidos" });


    try {
        const data = await User.findOne({ email: req.body.email }).select('+password');
        if (!data)
            return res.statusCode(400).send({ error: 'Erro não registrador!' });

        const same =await bcrypt.compare(req.body.password, data.password);
        if (!same)
            return res.statusCode(401).send({ error: 'Erro na autentificação' });
        data.password = "************";

        return res.send({ data, token: createUserToken(data.id) });
        

    } catch (err) {
        return res.statusCode(500).send({ error: 'Erro ao buscar usuario!' });
    }
});
module.exports = router;