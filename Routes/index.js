const express = require('express');
const router = express();

router.get('/', (req, res) => {
    return res.send({ message: 'Tudo ok no router get' });
});

router.post('/', (req, res) => {
    return res.send({ message: 'Tudo ok no router post' });
});
module.exports = router;