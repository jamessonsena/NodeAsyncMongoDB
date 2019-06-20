const express = require('express');
const router = express();
const auth = require('../middlewares/auth');

router.get('/', auth, (req, res) => {
    console.log(res.locals.authData);
    return res.send({ message: 'Tudo ok no router get' });
});

router.post('/', (req, res) => {
    return res.send({ message: 'Tudo ok no router post' });
});
module.exports = router;