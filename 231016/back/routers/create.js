const router = require('express').Router();

const {JsonCreate} = require('../fsmodules/jsonfilecreate');

router.post('/',JsonCreate);

module.exports = router;