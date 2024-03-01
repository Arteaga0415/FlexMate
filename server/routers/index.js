const router = require('express').Router();
const controllers = require('../controllers');

//get All active memebers 
router.get('/active', controllers.getActive);
//Weekly routers
router.get('/weekly', controllers.getWeekly);
router.post('/weekly', controllers.postOneWeekly);
router.post('/updateWeekly', controllers.updateWeeklyAssistance);
router.delete('/resetWeekly', controllers.deleteAllWeekly);
// router.delete('/weekly/:id', controllers.deleteOneWeekly);
//User routers 
router.get('/user', controllers.getAllUsers);
router.post('/user', controllers.postUser);
router.delete('/user/:id', controllers.deleteOneUser);
//Historical Routers 
router.get('/historical', controllers.getAll);
router.post('/historical', controllers.postOneHistorical);
router.delete('/historical/:id', controllers.deleteOneHistorical);

module.exports = router;
