const router = require('express').Router();
const controllers = require('../controllers');

router.get('/active', controllers.getActive);
//Weekly routers
router.get('/weekly', controllers.getWeekly);
router.post('/weekly', controllers.postOneWeekly);
router.post('/resetWeekly', controllers.deleteAllWeekly);
//User routers 
router.get('/user', controllers.getAllUsers);
router.post('/user', controllers.postUser);
router.delete('/user/:id', controllers.deleteOneUser);
//Historical Routers 
router.get('/historical', controllers.getAll);
router.post('/historical', controllers.postOneHistorical);
router.delete('/historical/:id', controllers.deleteOneHistorical);

module.exports = router;
