const router = require('express').Router();
const user_controllers = require('../controllers/users');
const weekly_controllers = require('../controllers/weekly');
const historical_controllers = require('../controllers/historical');

//get All active memebers 
router.get('/active', user_controllers.getActive);
router.get('/inactive', user_controllers.getInactive);
//User routers 
router.get('/user', user_controllers.getAllUsers);
router.post('/user', user_controllers.postUser);
router.patch('/user/:id', user_controllers.updateUser);
router.delete('/user/:id', user_controllers.deleteOneUser);
//Weekly routers
router.get('/weekly', weekly_controllers.getWeekly);
router.post('/weekly', weekly_controllers.postOneWeekly);
router.post('/updateWeekly', weekly_controllers.updateWeeklyAssistance);
router.delete('/resetWeekly', weekly_controllers.deleteAllWeekly);
router.delete('/weekly/:id', weekly_controllers.deleteOneWeekly);
//Historical Routers 
router.get('/historical', historical_controllers.getAll);
router.get('/historical/:id', historical_controllers.getOneHistorical);
router.post('/historical', historical_controllers.postOneHistorical);
router.delete('/historical/:id', historical_controllers.deleteOneHistorical);
router.delete('/historical', historical_controllers.deleteAllHistorical);

module.exports = router;
