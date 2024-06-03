const router = require('express').Router();

const homeController = require('./controller/homeController');
const userController = require('./controller/userController');
const petController = require('./controller/petController');
router.use(homeController);
router.use('/users', userController);
router.use('/photo', petController);
router.get('/404',  (req, res) => {
    res.render('404')
 });
    


module.exports = router; 