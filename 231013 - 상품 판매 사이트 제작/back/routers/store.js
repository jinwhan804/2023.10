const router = require('express').Router();

const {ItemIn} = require('../controllers/storeInController');
const {StoreList} = require('../controllers/storeListController');
const {ItemOut} = require('../controllers/storeOutController');

router.get('/',StoreList);

router.post('/add',ItemIn);

router.post('/delete',ItemOut);

module.exports = router;